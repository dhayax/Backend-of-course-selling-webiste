const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config");
function adminMiddlewares(req, res, next) {
  const token = req.headers.token;
  const decodedToken=jwt.verify(token,JWT_ADMIN_SECRET)
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
  adminMiddlewares,
};
