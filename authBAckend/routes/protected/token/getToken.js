const router = require("express").Router();
const { getAuth } = require("firebase-admin/auth");
const expiresIn = 60 * 60 * 24 * 5 * 1000; //5days

const createIdToken = async (req) => {
  //VALIDATE TOKEN
  if (!req.body.idToken) {
    throw { status: 401, message: "no token", code: "ERR_TOKEN" };
    return;
  }

  const token = req.body.idToken.toString();
  await getAuth().verifyIdToken(token, true);

  //create token

  const sessionCookie = getAuth().createSessionCookie(token, { expiresIn });

  return sessionCookie;
};
router.post("/", async (req, res, next) => {

  try {
    const sessionCookie = await createIdToken(req);
    const options = {
      maxAge: expiresIn,
      domain : ".landoflearners.com"
    };
    // await getAuth().verifySessionCookie(sessionCookie, true);
    res.cookie("session", sessionCookie, options);
    res.json({ code: "SUCCESS", message: "Successfully Logged in" , session : sessionCookie});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
