const authLogger = (_req, _res, next) => {
  console.log("Authentication middleware...");
  next();
};

export default authLogger