const { dataPushPath } = require('../utils/constants')

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
  consentRequestInitSchema,
  cmRequestSchema,
  fetchConsentSchema,
  onNotifyHipSchema,
  onNotifyHiuSchema,
  consentRequestStatusSchema
} = require('../schemas/healthInfo')

const pathMap = {
  // move the 3 routes to facility onboarding service once created
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
  '/gateway/v0.5/health-information/cm/request': cmRequestSchema,

  '/gateway/v0.5/consent-requests/init': consentRequestInitSchema,

  '/gateway/v0.5/consents/fetch': fetchConsentSchema,

  '/gateway/v0.5/consents/hip/on-notify': onNotifyHipSchema,
  '/gateway/v0.5/consents/hiu/on-notify': onNotifyHiuSchema,

  '/v0.5/consent-requests/status': consentRequestStatusSchema,
  '/v0.5/health-information/cm/on-request': consentRequestStatusSchema
}

pathMap[dataPushPath] = dataPushSchema

module.exports = pathMap
