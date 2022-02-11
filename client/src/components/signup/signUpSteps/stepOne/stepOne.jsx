import HelperText from "g-components/text/helperText";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PhoneNoPicker from "g-components/inputs/phoneNo/phoneNo";
import DatePicker from "g-components/inputs/datePicker/datePicker";
import React, { useRef } from "react";
import "./stepOne.scss";
export default function StepOne(params) {
  const PostData = (e) => {};
  // refs

  const nameRef = useRef(null);
  const bio = useRef(null);
  const email = useRef(null);
  const phoneNo = useRef(null);
  // states
  const [nameErr, setNameErr] = React.useState([false, ""]);
  const [bioErr, setBioErr] = React.useState([false, ""]);
  const [phoneNoErr, setPhoneNoErr] = React.useState([false, ""]);
  const [emailErr, setEmailErr] = React.useState([false, ""]);

  //

  return (
    <div id="SignUpStepOne">
      <form
        noValidate
        onSubmit={async (e) => {
          e.preventDefault();
          PostData(e);
        }}
      >
        <TextField
          error={nameErr[0]}
          required
          label="name"
          variant="outlined"
          className="text-field"
          inputRef={nameRef}
          helperText={
            <HelperText text={nameErr[1]} variant={nameErr[0] ? "err" : ""} />
          }
        />
        <p className="inputLabel">Date of Birth* :</p>
        <DatePicker name="dob" />


        <PhoneNoPicker />
        

        <TextField
          error={emailErr[0]}
          disabled
          label="email"
          variant="outlined"
          className="text-field"
          inputRef={email}
          helperText={
            <HelperText text={emailErr[1]} variant={emailErr[0] ? "err" : ""} />
          }
          defaultValue="E@rmail.com"
        />

        <textarea ref={bio}></textarea>

        <Button variant="contained" type="submit">
          Next
        </Button>
      </form>

      <Button disabled variant="contained" className="previousButton">
        previous
      </Button>
    </div>
  );
}
