const joi = require('joi');

const hostUrlSchema = joi.object({
  url: joi.string().uri().required(),
});

const registerFacilitiesSchema =
  joi.array().items(joi.object({
    id: joi.string().regex(/^[a-zA-Z!@#\s+\$%\^\&*\)\(+=._-]+$/).required(),
    name: joi.string().required(),
    type: joi.string().required(),
    active: joi.boolean().required(),
    alias: joi.array().items(joi.string()),
  }))

const fetchAuthModesSchema = joi.object({
  requestId: joi.string().required(),
  timestamp: joi.string().required(),
  query: joi.object({
    id: joi.string().required(),
    purpose: joi.string().required(),
    requester: joi.object({
      type: joi.string().required(),
      id: joi.string().required(),
    }),
  }),
});

const authInitSchema = joi.object({
  requestId: joi.string().required(),
  timestamp: joi.string().required(),
  query: joi.object({
    id: joi.string().required(),
    purpose: joi.string().required(),
    authMode: joi.string().required(),
    requester: joi.object({
      type: joi.string().required(),
      id: joi.string().required(),
    }),
  }),
});

const authConfirmSchema = joi.object({
  requestId: joi.string().required(),
  timestamp: joi.string().required(),
  transactionId: joi.string().required(),
  credential: joi.object({
    authCode: joi.string().required(),
  }),
});

const shareProfileSchema = joi.object({
  requestId: joi.string().required(),
  timestamp: joi.string().required(),
  acknowledgement: joi.object({
    status: joi.string().required(),
    healthId: joi.string().required(),
    tokenNumber: joi.string().required(),
  }),
  error: joi.object({
    code: joi.number().required(),
    message: joi.string().required(),
  }),
  resp: joi.object({
    requestId: joi.string().required(),
  }),
});

const addContextsSchema = joi.object({
  requestId: joi.string().required(),
  timestamp: joi.string().required(),
  link: joi.object({
    accessToken: joi.string().required(),
    patient: joi.object({
      referenceNumber: joi.string().required(),
      display: joi.string().required(),
      careContexts: joi.array().items(joi.object({
        referenceNumber: joi.string().required(),
        display: joi.string().required(),
      })),
    }),
  }),
});

const notifySchema = joi.object({
  requestId: joi.string().required(),
  timestamp: joi.string().required(),
  notification: joi.object({
    phoneNo: joi.string().required(),
    hip: joi.object({
      name: joi.string().required(),
      id: joi.string().required(),
    }),
  }),
});

const pushNotifySchema = joi.object({
  requestId: joi.string().required(),
  timestamp: joi.string().required(),
  notification: joi.object({
    consentId: joi.string().required(),
    transactionId: joi.string().required(),
    doneAt: joi.string().required(),
    notifier: joi.object({
      type: joi.string().required(),
      id: joi.string().required(),
    }),
    statusNotification: joi.object({
      sessionStatus: joi.string().required(),
      hipId: joi.string().required(),
      statusResponses: joi.array().items(joi.object({
        careContextReference: joi.string().required(),
        hiStatus: joi.string().required(),
        description: joi.string().required(),
      })),
    }),
  }),
});

module.exports = {
  hostUrlSchema,
  registerFacilitiesSchema,
  fetchAuthModesSchema,
  authInitSchema,
  authConfirmSchema,
  shareProfileSchema,
  addContextsSchema,
  notifySchema,
  pushNotifySchema,
}
