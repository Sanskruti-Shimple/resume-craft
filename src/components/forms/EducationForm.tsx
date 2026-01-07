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
import { setEducation, Education } from '@/store/resumeSlice';
import { years } from '@/data/templates';
import { Plus, Trash2 } from 'lucide-react';

const educationSchema = z.object({
  id: z.string(),
  degree: z.string().min(1, 'Degree is required').max(100),
  institution: z.string().min(1, 'Institution is required').max(100),
  startYear: z.string().min(1, 'Start year is required'),
  endYear: z.string().min(1, 'End year is required'),
});

const schema = z.object({
  educations: z.array(educationSchema),
});

type FormData = {
  educations: Education[];
};

interface EducationFormProps {
  onNext: () => void;
  onBack: () => void;
}

const EducationForm = ({ onNext, onBack }: EducationFormProps) => {
  const dispatch = useAppDispatch();
  const education = useAppSelector((state) => state.resume.education);

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
      educations: education,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'educations',
  });

  const onSubmit = (data: FormData) => {
    dispatch(setEducation(data.educations));
    onNext();
  };

  const addEducation = () => {
    append({
      id: Date.now().toString(),
      degree: '',
      institution: '',
      startYear: '',
      endYear: '',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-semibold text-foreground">Education</h2>

      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 p-4 border rounded-lg bg-muted/20">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground">Education {index + 1}</h3>
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

          <input type="hidden" {...register(`educations.${index}.id`)} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Degree</Label>
              <Input
                placeholder="e.g., Bachelor of Science"
                {...register(`educations.${index}.degree`)}
                className={errors.educations?.[index]?.degree ? 'border-destructive' : ''}
              />
              {errors.educations?.[index]?.degree && (
                <p className="text-sm text-destructive">
                  {errors.educations[index]?.degree?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Institution</Label>
              <Input
                placeholder="University/College name"
                {...register(`educations.${index}.institution`)}
                className={errors.educations?.[index]?.institution ? 'border-destructive' : ''}
              />
              {errors.educations?.[index]?.institution && (
                <p className="text-sm text-destructive">
                  {errors.educations[index]?.institution?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Start year</Label>
              <Select
                value={watch(`educations.${index}.startYear`)}
                onValueChange={(value) => setValue(`educations.${index}.startYear`, value)}
              >
                <SelectTrigger className={errors.educations?.[index]?.startYear ? 'border-destructive' : ''}>
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
              {errors.educations?.[index]?.startYear && (
                <p className="text-sm text-destructive">
                  {errors.educations[index]?.startYear?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>End year</Label>
              <Select
                value={watch(`educations.${index}.endYear`)}
                onValueChange={(value) => setValue(`educations.${index}.endYear`, value)}
              >
                <SelectTrigger className={errors.educations?.[index]?.endYear ? 'border-destructive' : ''}>
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
              {errors.educations?.[index]?.endYear && (
                <p className="text-sm text-destructive">
                  {errors.educations[index]?.endYear?.message}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addEducation}
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

export default EducationForm;
