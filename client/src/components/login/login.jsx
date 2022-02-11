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
import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import { csrftoken } from "g-components/contexts/CSRFTOKEN";
import { auth } from "firebase.js";
import {
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  GithubAuthProvider,
  signInWithCustomToken,
  signInWithCredential,
} from "firebase/auth";
import { useSearchParams } from "react-router-dom";

import "./login.scss";
import csrfAxiosApi from "./../../g-components/axios/csrfAxios";

export default function Login() {
  const [animatorBool, setAnimatorBool] = useState(false);
  const [SM, setSM] = useState(["none", ""]);
  const [rs, setRs] = useState(false);
  const [errObj, setErrObj] = useState({
    email: [false, ""],
    pass: [false, ""],
    global: [false, ""],
  });
  const [token, setToken] = useState("");

  //contexts

  const csrfToken = useContext(csrftoken);
  let [searchParams, setSearchParams] = useSearchParams();

  //refs
  const emailRef = useRef(null);
  const redirectTimeout = useRef(null);

  const passwordRef = useRef(null);

  const customLogin = async (e) => {
    setSM(["none", ""]);
    // setAnimatorBool(true);
    let defaultErrObj = {
      email: [false, ""],
      pass: [false, ""],
      global: [false, ""],
    };

    try {
      const loginResult = await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      const fireToken = loginResult.user.accessToken;
      setToken(() => {
        return fireToken;
      });
    } catch (error) {
      const code = error.code;
      switch (code) {
        case "auth/invalid-email":
          defaultErrObj.email = [true, "enter valid email"];
          defaultErrObj.global = [true, "enter valid email"];
          break;

        case "auth/user-not-found":
          defaultErrObj.global = [true, "user not found , please signup now"];

          break;

        case "auth/wrong-password":
          defaultErrObj.global = [true, "wrong password"];
          defaultErrObj.pass = [true, "wrong password"];

          break;
        default:
          defaultErrObj.global = [true, "Something went wrong !"];

          break;
      }
      setAnimatorBool(false);
    }

    //handle error showing

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
  };

  // other options

  async function setAccessToken() {
    setToken(auth.currentUser.accessToken);
  }
  async function LoginWithGithub() {
    setAnimatorBool(true);
    setSM(["none", ""]);
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      setAccessToken();
    } catch (err) {
      setSM(["err", "login failed"]);
      setAnimatorBool(false);
    }
  }
  async function LoginWithFacebook() {
    await setAnimatorBool(true);
    await setSM(["none", ""]);

    try {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
      setAccessToken();
    } catch (err) {
      setSM(["err", "login failed"]);
      setAnimatorBool(false);
    }
  }
  async function LoginWithGoogle() {
    await setAnimatorBool(true);
    await setSM(["none", ""]);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setAccessToken();
    } catch (err) {
      setSM(["err", "login failed"]);
      setAnimatorBool(false);
    }
  }

  // after token fetched

  useEffect(() => {
    (async () => {
      if (token !== "") {
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

          setRs(true);
        } catch (error) {
          setSM([
            "err",
            "an Internal Error occurred, Please try again after some time",
          ]);
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
    const url = searchParams.get("return");
    if (url != null) {
      window.location.href = url;
      return;
    }
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <CenterBox id="login" animation={animatorBool}>
      <header>Login</header>

      <div className="inputs">
        {SM[0] !== "none" ? (
          <SmallMessageBox1 variant={SM[0]} message={SM[1]} />
        ) : (
          false
        )}

        <div className="form">
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
                text={errObj.pass[0] ? errObj.pass[1] : "Enter password"}
                variant={errObj.pass[0] ? "err" : ""}
              />
            }
            type="password"
            className="text-field"
            inputRef={passwordRef}
          />
          <Button variant="contained" onClick={customLogin}>
            Login
          </Button>
        </div>

        <Link to="/signup">
          Don't have an account? click here to create one !!{" "}
        </Link>
      </div>
      <TextBorder text="or" />

      <section className="otherOptions">
        <div className="wrapper">
          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={LoginWithGoogle}
          >
            <div className="icon"></div>
            <p>Signup with google</p>
          </Button>
          <Button
            variant="outlined"
            startIcon={<FacebookIcon />}
            onClick={LoginWithFacebook}
          >
            <div className="icon"></div>
            <p>Signup with facebook</p>
          </Button>
          <Button
            variant="outlined"
            startIcon={<GitHubIcon />}
            onClick={LoginWithGithub}
          >
            <div className="icon"></div>
            <p>Signup with github</p>
          </Button>
        </div>
      </section>
    </CenterBox>
  );
}
