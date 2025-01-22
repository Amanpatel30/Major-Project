import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const CTASection = () => {
  const handleGetStarted = () => {
    toast.success("Welcome! Let's begin your coding journey.");
    // In a real app, this would navigate to a registration page
    // For now, we'll just show a toast
  };

  return (
    <section className="py-20 px-6 hero-gradient text-white">
      <div className="container max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Start Your Coding Journey Today</h2>
        <p className="text-lg mb-8 text-slate-300">
          Join 100,000+ developers learning and building together
        </p>
        <Button 
          size="lg" 
          className="bg-white text-primary hover:bg-slate-100"
          onClick={handleGetStarted}
        >
          Get Started Free
        </Button>
        <p className="mt-4 text-sm text-slate-400">No credit card required</p>
      </div>
    </section>
  );
};