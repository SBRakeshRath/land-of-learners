import PhoneInput from "react-phone-number-input";
import HelperText from "g-components/text/helperText";

import "./phneno.scss";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TextField from "@mui/material/TextField";
import en from "react-phone-number-input/locale/en.json";
import { useState, useMemo, useRef } from "react";
import {
  getCountries,
  getCountryCallingCode,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
export default function PhoneNoPicker(props) {
  const [value, setValue] = useState();
  const [countryValue, setCountryValue] = useState("IN");
  const countrySelectRef = useRef(null);
  const countryArray = useMemo(() => {
    const arr = [];
    getCountries().forEach((val) => {
      const obj = {};
      obj[val] = en[val];
      arr.push(obj);
    });

    return arr.sort((a, b) =>
      Object.values(a)[0].localeCompare(Object.values(b)[0])
    );
  }, []);

  // number
  //PHONE NUMBER VALIDATOR FUNCTION 

  function numberValidator () {
      
  }

  const handleChange = (e) => {
    const number = "+" + getCountryCallingCode(countryValue) + e.target.value;
    console.log(number);
    if (!isPossiblePhoneNumber(number)) {
      console.log("not number");
    } else {
      console.log("possible");
    }
  };
  const countryImageLink = "https://flag.pk/flags/4x3/" + countryValue + ".svg";

  console.log(countryImageLink);

  return (
    <div id="phoneNoPicker">
      <div className="countryCodeContainer">
        <div className="flagContainer">
          <div className="flag">
            <img
              src={countryImageLink}
              alt={"+" + getCountryCallingCode(countryValue)}
            />
          </div>
          <div className="icon">
            <ArrowDropDownIcon />
          </div>
        </div>
        <select
          className="countryCodeInput"
          ref={countrySelectRef}
          onChange={(e) => {
            setCountryValue(e.target.value);
            e.target.text = "";
          }}
          value={countryValue}
        >
          {countryArray.map((item) => {
            const name = Object.values(item)[0];
            const code = Object.keys(item)[0];
            return (
              <option key={code} value={code}>
                {name + " (" + getCountryCallingCode(code) + ")"}
              </option>
            );
          })}
        </select>
      </div>

      <TextField
        // error={phoneNoErr[0]}
        required={props.required || true}
        label={props.label || "phone number"}
        variant="outlined"
        className="text-field phoneNumberInput"
        onChange={handleChange}
        name={props.name || "phoneNumber"}
        type="number"
        // inputRef={phoneNo}
        // helperText={
        //   <HelperText
        //     text={phoneNoErr[1]}
        //     variant={phoneNoErr[0] ? "err" : ""}
        //   />
        // }
      />
      {/* <input type="number" name="" id="" /> */}
      {/* <PhoneInput country={countryValue} value={value} onChange={setValue} /> */}
    </div>
  );
}
