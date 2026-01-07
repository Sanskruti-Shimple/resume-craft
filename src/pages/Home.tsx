import Header from '@/components/Header';
import TemplateCard from '@/components/TemplateCard';
import { templates } from '@/data/templates';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-heading font-bold text-foreground">Templates</h1>
          <p className="text-muted-foreground mt-1">Select a Template to get Started</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
