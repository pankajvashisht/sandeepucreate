const { AppError } = require('../../../common/errors');

const toApiResponse = fn => async (req, res, next) => {
  try {
    const { status, data, meta = null } = await fn(req, res);
    res.status(status).send({
      success: true,
      status,
      data,
      meta,
    });
  } catch (error) {
    next(error);
  }
};

const errorCodes = {  
  validationErrorCode: 'validationError',  
  emailAlreadyExistsErrorCode: 'emailAlreadyExistsError',  
};

const errors = {
  [errorCodes.badRequestErrorCode]: {
    status: 400,
    message: 'Bad request',
  },
  [errorCodes.notFoundErrorCode]: {
    status: 404,
    message: 'Resource not found',
  },
  [errorCodes.internalServerErrorCode]: {
    status: 500,
    message: 'Internal server error',
  },
  [errorCodes.validationErrorCode]: {
    status: 422,
    message: 'Validation error',
  },
  [errorCodes.unauthorizedErrorCode]: {
    status: 401,
    message: 'Unauthorized',
  },
  [errorCodes.forbiddenErrorCode]: {
    status: 403,
    message: 'Not allowed to access the resource',
  },
  [errorCodes.tooManyRequestsErrorCode]: {
    status: 429,
    message: 'Too many requests in this timeframe',
  },
};

class ApiError extends AppError {
  constructor({ code, message, status, details }) {
    super({ details });
    this.code = code;
    this.message = message || errors[code].message;
    this.status = status || errors[code].status;
  }
}

module.exports = { toApiResponse, ApiError, errorCodes };
