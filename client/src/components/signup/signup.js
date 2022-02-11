import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, Navigate } from "react-router-dom";
import TextBorder from "g-components/borders/text-border";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import CenterBox from "g-components/box/center-box";
import HelperText from "g-components/text/helperText";
import SmallMessageBox1 from "g-components/box/small-message-box/box1";
import csrfAxiosApi from "./../../g-components/axios/csrfAxios";
import { csrftoken } from "g-components/contexts/CSRFTOKEN";

import "./signup.scss";
import { useRef, useState, useEffect, useContext } from "react";

import {
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

//logic
import { auth } from "firebase.js";

export default function SignUp() {
  //refs
  const emailRef = useRef(null);
  

  const passwordRef = useRef(null);
  const conformPasswordRef = useRef(null);
  //contexts
  const csrfToken = useContext(csrftoken);

  //custom Login Logic
  const [SM, setSM] = useState(["none", ""]);
  const [rs, setRs] = useState(false);
  const [token, setToken] = useState("");

  const [animatorBool, setAnimatorBool] = useState(false);

  const [errObj, setErrObj] = useState({
    email: [false, ""],
    pass: [false, ""],
    CPass: [false, ""],
    global: [false, ""],
  });
  async function setAccessToken() {
    setToken(auth.currentUser.accessToken);
  }
  async function firebaseSignup(defaultErrObj) {
    let errorCode = false;

    try {
      await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );

      // signUp success

      setSM(["suc", "successfully Registered"]);
      setAccessToken();

      
    } catch (err) {
      errorCode = err.code;
    }
    switch (errorCode) {
      case "auth/invalid-email":
        defaultErrObj.email = [true, "enter valid email"];
        defaultErrObj.global = [true, "enter valid email"];

        break;

      // eslint-disable-next-line no-fallthrough
      case "auth/email-already-in-use":
        defaultErrObj.email = [
          true,
          "This email is already in use please login",
        ];
        defaultErrObj.global = [
          true,
          "This email is already in use please login",
        ];
        break;

      // eslint-disable-next-line no-fallthrough
      case "auth/weak-password":
        defaultErrObj.pass = [true, "Enter a strong password"];
        defaultErrObj.global = [true, "Choose a strong password"];

        break;
      case false:
        defaultErrObj.global = [false, ""];
        break;

      default:
        defaultErrObj.global = [true, "Something went wrong !"];
        break;
    }

    return defaultErrObj;
  }

  async function customLogin(e) {
    e.preventDefault();
    setSM(["none", ""]);
    setAnimatorBool(true);
    let defaultErrObj = {
      email: [false, ""],
      pass: [false, ""],
      CPass: [false, ""],
      global: [false, ""],
    };
    if (passwordRef.current.value !== conformPasswordRef.current.value) {
      defaultErrObj.CPass = [
        true,
        "conform password must be same to the password",
      ];
      defaultErrObj.global = [
        true,
        "conform password must be same to the password",
      ];
    }

    let nextStep = true;

    Object.keys(defaultErrObj).forEach((el) => {
      if (defaultErrObj[el][0]) {
        nextStep = false;
      }
    });

    if (nextStep) {
      const err = await firebaseSignup(defaultErrObj);
      defaultErrObj = err;
    }

    if (defaultErrObj.global[0]) {
      setSM(["err", defaultErrObj.global[1]]);
    }

    setErrObj(() => {
      const obj = Object.keys(defaultErrObj)
        .filter((item) => {
          return item !== "global";
        })
        .reduce((res, key) => {
          res[key] = defaultErrObj[key];
          return res;
        }, {});

      return obj;
    });
    setAnimatorBool(false);
  }

  const RegisterWithGoogle = async () => {
    await setAnimatorBool(true);
    await setSM(["none", ""]);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setSM(["suc", "successfully registered"]);
      
      setAccessToken();
    } catch (err) {
      setSM(["err", "Registration failed"]);
    }

    setAnimatorBool(false);
  };
  const RegisterWithFacebook = async () => {
    await setAnimatorBool(true);
    await setSM(["none", ""]);

    try {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
      setSM(["suc", "successfully registered"]);
      
      setAccessToken();
    } catch (err) {
      setSM(["err", "Registration failed"]);
    }
    setAnimatorBool(false);
  };
  const RegisterWithGithub = async () => {
    await setAnimatorBool(true);
    await setSM(["none", ""]);

    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      setSM(["suc", "successfully registered"]);
      
      setAccessToken();
    } catch (err) {
      setSM(["err", "Registration failed"]);
    }
    setAnimatorBool(false);
  };
  // after firebase signup

  useEffect(() => {
    (async () => {
      if (token !== "") {
        console.log("inVoked");

        try {
          const res = await csrfAxiosApi("/tokenProtected", csrfToken, {
            data: {
              idToken: token,
            },
          });
          const code = res.res.data.code;
          if (code !== "SUCCESS") {
            throw new Error(" token error", "code is not success");
          }
          await signOut(auth);

          setSM(["suc", "successfully logged in"]);

          setRs(true)
        } catch (error) {
          console.log(error);
        } finally {
          setAnimatorBool(false);
        }
      }
    })();
    return () => {
      setToken("");
    };
  }, [csrfToken, token]);

  if (rs) {
    return <Navigate to={"/signup/stepOne"} />;
  }

  return (
    <CenterBox id="signup" animation={animatorBool}>
      <header>SignUp</header>

      <div className="inputs">
        {SM[0] !== "none" ? (
          <SmallMessageBox1 variant={SM[0]} message={SM[1]} />
        ) : (
          false
        )}

        <form
          noValidate
          onSubmit={async (e) => {
            customLogin(e);
          }}
        >
          <TextField
            error={errObj.email[0]}
            required
            label="email"
            variant="outlined"
            className="text-field"
            inputRef={emailRef}
            helperText={
              <HelperText
                text={errObj.email[1]}
                variant={errObj.email[0] ? "err" : ""}
              />
            }
          />
          <TextField
            error={errObj.pass[0]}
            required
            label="password"
            variant="outlined"
            helperText={
              <HelperText
                text={
                  errObj.pass[0] ? errObj.pass[1] : "Choose a strong password"
                }
                variant={errObj.pass[0] ? "err" : ""}
              />
            }
            type="password"
            className="text-field"
            inputRef={passwordRef}
          />
          <TextField
            error={errObj.CPass[0]}
            required
            label="conform password"
            variant="outlined"
            helperText={
              <HelperText
                text={
                  errObj.CPass[0] ? errObj.CPass[1] : "Choose a strong password"
                }
                variant={errObj.CPass[0] ? "err" : ""}
              />
            }
            type="password"
            className="text-field"
            inputRef={conformPasswordRef}
          />
          <Button variant="contained" type="submit">
            Sign up
          </Button>
        </form>
        <Link to="/">already have an account? click here to Login now !! </Link>
      </div>

      <TextBorder text="or" />

      <section className="otherOptions">
        <div className="wrapper">
          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={RegisterWithGoogle}
          >
            <div className="icon"></div>
            <p>Signup with google</p>
          </Button>
          <Button
            variant="outlined"
            startIcon={<FacebookIcon />}
            onClick={RegisterWithFacebook}
          >
            <div className="icon"></div>
            <p>Signup with facebook</p>
          </Button>
          <Button
            variant="outlined"
            startIcon={<GitHubIcon />}
            onClick={RegisterWithGithub}
          >
            <div className="icon"></div>
            <p>Signup with github</p>
          </Button>
        </div>
      </section>
    </CenterBox>
  );
}
