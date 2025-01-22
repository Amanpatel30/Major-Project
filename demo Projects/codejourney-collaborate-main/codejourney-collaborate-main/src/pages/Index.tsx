import { Code, Brain, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeSnippet } from "@/components/CodeSnippet";
import { FeatureCard } from "@/components/FeatureCard";
import { CourseCard } from "@/components/CourseCard";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();

  const handleStartLearning = () => {
    toast.success("Welcome aboard! Let's start your learning journey.");
    // In a real app, this would navigate to a registration or courses page
    // For now, we'll just show a toast
  };

  const handleExploreCourses = () => {
    toast.info("Exploring our course catalog...");
    // In a real app, this would navigate to the courses page
    // For now, we'll just show a toast
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Master Programming at Your Own Pace
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                Interactive tutorials, real-world projects, and AI-powered learning assistance
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-slate-100"
                  onClick={handleStartLearning}
                >
                  Start Learning Free
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-white border-white hover:bg-white/10"
                  onClick={handleExploreCourses}
                >
                  Explore Courses
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <CodeSnippet />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Code}
              title="Learn by Doing"
              description="Practice coding in our interactive editor with real-time feedback"
            />
            <FeatureCard
              icon={Brain}
              title="Smart Learning Assistant"
              description="Get personalized help and code suggestions powered by AI"
            />
            <FeatureCard
              icon={Folder}
              title="Real Projects"
              description="Build portfolio-worthy projects as you learn"
            />
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CourseCard
              icon="⚛️"
              title="React Fundamentals"
              description="Learn the basics of React and build modern web applications"
              level="Beginner"
            />
            <CourseCard
              icon="🐍"
              title="Python for Beginners"
              description="Start your programming journey with Python"
              level="Beginner"
              progress={60}
            />
            <CourseCard
              icon="📱"
              title="Mobile Development"
              description="Create cross-platform mobile apps with React Native"
              level="Intermediate"
            />
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;