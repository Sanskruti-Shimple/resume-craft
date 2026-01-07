import { useState } from 'react';
import Header from '@/components/Header';
import PersonalInfoForm from '@/components/forms/PersonalInfoForm';
import WorkExperienceForm from '@/components/forms/WorkExperienceForm';
import EducationForm from '@/components/forms/EducationForm';
import SkillsForm from '@/components/forms/SkillsForm';
import { User, Briefcase, GraduationCap, Lightbulb } from 'lucide-react';

type TabType = 'personal' | 'work' | 'education' | 'skills';

const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'work', label: 'Work Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Key Skills', icon: Lightbulb },
];

const DetailsFilling = () => {
  const [activeTab, setActiveTab] = useState<TabType>('personal');

  const handleNext = (next: TabType) => {
    setActiveTab(next);
  };

  const handleBack = (prev: TabType) => {
    setActiveTab(prev);
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoForm onNext={() => handleNext('work')} />;
      case 'work':
        return (
          <WorkExperienceForm
            onNext={() => handleNext('education')}
            onBack={() => handleBack('personal')}
          />
        );
      case 'education':
        return (
          <EducationForm
            onNext={() => handleNext('skills')}
            onBack={() => handleBack('work')}
          />
        );
      case 'skills':
        return <SkillsForm onBack={() => handleBack('education')} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <div className="flex gap-8">
          {/* Sidebar Tabs */}
          <aside className="w-64 shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`form-tab w-full flex items-center gap-3 ${
                      isActive ? 'form-tab-active' : 'form-tab-inactive'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Form Content */}
          <div className="flex-1 max-w-2xl">
            {renderForm()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailsFilling;
