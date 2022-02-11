const router = require("express").Router();
const { getAuth } = require("firebase-admin/auth");

router.use(require("./middleWares/verifySessionCookie.js"));
router.use(require("./middleWares/setUserData.js"));

router.post("/", async (req, res, next) => {
  const data = res.locals.userData;
  // read data from db

  try {
    const fdb = req.app.get("fdb");
    udRef = fdb.collection("usersData").doc(data.uid);
    const doc = await udRef.get();

    if (!doc.exists) {
      throw new Error();
    }
    const docData = doc.data();
    // console.log(docData.activeInfo.step);
    if (docData.activeInfo.reason === "INCOMPLETE_SIGNUP_STEPS") {
      const additionalClaims = {
        type: "stepToken",
        step: docData.activeInfo.step || true,
      };

      // const token2 = await getAuth().setCustomUserClaims(
      //   data.uid,
      //   additionalClaims
      // );
      const token = await getAuth().createCustomToken(
        data.uid,
        additionalClaims
      );
      res.json({
        msg: "success",
        code: "SUCCESS",
        token: token,
      });
    } else {
      throw {
        status: 400,
        message: "steps already completed",
        code: "NO_PENDING_STEPS",
      };
    }
  } catch (error) {
    console.log(error);
    switch (error.code) {
      case "NO_PENDING_STEPS":
        next(error);
        break;

      default:
        next({
          status: 500,
          message: "internal server error",
          code: "INTERNAL_ERROR",
        });
        break;
    }
  }
});

module.exports = router;
