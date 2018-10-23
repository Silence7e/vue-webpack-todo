export const createError = (code, message) => {
  const err = new ErrorEvent(message);
  err.code = code;
  return err;
};


export default {};
