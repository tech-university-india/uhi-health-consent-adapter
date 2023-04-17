const Joi = require('joi')

// Variable naming convention - <verb><function><type>
// Example: verifyAadhaarOtpLogin
// Verb: verify
// Function: AadhaarOtp
// Type: Login

const emptyBody = Joi.object({})
const seachByHealthId = Joi.object({
  healthId: Joi.string().required()
})

const generateAadhaarOtp = Joi.object({
  aadhaar: Joi.string().required()
})

const resendAadhaarOtp = Joi.object({
  txnId: Joi.string().uuid({ version: 'uuidv4' }).required()
})

const verifyAadhaarOtp = Joi.object({
  otp: Joi.string().required(),
  txnId: Joi.string().uuid({ version: 'uuidv4' }).required()
})

const checkAndGenerateMobileOtp = Joi.object({
  mobile: Joi.string().length(10).required(),
  txnId: Joi.string().uuid({ version: 'uuidv4' }).required()
})

const verifyMobileOtp = Joi.object({
  otp: Joi.string().required(),
  txnId: Joi.string().uuid({ version: 'uuidv4' }).required()
})

const createHealthId = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().required(),
  middleName: Joi.string(),
  lastName: Joi.string(),
  healthId: Joi.string().required(),
  password: Joi.string().required(),
  // profilePhoto: Joi.string().required(),
  txnId: Joi.string().uuid({ version: 'uuidv4' }).required()
}).options({
  allowUnknown: true
})

const initLoginAadhaar = Joi.object({
  authMethod: Joi.string().valid('AADHAAR_OTP').required(),
  healthId: Joi.alternatives()
    .try(
      Joi.string().length(14),
      Joi.string()
        .regex(/([0-9][0-9])(-[0-9][0-9][0-9][0-9])*/)
        .length(17)
    )
    .required()
})

const verifyAadhaarOtpLogin = Joi.object({
  otp: Joi.string().required(),
  txnId: Joi.string().uuid({ version: 'uuidv4' }).required()
})

const generateMobileOtpLogin = Joi.object({
  mobile: Joi.string().length(10).required()
})

const loginWithPassword = Joi.object({
  healthId: Joi.string(),
  txnId: Joi.string().required(),
  password: Joi.string().required()
})

const userAuthorizedToken = Joi.object({
  healthId: Joi.alternatives()
    .try(
      Joi.string().length(14),
      Joi.string()
        .regex(/([0-9][0-9])(-[0-9][0-9][0-9][0-9])*/)
        .length(17)
    )
    .required(),
  txnId: Joi.string().uuid({ version: 'uuidv4' }).required()
})

const deleteAccountGenerateOtp = Joi.object({
  // method: Joi.string().valid('MOBILE', 'AADHAAR').required(),
  // mobileNumber: Joi.string().min(10).max(10),
  // aadhaar: Joi.string().min(12).max(12)
})

const deleteAccountVerifyOtp = Joi.alternatives().try(
  Joi.object({
    authMethod: Joi.string().valid('MOBILE_OTP', 'AADHAAR_OTP').required(),
    txnId: Joi.string().required(),
    otp: Joi.string().required()
  }),
  Joi.object({
    authMethod: Joi.string().valid('PASSWORD').required(),
    // txnId: Joi.string().required(),
    password: Joi.string().min(6).required()
  })
)

const changePasswordRequestBody = Joi.object({
  // updateType: Joi.string().valid('AADHAAR', 'MOBILE', 'PASSWORD').required(),
  newPassword: Joi.string().pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  ),
  oldPassword: Joi.string().pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  )
})

const changePasswordUpdate = Joi.object({
  // updateType: Joi.string().valid('AADHAAR', 'MOBILE').required(),
  newPassword: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required(),
  otp: Joi.string()
    .min(6)
    .max(6)
    .pattern(/^[0-9]+$/)
    .required(),
  txnId: Joi.string().required()
})

const generateXTokenFromRefreshToken = Joi.object({
  refreshToken: Joi.string().required()
})

const deactivateAccountByMobileInit = Joi.object({})
const deactivateAccountByAadhaarInit = Joi.object({})
const verifyDeactivateAccount = Joi.alternatives(
  Joi.object({
    authMethod: Joi.string().valid('AADHAAR_OTP', 'MOBILE_OTP').required(),
    otp: Joi.string().required(),
    txnId: Joi.string().uuid({ version: 'uuidv4' }).required()
  }),
  Joi.object({
    authMethod: Joi.string().valid('PASSWORD').required(),
    password: Joi.string().required()
  })
)
const verifyUserToken = Joi.object({
  authToken: Joi.string().required()
})

const changeEmailInit = Joi.object({
  emailAddress: Joi.string().email().required(),
  authMethod: Joi.string()
    .valid('AADHAAR_OTP', 'MOBILE_OTP', 'PASSWORD')
    .required()
})
const changeEmailVerify = Joi.alternatives().try(
  Joi.object({
    txnId: Joi.string().uuid({ version: 'uuidv4' }).required(),
    otp: Joi.string().required(),
    authMethod: Joi.string()
      .valid('AADHAAR_OTP', 'MOBILE_OTP')
      .required()
  }),
  Joi.object({
    txnId: Joi.string().uuid({ version: 'uuidv4' }).required(),
    oldPassword: Joi.string().required(),
    authMethod: Joi.string()
      .valid('PASSWORD')
      .required()
  })
)

const changeMobileVerificationInit = Joi.object({
  newMobileNumber: Joi.string().required().length(10)
})
const changeMobileVerificationNewVerify = Joi.object({
  txnId: Joi.string().uuid({ version: 'uuidv4' }).required(),
  otp: Joi.string().required()
})
const changeMobileVerifyOldByAadhaarInit = Joi.object({
  txnId: Joi.string().uuid({ version: 'uuidv4' }).required()
})
const changeMobileVerifyOldByMobileInit = Joi.object({
  txnId: Joi.string().uuid({ version: 'uuidv4' }).required()
})
const changeMobileVerifyOld = Joi.alternatives(
  Joi.object({
    authMethod: Joi.string().valid('AADHAAR_OTP', 'MOBILE_OTP').required(),
    txnId: Joi.string().uuid({ version: 'uuidv4' }).required(),
    otp: Joi.string().required()
  }),
  Joi.object({
    txnId: Joi.string().uuid({ version: 'uuidv4' }).required(),
    authMethod: Joi.string().valid('PASSWORD').required(),
    oldPassword: Joi.string().required()
  })
)

const resendMobileOtp = Joi.object({
  authMethod: Joi.string().valid('MOBILE_OTP', 'AADHAAR_OTP').required(),
  txnId: Joi.string().uuid({ version: 'uuidv4' }).required()
})

const checkHealthId = Joi.object({
  healthId: Joi.string().required(),
  yearOfBirth: Joi.number().integer().min(1900).required()
})

const generateAbhaOtpLogin = Joi.object({
  authMethod: Joi.string()
    .valid('MOBILE_OTP', 'AADHAAR_OTP', 'PASSWORD')
    .required(),
  healthid: Joi.alternatives()
    .try(
      Joi.string().length(14),
      Joi.string()
        .regex(/([0-9][0-9])(-[0-9][0-9][0-9][0-9])*/)
        .length(17)
    )
    .required()
})

const abhaLoginWithAadhaarOtp = Joi.object({
  otp: Joi.string().required(),
  txnId: Joi.string().uuid({ version: 'uuidv4' }).required()
})

const abhaLoginWithMobileOtp = Joi.object({
  otp: Joi.string().required(),
  txnId: Joi.string().uuid({ version: 'uuidv4' }).required()
})

const resendAuthOtp = Joi.object({
  authMethod: Joi.string().valid('MOBILE_OTP', 'AADHAAR_OTP').required(),
  txnId: Joi.string().uuid({ version: 'uuidv4' }).required()
})

/** **************** FORGOT ABHA  ************************/
const forgotAbhaGenerateMobileOtp = Joi.object({
  mobile: Joi.string().required().length(10)
})
const forgotAbhaGenerateAadhaarOtp = Joi.object({
  aadhaar: Joi.string().required()
})
const forgotAbhaVerifyMobileOtp = Joi.object({
  otp: Joi.string().required(),
  txnId: Joi.string().uuid({ version: 'uuidv4' }).required(),
  firstName: Joi.string().required(),
  yearOfBirth: Joi.number().integer().min(1900).max(9999).required(),
  name: Joi.string().required(),
  gender: Joi.string().valid(
    'M', 'F', 'O'
  ).required()
})

const forgotAbhaVerifyAadhaarOtp = Joi.object({
  otp: Joi.string().required(),
  txnId: Joi.string().uuid({ version: 'uuidv4' }).required()
})

const forgotAbhaResendAadhaarOtp = Joi.object({
  txnId: Joi.string().uuid({ version: 'uuidv4' }).required()
})
/** **************** END OF FORGOT ABHA  ********************/

const reactivateAuthInit = Joi.object({
  healthid: Joi.string().required(),
  authMethod: Joi.string().valid('MOBILE_OTP', 'AADHAAR_OTP', 'PASSWORD').required()

})

const reactivateAuthVerify = Joi.alternatives(
  Joi.object({
    password: Joi.string().min(6).max(1000).required(),
    txnId: Joi.string().uuid({ version: 'uuidv4' }).required(),
    authMethod: Joi.valid('PASSWORD').required()
  }),
  Joi.object({
    otp: Joi.string().required().required(),
    txnId: Joi.string().uuid({ version: 'uuidv4' }).required(),
    authMethod: Joi.valid('MOBILE_OTP', 'AADHAAR_OTP').required()
  })
)

/** ******  EXPORTS ****************/
module.exports = {
  deactivateAccountByMobileInit,
  deactivateAccountByAadhaarInit,
  generateXTokenFromRefreshToken,
  changeMobileVerificationInit,
  verifyUserToken,
  changeMobileVerificationNewVerify,
  changeMobileVerifyOldByAadhaarInit,
  changeMobileVerifyOldByMobileInit,
  changeMobileVerifyOld,
  seachByHealthId,
  generateAadhaarOtp,
  resendAadhaarOtp,
  verifyDeactivateAccount,
  verifyAadhaarOtp,
  checkAndGenerateMobileOtp,
  verifyMobileOtp,
  createHealthId,
  initLoginAadhaar,
  verifyAadhaarOtpLogin,
  generateMobileOtpLogin,
  emptyBody,
  loginWithPassword,
  changeEmailInit,
  changeEmailVerify,
  userAuthorizedToken,
  deleteAccountGenerateOtp,
  deleteAccountVerifyOtp,
  changePasswordRequestBody,
  changePasswordUpdate,
  resendMobileOtp,
  checkHealthId,
  generateAbhaOtpLogin,
  abhaLoginWithAadhaarOtp,
  abhaLoginWithMobileOtp,
  resendAuthOtp,
  forgotAbhaGenerateMobileOtp,
  forgotAbhaGenerateAadhaarOtp,
  forgotAbhaVerifyMobileOtp,
  forgotAbhaVerifyAadhaarOtp,
  forgotAbhaResendAadhaarOtp,
  reactivateAuthInit,
  reactivateAuthVerify
}
