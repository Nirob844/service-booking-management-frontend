import RegistrationPage from "@/components/registration/registration";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup",
};

const SignupPage = () => {
  return (
    <div>
      <RegistrationPage />
    </div>
  );
};

export default SignupPage;
