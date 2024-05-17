const { validateToken } = require("../services/auth");
const checkForAuthCookie = (cookieName) => {
  return (req, res, next) => {
    const tokenCookieVal = req.cookies[cookieName];
    if (!tokenCookieVal) {
      //no user
      return next();
    }
    try {
      const userPayload = validateToken(tokenCookieVal);
      req.user = userPayload;
    } catch (err) {}
    return next();
  };
};
module.exports = checkForAuthCookie;
