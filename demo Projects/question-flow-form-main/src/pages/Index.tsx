import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import axios from "axios";
import { FormInput } from "@/components/FormInput";
import { questions } from "@/config/question";
import { FormData } from "@/types/form";
// import  newcss  from 'neWcss.css';

const Index = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    occupation: "",
    username: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (value: string) => {
    const currentQuestion = questions[step];
    setFormData((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
    setError(null);
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
      setError(null);
    }
  };

  const handleNext = async () => {
    const currentQuestion = questions[step];
    const validationError = currentQuestion.validation(
      formData[currentQuestion.id],
      formData
    );

    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    if (step < questions.length - 1) {
      setStep((prev) => prev + 1);
      setError(null);
    } else {
      try {
        const response = await axios.post('http://localhost:5000/api/register', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          occupation: formData.occupation,
          username: formData.username
        });
        
        if (response.status === 201) {
          toast.success("Registration completed successfully!");
          setStep((prev) => prev + 1);
        } else {
          toast.error("Registration failed. Please try again.");
        }
      } catch (error) {
        console.error('Registration error:', error);
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  const progress = ((step + 1) / questions.length) * 100;

  if (step === questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary p-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl animate-slide-up">
          <div className="text-center">
            <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Registration Complete!</h2>
            <p className="text-gray-600">Thank you for registering with us.</p>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[step];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-500 mt-2">
            Question {step + 1} of {questions.length}
          </p>
          {/* what's your name  */}
        </div>

        <div key={step} className="animate-slide-up">
          <h2 className="text-2xl font-bold mb-6">{currentQuestion.label}</h2>
          
          <FormInput
            type={currentQuestion.type}
            placeholder={currentQuestion.placeholder}
            value={formData[currentQuestion.id]}
            onChange={handleInputChange}
            onEnter={handleNext}
            error={error}
            id={currentQuestion.id}
          />

          <div className="flex gap-4 mt-6">
            {step > 0 && (
              <Button
                onClick={handleBack}
                variant="outline"
                className="w-full"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {step === questions.length - 1 ? "Complete Registration" : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;