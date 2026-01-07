import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, Plus } from 'lucide-react';

const MyResumes = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">My Resumes</h1>
            <p className="text-muted-foreground mt-1">Manage your saved resumes</p>
          </div>
          <Link to="/">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create New
            </Button>
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
            <FileText className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">No resumes yet</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            You haven't created any resumes yet. Start by selecting a template and filling in your details.
          </p>
          <Link to="/">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Resume
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default MyResumes;
