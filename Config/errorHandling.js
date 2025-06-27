function successResponse(res, status, message, data, token) {
  const response = {
    success: true,
    status,
    message,
    data,
    token
  };
  return res.status(status).json(response);
}
function errorResponse(res, status, message) {
  const response = {
    success: false,
    status,
    message,
   
  };
  return res.status(status).json(response);
}
module.exports = {
  successResponse,
  errorResponse,
};
