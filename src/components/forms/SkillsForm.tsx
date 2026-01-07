import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { setSkills } from '@/store/resumeSlice';
import { Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  skills: z.array(
    z.object({
      value: z.string().min(1, 'Skill is required').max(50),
    })
  ).min(1, 'At least one skill is required'),
});

type FormData = {
  skills: { value: string }[];
};

interface SkillsFormProps {
  onBack: () => void;
}

const SkillsForm = ({ onBack }: SkillsFormProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const skills = useAppSelector((state) => state.resume.skills);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      skills: skills.map((skill) => ({ value: skill })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  });

  const onSubmit = (data: FormData) => {
    dispatch(setSkills(data.skills.map((s) => s.value)));
    navigate('/preview');
  };

  const addSkill = () => {
    append({ value: '' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-semibold text-foreground">Key Skills</h2>

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <Input
              placeholder="Enter a skill (e.g., JavaScript, Project Management)"
              {...register(`skills.${index}.value`)}
              className={errors.skills?.[index]?.value ? 'border-destructive' : ''}
            />
            {fields.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                className="text-destructive hover:text-destructive shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
        {errors.skills && typeof errors.skills.message === 'string' && (
          <p className="text-sm text-destructive">{errors.skills.message}</p>
        )}
      </div>

      <button
        type="button"
        onClick={addSkill}
        className="flex items-center gap-2 text-primary hover:underline text-sm"
      >
        <Plus className="w-4 h-4" />
        Add skill
      </button>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Preview</Button>
      </div>
    </form>
  );
};

export default SkillsForm;
