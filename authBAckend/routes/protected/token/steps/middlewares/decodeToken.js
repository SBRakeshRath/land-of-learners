const { getAuth } = require("firebase-admin/auth");

async function decodeToken(req, res, next) {
  if (!req.body.token) {
    throw { status: 401, message: "no token", code: "ERR_TOKEN" };
  }
  const auth = getAuth();

  const token = req.body.token;
  const claims = auth.body.token;
  try {
    const claims = await auth.verifyIdToken(token, true);
    if (claims.type !== stepToken) {
      throw { status: 401, message: "invalid token", code: "ERR_TOKEN" };
    }
    res.locals.stepTokenClaims = claims;
    next();
  } catch (error) {
    switch (error.code) {
      case "ERR_TOKEN":
        next(error);
        break;

      case "auth/id-token-expired":
        next({ status: 401, message: "id token expired", code: "ERR_TOKEN" });
        break;
      case "auth/id-token-revoked":
        next({ status: 401, message: "id token revoked", code: "ERR_TOKEN" });
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
}

module.exports = decodeToken;
