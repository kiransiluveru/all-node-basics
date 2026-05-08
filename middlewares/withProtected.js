import jsonwebtoken from "jsonwebtoken";
import config from "config";
const withProtected = (req, res, next) => {
  console.log("Authentication middleware...")
  // get header x-access-token
  const token = req.headers["x-access-token"];
  if (token) {
    try {
      // debugger;
      const decodedToken = jsonwebtoken.verify(token, config.get("jwt_secret_key"));
      req.user = decodedToken;
      next();
    } catch (error) {
      return res.status(401).send({ message: "Unauthorized" });
    }
  } else {
    return res.status(401).send({ message: "Unauthorized, No Token provided" });
  }
};

export default withProtected;
