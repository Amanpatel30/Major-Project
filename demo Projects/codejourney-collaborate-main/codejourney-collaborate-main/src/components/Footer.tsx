import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Footer = () => {
  const handleSubscribe = () => {
    toast.success("Thanks for subscribing! We'll keep you updated.");
  };

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">CodeMaster</h3>
            <p className="text-slate-400">Master programming at your own pace</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-slate-400">
              <li>Courses</li>
              <li>Projects</li>
              <li>Community</li>
              <li>Resources</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-slate-400">
              <li>About</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-slate-400 mb-4">
              Subscribe to our newsletter for the latest updates
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded bg-slate-800 text-white flex-1"
              />
              <Button variant="secondary" onClick={handleSubscribe}>Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2024 CodeMaster. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};