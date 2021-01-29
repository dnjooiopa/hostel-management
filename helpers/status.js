/* eslint-disable camelcase */
const successMessage = { status: 'success' };
const errorMessage = { status: 'error' };
const status = {
  success: 200,
  created: 201,
  bad: 400,
  unauthorized: 401,
  notfound: 404,
  conflict: 409,
  error: 500
};

module.exports = {
  successMessage,
  errorMessage,
  status,
};
