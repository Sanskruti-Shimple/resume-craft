import Header from '@/components/Header';
import { FileText, Users, Zap, Shield } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Professional Templates',
    description: 'Choose from our collection of professionally designed resume templates that stand out.',
  },
  {
    icon: Zap,
    title: 'Quick & Easy',
    description: 'Build your resume in minutes with our intuitive step-by-step form process.',
  },
  {
    icon: Users,
    title: 'ATS Friendly',
    description: 'Our templates are optimized for Applicant Tracking Systems to help you get noticed.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your data stays in your browser. We never store your personal information.',
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
            About Resume Builder
          </h1>
          <p className="text-lg text-muted-foreground">
            We help job seekers create professional, eye-catching resumes that get results. 
            Our easy-to-use platform makes building your resume simple and stress-free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
            Our Mission
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We believe everyone deserves a chance to present themselves professionally. 
            Our goal is to democratize access to quality resume design, helping candidates 
            from all backgrounds create resumes that truly represent their skills and experiences.
          </p>
        </div>
      </main>
    </div>
  );
};

export default About;
