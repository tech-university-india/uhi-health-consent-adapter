const {
  hostUrlSchema,
  registerFacilitiesSchema,
  fetchAuthModesSchema,
  authInitSchema,
  authConfirmSchema,
  shareProfileSchema,
  addContextsSchema,
  notifySchema,
  pushNotifySchema,
} = require('../schemas/healthInfo')

const pathMap = {
  '/devservice/v1/bridges': hostUrlSchema,
  '/devservice/v1/bridges/addUpdateServices': registerFacilitiesSchema,
  '/devservice/v1/bridges/getServices': true,

  '/gateway/v0.5/users/auth/fetch-modes': fetchAuthModesSchema,
  '/gateway/v0.5/users/auth/init': authInitSchema,
  '/gateway/v0.5/users/auth/confirm': authConfirmSchema,
  '/gateway/v1.0/patients/profile/on-share': shareProfileSchema,

  '/gateway/v0.5/links/link/add-contexts': addContextsSchema,
  '/gateway/v0.5/patients/sms/notify2': notifySchema,

  '/gateway/v0.5/health-information/notify': pushNotifySchema,
}

module.exports = pathMap
