import { Question } from "../types/form";
import { 
  validateName, 
  validateEmail, 
  validateUsername, 
  validatePassword, 
  validateConfirmPassword, 
  validateOccupation 
} from "../utils/validation";

export const questions: Question[] = [
  {
    id: "name",
    label: "What's your name?",
    type: "text",
    placeholder: "Enter your full name",
    validation: validateName,
  },
  {
    id: "email",
    label: "What's your email?",
    type: "email",
    placeholder: "Enter your email address",
    validation: validateEmail,
  },
  {
    id: "username",
    label: "Choose a username",
    type: "text",
    placeholder: "Enter your desired username",
    validation: validateUsername,
  },
  {
    id: "password",
    label: "Create a password",
    type: "password",
    placeholder: "Enter your password",
    validation: validatePassword,
  },
  {
    id: "confirmPassword",
    label: "Confirm your password",
    type: "password",
    placeholder: "Re-enter your password",
    validation: (value: string, formData?: any) => 
      validateConfirmPassword(formData?.password || "", value),
  },
  {
    id: "occupation",
    label: "What's your occupation?",
    type: "text",
    placeholder: "Enter your occupation",
    validation: validateOccupation,
  },
];
