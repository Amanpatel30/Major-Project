export const validateName = (value: string) => {
    if (value.length < 2) return "Name must be at least 2 characters long";
    if (!/^[a-zA-Z\s]*$/.test(value)) return "Name can only contain letters and spaces";
    return null;
  };
  
  export const validateEmail = (value: string) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
    return null;
  };
  
  export const validateUsername = (value: string) => {
    if (value.length < 3) return "Username must be at least 3 characters long";
    if (!/^[a-zA-Z0-9_]*$/.test(value)) return "Username can only contain letters, numbers, and underscores";
    return null;
  };
  
  export const validatePassword = (value: string) => {
    if (value.length < 8) return "Password must be at least 8 characters long";
    if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(value)) return "Password must contain at least one lowercase letter";
    if (!/[0-9]/.test(value)) return "Password must contain at least one number";
    return null;
  };
  
  export const validateConfirmPassword = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) return "Passwords do not match";
    return null;
  };
  
  export const validateOccupation = (value: string) => {
    if (value.length < 2) return "Occupation must be at least 2 characters long";
    if (!/^[a-zA-Z\s]*$/.test(value)) return "Occupation can only contain letters and spaces";
    return null;
  };
  