const { getAuth } = require("firebase-admin/auth");

async function verifySessionCookie(req, res, next) {
  let error = false;
  if (!req.cookies.session) {
    next({ status: 401, message: "no token", code: "ERR_TOKEN" });

    return;
  }
  try {
    const session = req.cookies.session;
    const claims = await getAuth().verifySessionCookie(session, true);
    res.locals.userData = claims;
  } catch (err) {
    console.log(err)
    error = { status: 401, message: "cookie is not valid", code: "INVALID_COOKIE" };
  }

  if (error) {
    next(error);
    return;
  }
  next();
}

module.exports = verifySessionCookie;
