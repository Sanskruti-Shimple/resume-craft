import { useAppSelector } from '@/hooks/useAppDispatch';
import { Mail, Phone, MapPin, User } from 'lucide-react';
import { forwardRef } from 'react';

interface ResumePreviewProps {
  scale?: number;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ scale = 1 }, ref) => {
    const { personalInfo, workExperience, education, skills, selectedTemplate } =
      useAppSelector((state) => state.resume);

    const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || 'Your Name';
    const location = [personalInfo.city, personalInfo.state].filter(Boolean).join(', ');

    const getTemplateStyles = () => {
      switch (selectedTemplate) {
        case 0: // Classic Blue
          return {
            headerBg: 'bg-template-blue',
            headerText: 'text-primary-foreground',
            accent: 'text-template-blue',
            accentBg: 'bg-template-blue',
          };
        case 1: // Modern Maroon
          return {
            headerBg: 'bg-template-maroon',
            headerText: 'text-primary-foreground',
            accent: 'text-template-maroon',
            accentBg: 'bg-template-maroon',
          };
        case 2: // Creative Purple
          return {
            headerBg: 'bg-template-purple',
            headerText: 'text-primary-foreground',
            accent: 'text-template-purple',
            accentBg: 'bg-template-purple',
          };
        case 3: // Minimal
          return {
            headerBg: 'bg-background',
            headerText: 'text-foreground',
            accent: 'text-foreground',
            accentBg: 'bg-foreground',
          };
        default:
          return {
            headerBg: 'bg-template-blue',
            headerText: 'text-primary-foreground',
            accent: 'text-template-blue',
            accentBg: 'bg-template-blue',
          };
      }
    };

    const styles = getTemplateStyles();

    // Creative template (side panel layout)
    if (selectedTemplate === 2) {
      return (
        <div
          ref={ref}
          className="bg-background shadow-lg border rounded-lg overflow-hidden"
          style={{
            width: 595,
            minHeight: 842,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          <div className="flex h-full min-h-[842px]">
            {/* Side Panel */}
            <div className={`w-1/3 ${styles.headerBg} ${styles.headerText} p-6`}>
              <div className="w-24 h-24 rounded-full bg-primary-foreground/20 mx-auto flex items-center justify-center mb-4">
                <User className="w-12 h-12" />
              </div>
              
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-semibold mb-2 uppercase text-xs tracking-wider opacity-80">Contact</h3>
                  {personalInfo.email && (
                    <div className="flex items-center gap-2 mb-1">
                      <Mail className="w-3 h-3" />
                      <span className="text-xs break-all">{personalInfo.email}</span>
                    </div>
                  )}
                  {personalInfo.mobile && (
                    <div className="flex items-center gap-2 mb-1">
                      <Phone className="w-3 h-3" />
                      <span className="text-xs">{personalInfo.mobile}</span>
                    </div>
                  )}
                  {location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      <span className="text-xs">{location}</span>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold mb-2 uppercase text-xs tracking-wider opacity-80">Skills</h3>
                  <div className="space-y-1">
                    {skills.filter(Boolean).map((skill, index) => (
                      <div key={index} className="text-xs">{skill}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
              <h1 className={`text-3xl font-bold ${styles.accent} mb-1`}>{fullName}</h1>
              
              <div className="mt-8">
                <h2 className={`text-lg font-semibold ${styles.accent} mb-4 pb-2 border-b`}>Experience</h2>
                {workExperience.filter(exp => exp.jobTitle).map((exp, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-semibold text-foreground">{exp.jobTitle}</h3>
                    <p className="text-sm text-muted-foreground">{exp.organization}</p>
                    <p className="text-xs text-muted-foreground">
                      {exp.startYear} - {exp.endYear}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h2 className={`text-lg font-semibold ${styles.accent} mb-4 pb-2 border-b`}>Education</h2>
                {education.filter(edu => edu.degree).map((edu, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                    <p className="text-xs text-muted-foreground">
                      {edu.startYear} - {edu.endYear}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Minimal template
    if (selectedTemplate === 3) {
      return (
        <div
          ref={ref}
          className="bg-background shadow-lg border rounded-lg overflow-hidden p-8"
          style={{
            width: 595,
            minHeight: 842,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          <div className="border-b-2 border-foreground pb-4 mb-6">
            <h1 className="text-3xl font-bold uppercase tracking-wider">{fullName}</h1>
            <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.mobile && <span>{personalInfo.mobile}</span>}
              {location && <span>{location}</span>}
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-3">Experience</h2>
              {workExperience.filter(exp => exp.jobTitle).map((exp, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{exp.jobTitle}</h3>
                    <span className="text-sm text-muted-foreground">
                      {exp.startYear} - {exp.endYear}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{exp.organization}</p>
                </div>
              ))}
            </section>

            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-3">Education</h2>
              {education.filter(edu => edu.degree).map((edu, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <span className="text-sm text-muted-foreground">
                      {edu.startYear} - {edu.endYear}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{edu.institution}</p>
                </div>
              ))}
            </section>

            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.filter(Boolean).map((skill, index) => (
                  <span key={index} className="text-sm">{skill}{index < skills.filter(Boolean).length - 1 ? ' •' : ''}</span>
                ))}
              </div>
            </section>
          </div>
        </div>
      );
    }

    // Classic and Modern templates
    return (
      <div
        ref={ref}
        className="bg-background shadow-lg border rounded-lg overflow-hidden"
        style={{
          width: 595,
          minHeight: 842,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {/* Header */}
        <div className={`${styles.headerBg} ${styles.headerText} p-6`}>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center border-2 border-primary-foreground/30">
              <User className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{fullName}</h1>
              <div className="flex flex-wrap gap-4 mt-2 text-sm opacity-90">
                {personalInfo.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    <span>{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.mobile && (
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    <span>{personalInfo.mobile}</span>
                  </div>
                )}
                {location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Experience */}
          <section>
            <h2 className={`text-lg font-semibold ${styles.accent} mb-3 pb-1 border-b`}>
              Work Experience
            </h2>
            {workExperience.filter(exp => exp.jobTitle).map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-foreground">{exp.jobTitle}</h3>
                  <span className="text-sm text-muted-foreground">
                    {exp.startYear} - {exp.endYear}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{exp.organization}</p>
              </div>
            ))}
          </section>

          {/* Education */}
          <section>
            <h2 className={`text-lg font-semibold ${styles.accent} mb-3 pb-1 border-b`}>
              Education
            </h2>
            {education.filter(edu => edu.degree).map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                  <span className="text-sm text-muted-foreground">
                    {edu.startYear} - {edu.endYear}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{edu.institution}</p>
              </div>
            ))}
          </section>

          {/* Skills */}
          <section>
            <h2 className={`text-lg font-semibold ${styles.accent} mb-3 pb-1 border-b`}>
              Key Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.filter(Boolean).map((skill, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm ${styles.accentBg} text-primary-foreground`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }
);

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;
