import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { setWorkExperience, WorkExperience } from '@/store/resumeSlice';
import { years } from '@/data/templates';
import { Plus, Trash2 } from 'lucide-react';

const experienceSchema = z.object({
  id: z.string(),
  jobTitle: z.string().min(1, 'Job title is required').max(100),
  organization: z.string().min(1, 'Organization is required').max(100),
  startYear: z.string().min(1, 'Start year is required'),
  endYear: z.string().min(1, 'End year is required'),
});

const schema = z.object({
  experiences: z.array(experienceSchema),
});

type FormData = {
  experiences: WorkExperience[];
};

interface WorkExperienceFormProps {
  onNext: () => void;
  onBack: () => void;
}

const WorkExperienceForm = ({ onNext, onBack }: WorkExperienceFormProps) => {
  const dispatch = useAppDispatch();
  const workExperience = useAppSelector((state) => state.resume.workExperience);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      experiences: workExperience,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experiences',
  });

  const onSubmit = (data: FormData) => {
    dispatch(setWorkExperience(data.experiences));
    onNext();
  };

  const addExperience = () => {
    append({
      id: Date.now().toString(),
      jobTitle: '',
      organization: '',
      startYear: '',
      endYear: '',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-semibold text-foreground">Work Experience</h2>

      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 p-4 border rounded-lg bg-muted/20">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground">Experience {index + 1}</h3>
            {fields.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => remove(index)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          <input type="hidden" {...register(`experiences.${index}.id`)} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Job Title</Label>
              <Input
                placeholder="Enter Job Title"
                {...register(`experiences.${index}.jobTitle`)}
                className={errors.experiences?.[index]?.jobTitle ? 'border-destructive' : ''}
              />
              {errors.experiences?.[index]?.jobTitle && (
                <p className="text-sm text-destructive">
                  {errors.experiences[index]?.jobTitle?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Organization Name</Label>
              <Input
                placeholder="Enter Organization Name"
                {...register(`experiences.${index}.organization`)}
                className={errors.experiences?.[index]?.organization ? 'border-destructive' : ''}
              />
              {errors.experiences?.[index]?.organization && (
                <p className="text-sm text-destructive">
                  {errors.experiences[index]?.organization?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Start year</Label>
              <Select
                value={watch(`experiences.${index}.startYear`)}
                onValueChange={(value) => setValue(`experiences.${index}.startYear`, value)}
              >
                <SelectTrigger className={errors.experiences?.[index]?.startYear ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.experiences?.[index]?.startYear && (
                <p className="text-sm text-destructive">
                  {errors.experiences[index]?.startYear?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>End year</Label>
              <Select
                value={watch(`experiences.${index}.endYear`)}
                onValueChange={(value) => setValue(`experiences.${index}.endYear`, value)}
              >
                <SelectTrigger className={errors.experiences?.[index]?.endYear ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Present">Present</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.experiences?.[index]?.endYear && (
                <p className="text-sm text-destructive">
                  {errors.experiences[index]?.endYear?.message}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addExperience}
        className="flex items-center gap-2 text-primary hover:underline text-sm"
      >
        <Plus className="w-4 h-4" />
        Add new
      </button>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
};

export default WorkExperienceForm;
