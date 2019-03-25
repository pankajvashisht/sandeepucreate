const {
  toApiResponse,
  ApiError,
  errorCodes: {
    emailAlreadyExistsErrorCode,
  },
} = require('../../utils/response.js');


const {
  errors:{
    EmailAlreadyExistsError ,
  },   
} = require('../../../../dal/user.js');

const check = require('express-validator/check');
const { validateInput } = require('../../utils/validate-input.js');

const createNewUserRoute = ({
  router,  
  dal: { userDal },  
}) => {

  router.post(
    '/new',    
    [
      check.body('email').isEmail(),
      check
        .body('password')
        .isString()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters in length.')
        .matches('[0-9]')
        .withMessage('Password must contain at least 1 number.')
        .matches('[A-Z]')
        .withMessage('Password must contain at least 1 uppercase letter.'),
      check.body('firstName').isString(),  
    ],
    validateInput,
    toApiResponse(async req => {
      const { body } = req;

      try {
        const user = await userDal.create({
          ...body,          
        });
        delete user.userId;

        return {
          status: 201,
          data: user,
        };
      } catch (error) {
        if (error instanceof EmailAlreadyExistsError) {
          throw new ApiError({
            status: 422,
            code: emailAlreadyExistsErrorCode,
            message: 'Email already exists.',
          });
        }        
        throw error;
      }
    }),
  );

  return router;
};

module.exports = { createNewUserRoute };
