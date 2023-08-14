export const userNameValidation = (username) => {
    if (username.length < 3) {
      return false;
    } else {
      return true;
    }
  };

 export const emailValidation = (email) => {
    if (email.length === 0) {
      return "Email is required";
    } else if (!email.includes("@") || !email.includes(".")) {
      return "Invalid email format";
    } else {
      return null;
    }
  };

  export const passwordValidation = (password, confirmPassword) => {
    if (password.length < 6) {
      return "Password should be at least 6 characters long";
    } else if (confirmPassword && password !== confirmPassword) {
      return "Passwords do not match";
    } else {
      return null;
    }
  };
  