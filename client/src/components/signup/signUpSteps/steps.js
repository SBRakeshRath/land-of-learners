import StepOne from "./stepOne/stepOne";
import CenterBox from "g-components/box/center-box";
import React from "react";
import { useLocation } from "react-router-dom";
import { csrftoken } from "g-components/contexts/CSRFTOKEN";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import userProfileData from "redux_local/thunks/thunk_userData";
import { SignUpStepAnimation } from "g-components/contexts/signupStepAnimation";
export default function Steps() {
  //context
  const { animation, setAnimation } = React.useContext(SignUpStepAnimation);
  // validate Session Cookie
  const csrfToken = React.useContext(csrftoken);
  const navigate = useNavigate();
  const disPatch = useDispatch();
  const user_profile_data = useSelector((state) => state.useProfilerData);
  const location = useLocation();
  //states
  const [currentStep, setStep] = React.useState(false);
  const [currentStepComponent, setComponent] = React.useState(null);
  React.useEffect(() => {
    if (csrfToken === "") return;
    disPatch(userProfileData.fetchStepData(csrfToken, true));
  }, [csrfToken, disPatch]);
  React.useEffect(() => {
    if (userProfileData.loading) return;
    if (
      typeof userProfileData.additional.step === undefined ||
      userProfileData.additional.step === true
    ) {
      navigate("/");
      return;
    }
    setStep(userProfileData.additional.step);
    setAnimation(false);
  }, [navigate, setAnimation, user_profile_data]);

  React.useEffect(() => {
    if (!currentStep) return;
    switch (currentStep) {
      case 1:
        setComponent(<StepOne />);
        break;

      default:
        navigate("/");
        break;
    }
  }, [currentStep, location.pathname, navigate]);

  return (
    <div id="signUpSteps">
      <CenterBox id="signup" animation={animation}>
        <div
          style={{
            minHeight: "400px",
          }}
        >
          {currentStepComponent}
        </div>
      </CenterBox>
    </div>
  );
}
