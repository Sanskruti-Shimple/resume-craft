interface ResumePreviewMiniProps {
  templateId: number;
}

const sampleData = {
  name: 'Chris Candidate',
  title: 'Human Resource Manager',
  email: 'chris@email.com',
  phone: '+1 234 567 890',
};

const ResumePreviewMini = ({ templateId }: ResumePreviewMiniProps) => {
  const getTemplateStyles = () => {
    switch (templateId) {
      case 0: // Classic Blue
        return {
          header: 'bg-template-blue text-primary-foreground',
          accent: 'text-template-blue',
          avatar: 'bg-template-blue',
        };
      case 1: // Modern Maroon
        return {
          header: 'bg-template-maroon text-primary-foreground',
          accent: 'text-template-maroon',
          avatar: 'bg-template-maroon',
        };
      case 2: // Creative Purple
        return {
          header: 'bg-gradient-to-r from-template-purple to-template-maroon text-primary-foreground',
          accent: 'text-template-purple',
          avatar: 'bg-template-purple',
        };
      case 3: // Minimal
        return {
          header: 'bg-background border-b-2 border-foreground text-foreground',
          accent: 'text-foreground',
          avatar: 'bg-muted',
        };
      default:
        return {
          header: 'bg-template-blue text-primary-foreground',
          accent: 'text-template-blue',
          avatar: 'bg-template-blue',
        };
    }
  };

  const styles = getTemplateStyles();

  if (templateId === 3) {
    // Minimal template
    return (
      <div className="w-full h-full bg-background rounded shadow-sm border text-[6px] overflow-hidden">
        <div className="p-3">
          <h3 className="font-bold text-[8px] uppercase tracking-wider">{sampleData.name}</h3>
          <p className="text-muted-foreground text-[5px] mt-0.5">{sampleData.title}</p>
          <div className="border-t border-foreground mt-2 pt-2">
            <div className="space-y-1">
              <div className="h-1 w-3/4 bg-muted rounded" />
              <div className="h-1 w-1/2 bg-muted rounded" />
            </div>
          </div>
          <div className="mt-2">
            <p className="font-semibold text-[5px] uppercase">Experience</p>
            <div className="mt-1 space-y-0.5">
              <div className="h-1 w-full bg-muted rounded" />
              <div className="h-1 w-5/6 bg-muted rounded" />
              <div className="h-1 w-4/5 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (templateId === 2) {
    // Creative template with side panel
    return (
      <div className="w-full h-full bg-background rounded shadow-sm border text-[6px] overflow-hidden flex">
        <div className={`w-1/3 ${styles.header} p-2`}>
          <div className={`w-6 h-6 rounded-full ${styles.avatar} mx-auto flex items-center justify-center`}>
            <span className="text-primary-foreground text-[5px] font-bold">CC</span>
          </div>
          <div className="mt-2 space-y-0.5">
            <div className="h-1 w-full bg-primary-foreground/30 rounded" />
            <div className="h-1 w-3/4 bg-primary-foreground/30 rounded" />
          </div>
        </div>
        <div className="flex-1 p-2">
          <h3 className="font-bold text-[7px]">{sampleData.name}</h3>
          <p className={`${styles.accent} text-[5px]`}>{sampleData.title}</p>
          <div className="mt-2 space-y-0.5">
            <div className="h-1 w-full bg-muted rounded" />
            <div className="h-1 w-5/6 bg-muted rounded" />
            <div className="h-1 w-4/5 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  // Classic and Modern templates
  return (
    <div className="w-full h-full bg-background rounded shadow-sm border text-[6px] overflow-hidden">
      <div className={`${styles.header} p-2 flex items-center gap-2`}>
        <div className={`w-8 h-8 rounded-full ${styles.avatar} flex items-center justify-center border-2 border-primary-foreground/20`}>
          <span className="text-primary-foreground text-[6px] font-bold">CC</span>
        </div>
        <div>
          <h3 className="font-bold text-[7px]">{sampleData.name}</h3>
          <p className="text-primary-foreground/80 text-[5px]">{sampleData.title}</p>
        </div>
      </div>
      <div className="p-2">
        <div className="space-y-2">
          <div>
            <p className={`font-semibold text-[5px] ${styles.accent}`}>EXPERIENCE</p>
            <div className="mt-1 space-y-0.5">
              <div className="h-1 w-full bg-muted rounded" />
              <div className="h-1 w-5/6 bg-muted rounded" />
            </div>
          </div>
          <div>
            <p className={`font-semibold text-[5px] ${styles.accent}`}>EDUCATION</p>
            <div className="mt-1 space-y-0.5">
              <div className="h-1 w-4/5 bg-muted rounded" />
              <div className="h-1 w-3/4 bg-muted rounded" />
            </div>
          </div>
          <div>
            <p className={`font-semibold text-[5px] ${styles.accent}`}>SKILLS</p>
            <div className="mt-1 flex gap-0.5 flex-wrap">
              <div className="h-1.5 w-6 bg-muted rounded" />
              <div className="h-1.5 w-8 bg-muted rounded" />
              <div className="h-1.5 w-5 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreviewMini;
