import { Routes, Route } from "react-router-dom";

import SignUp from "./signup";
import Steps from "./signUpSteps/steps";
import SignupStepAnimationProvider from "g-components/contexts/signupStepAnimation";
export default function SignUpRoute() {
  console.log("hi");
  return (
    <Routes>
      <Route path="/" element={<SignUp />}></Route>
      <Route
        path="steps/"
        element={
          <SignupStepAnimationProvider>
            <Steps />
          </SignupStepAnimationProvider>
        }
      ></Route>
    </Routes>
  );
}
