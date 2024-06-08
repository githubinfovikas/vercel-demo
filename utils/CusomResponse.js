export const CustomResponse = (status, message,success, data) => {
  const obj = {
    status: status,
    message: message,
    success:success,
  };
  data !== undefined ? (obj.data = data) : "";
  return obj;
};
