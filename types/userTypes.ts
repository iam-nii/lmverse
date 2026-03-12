export type userSignUpType = {
  email: string;
  password: string;
  full_name: string;
  role: "student" | "tutor" | "admin";
  gender?: "male" | "female";
};

export type userSignInType = {
  email: string;
  password: string;
};
