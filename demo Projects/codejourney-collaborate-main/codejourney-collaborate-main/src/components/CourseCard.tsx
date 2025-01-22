import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CourseCardProps {
  title: string;
  description: string;
  level: string;
  progress?: number;
  icon: string;
}

export const CourseCard = ({ title, description, level, progress = 0, icon }: CourseCardProps) => {
  const handleStartLearning = () => {
    toast.success(`Starting ${title} course...`);
    // In a real app, this would navigate to the course page
    // For now, we'll just show a toast
  };

  return (
    <div className="p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <span className="text-xl">{icon}</span>
        </div>
        <Badge variant="secondary">{level}</Badge>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-secondary text-sm mb-4">{description}</p>
      {progress > 0 && (
        <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
          <div
            className="bg-primary rounded-full h-2"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      <Button className="w-full" onClick={handleStartLearning}>Start Learning</Button>
    </div>
  );
};