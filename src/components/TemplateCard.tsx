import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setSelectedTemplate } from '@/store/resumeSlice';
import { TemplateData } from '@/data/templates';
import ResumePreviewMini from './ResumePreviewMini';

interface TemplateCardProps {
  template: TemplateData;
}

const TemplateCard = ({ template }: TemplateCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleUseTemplate = () => {
    dispatch(setSelectedTemplate(template.id));
    navigate('/details');
  };

  return (
    <div className="template-card group">
      <div className="aspect-[3/4] p-4 bg-muted/30">
        <ResumePreviewMini templateId={template.id} />
      </div>
      <div className="template-overlay">
        <Button
          onClick={handleUseTemplate}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Use Template
        </Button>
      </div>
      <div className="p-4 border-t">
        <h3 className="font-medium text-foreground">{template.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
      </div>
    </div>
  );
};

export default TemplateCard;
