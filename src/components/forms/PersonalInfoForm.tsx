import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { setPersonalInfo, PersonalInfo } from '@/store/resumeSlice';
import { User } from 'lucide-react';

const schema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  email: z.string().email('Invalid email address'),
  mobile: z.string().min(10, 'Invalid mobile number').max(15),
  address: z.string().min(1, 'Address is required').max(200),
  city: z.string().min(1, 'City is required').max(50),
  state: z.string().min(1, 'State is required').max(50),
  profileImage: z.string().optional(),
});

interface PersonalInfoFormProps {
  onNext: () => void;
}

const PersonalInfoForm = ({ onNext }: PersonalInfoFormProps) => {
  const dispatch = useAppDispatch();
  const personalInfo = useAppSelector((state) => state.resume.personalInfo);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfo>({
    resolver: zodResolver(schema),
    defaultValues: personalInfo,
  });

  const onSubmit = (data: PersonalInfo) => {
    dispatch(setPersonalInfo(data));
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-fade-in">
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-border">
            <User className="w-12 h-12 text-muted-foreground" />
          </div>
          <button
            type="button"
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-xs text-primary hover:underline"
          >
            Change Profile photo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            placeholder="Enter first name"
            {...register('firstName')}
            className={errors.firstName ? 'border-destructive' : ''}
          />
          {errors.firstName && (
            <p className="text-sm text-destructive">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input
            id="lastName"
            placeholder="Enter last name"
            {...register('lastName')}
            className={errors.lastName ? 'border-destructive' : ''}
          />
          {errors.lastName && (
            <p className="text-sm text-destructive">{errors.lastName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="email@example.com"
            {...register('email')}
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile</Label>
          <Input
            id="mobile"
            placeholder="+1 234 567 890"
            {...register('mobile')}
            className={errors.mobile ? 'border-destructive' : ''}
          />
          {errors.mobile && (
            <p className="text-sm text-destructive">{errors.mobile.message}</p>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            placeholder="Street address"
            {...register('address')}
            className={errors.address ? 'border-destructive' : ''}
          />
          {errors.address && (
            <p className="text-sm text-destructive">{errors.address.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="City"
            {...register('city')}
            className={errors.city ? 'border-destructive' : ''}
          />
          {errors.city && (
            <p className="text-sm text-destructive">{errors.city.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            placeholder="State"
            {...register('state')}
            className={errors.state ? 'border-destructive' : ''}
          />
          {errors.state && (
            <p className="text-sm text-destructive">{errors.state.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
};

export default PersonalInfoForm;
