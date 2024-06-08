export const CustomError = (statusCode, msg) => {
  let err = new Error();
  err.message = msg;
  err.statusCode = statusCode;
  err.success = false;
  return err;
};
