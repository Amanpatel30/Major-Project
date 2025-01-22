export type FormData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    occupation: string;
    username: string;
  };
  
  export type Question = {
    id: keyof FormData;
    label: string;
    type: string;
    placeholder: string;
    validation: (value: string, formData?: FormData) => string | null;
  };
