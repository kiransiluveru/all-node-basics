const reqLogger = (_req, _res, next) => {
  console.log("Req Logger middleware...");
  next();
};

export default reqLogger