import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Header from '@/components/Header';
import ResumePreview from '@/components/ResumePreview';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { setResumeName } from '@/store/resumeSlice';
import { ArrowLeft, Download, CheckCircle2 } from 'lucide-react';

const Preview = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const resumeRef = useRef<HTMLDivElement>(null);
  const resumeName = useAppSelector((state) => state.resume.resumeName);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDownload = async () => {
    if (!resumeRef.current) return;

    setIsDownloading(true);

    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [595, 842],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, 595, 842);
      pdf.save(`${resumeName || 'resume'}.pdf`);
      
      setShowSuccess(true);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <div className="flex gap-8">
          {/* Resume Preview */}
          <div className="flex-1 overflow-auto">
            <div className="inline-block">
              <ResumePreview ref={resumeRef} scale={1} />
            </div>
          </div>

          {/* Actions Panel */}
          <aside className="w-80 shrink-0 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="resumeName">Resume Name</Label>
              <Input
                id="resumeName"
                value={resumeName}
                onChange={(e) => dispatch(setResumeName(e.target.value))}
                placeholder="Enter resume name"
              />
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate('/details')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                className="w-full"
                onClick={handleDownload}
                disabled={isDownloading}
              >
                <Download className="w-4 h-4 mr-2" />
                {isDownloading ? 'Generating...' : 'Save'}
              </Button>
            </div>
          </aside>
        </div>
      </main>

      {/* Success Modal */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-success">
              <CheckCircle2 className="w-6 h-6" />
              Success!
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground">
              Your resume has been successfully downloaded as <strong>{resumeName}.pdf</strong>
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => navigate('/')}>
              Create Another
            </Button>
            <Button onClick={() => setShowSuccess(false)}>Done</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Preview;
