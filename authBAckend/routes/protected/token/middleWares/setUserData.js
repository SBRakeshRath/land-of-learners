const express = require("express");
const app = express();
const { getAuth } = require("firebase-admin/auth");

async function setUserData(req, res, next) {
  const fdb = req.app.get("fdb");
  const claim = res.locals.userData;
  try {
    const data = await getAuth().getUser(claim.uid);
    // structure data
    const ds = {
      pd: {
        name: data.displayName || "",
        mail: data.email || "",
        dob: "",
        photo: data.photoURL || "",
        no: "",
      },
      location: {
        lat: "",
        lan: "",
        country: "",
        state: "",
        pin: "",
        other: "",
      },
      verified: [],
      activeInfo: {
        active: false,
        reason: "INCOMPLETE_SIGNUP_STEPS",
        step: 1,
        message: "complete steps to activate account",
      },
    };
    //set data
    udRef = fdb.collection("usersData").doc(data.uid);
    const doc = await udRef.get();
    if (!doc.exists) {
      const setRes = await udRef.set(ds);
    }
  } catch (error) {
    // console.log(error);
    next({
      status: 500,
      message: "internal server error",
      code: "INTERNAL_ERROR",
    });
    return;
  }
  next();
}
module.exports = setUserData;
