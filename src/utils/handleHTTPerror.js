const HTTPcodeList = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,

};

const httpErrorCode = (message) => HTTPcodeList[message];

module.exports = {
  httpErrorCode,
};
