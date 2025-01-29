const jwt = require("jsonwebtoken");
const { JWT_USER_SECRET } = require("../config");
function userMiddlewares(req, res, next) {
  const token = req.headers.token;
  const decodedToken=jwt.verify(token,JWT_USER_SECRET)
  if(decodedToken){
    req.userId=decodedToken
    next()
  }else{
    res.status(403).json({
        message:"error occured in authentication"
    })
  }
}

module.exports = {
  userMiddlewares,
};
