const joi = require('joi')

const purposeCodeEnum = {
  CAREMGT: 'Care Management',
  BTG: 'Break the Glass',
  PUBHLTH: 'Public Health',
  HPAYMT: 'Healthcare Payment',
  DSRCH: 'Disease Specific Healthcare Research',
  PATRQT: ' Self Requested'
}

const hiTypesEnum = {
  Prescription: 'Prescription',
  DiagnosticReport: 'Diagnostic Report',
  OPConsultation: 'OP Consultation',
  DischargeSummary: 'Discharge Summary',
  ImmunizationRecord: 'Immunization Record',
  HealthDocumentRecord: 'Record artifact',
  WellnessRecord: 'Wellness Record'
}

const accessModeEnum = ['QUERY', 'STORE', 'VIEW', 'STREAM']

const hostUrlSchema = joi.object({
  url: joi.string().uri().required()
})

const registerFacilitiesSchema =
  joi.array().items(joi.object({
    // eslint-disable-next-line
    id: joi.string().regex(/^[a-zA-Z!@#\s+\$%\^\&*\)\(+=._-]+$/).required(),
    name: joi.string().required(),
    type: joi.string().required(),
    active: joi.boolean().required(),
    alias: joi.array().items(joi.string())
  }))

const fetchAuthModesSchema = joi.object({
  requestId: joi.string().required(),
  timestamp: joi.string().required(),
  query: joi.object({
    id: joi.string().required(),
    purpose: joi.string().required(),
    requester: joi.object({
      type: joi.string().required(),
      id: joi.string().required()
    })
  })
})

const authInitSchema = joi.object({
  requestId: joi.string().required(),
  timestamp: joi.string().required(),
  query: joi.object({
    id: joi.string().required(),
    purpose: joi.string().required(),
    authMode: joi.string().required(),
    requester: joi.object({
      type: joi.string().required(),
      id: joi.string().required()
    })
  })
})

const authConfirmSchema = joi.object({
  requestId: joi.string().required(),
  timestamp: joi.string().required(),
  transactionId: joi.string().required(),
  credential: joi.object({
    authCode: joi.string().required()
  })
})

const shareProfileSchema = joi.object({
  requestId: joi.string().required(),
  timestamp: joi.string().required(),
  acknowledgement: joi.object({
    status: joi.string().required(),
    healthId: joi.string().required(),
    tokenNumber: joi.string().required()
  }),
  error: joi.object({
    code: joi.number().required(),
    message: joi.string().required()
  }),
  resp: joi.object({
    requestId: joi.string().required()
  })
})

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
        display: joi.string().required()
      }))
    })
  })
})

const notifySchema = joi.object({
  requestId: joi.string().required(),
  timestamp: joi.string().required(),
  notification: joi.object({
    phoneNo: joi.string().required(),
    hip: joi.object({
      name: joi.string().required(),
      id: joi.string().required()
    })
  })
})

const pushNotifySchema = joi.object({
  requestId: joi.string().required(),
  timestamp: joi.string().required(),
  notification: joi.object({
    consentId: joi.string().required(),
    transactionId: joi.string().required(),
    doneAt: joi.string().required(),
    notifier: joi.object({
      type: joi.string().required(),
      id: joi.string().required()
    }),
    statusNotification: joi.object({
      sessionStatus: joi.string().required(),
      hipId: joi.string().required(),
      statusResponses: joi.array().items(joi.object({
        careContextReference: joi.string().required(),
        hiStatus: joi.string().required(),
        description: joi.string().required()
      }))
    })
  })
})

const consentRequestInitSchema = joi.object({
  requestId: joi.string().required(),
  timestamp: joi.string().required(),
  consent: joi.object({
    purpose: joi.object({
      text: joi.string().required(),
      code: joi.string().required().valid(...Object.keys(purposeCodeEnum))
    }).required(),
    patient: joi.object({
      id: joi.string().required()
    }).required(),
    hiu: joi.object({
      id: joi.string().required()
    }).required(),
    requester: joi.object({
      name: joi.string().required(),
      identifier: joi.object({
        type: joi.string(),
        value: joi.string(),
        system: joi.string()
      }).required()
    }).required(),
    hiTypes: joi.array().items(
      joi.string().valid(...Object.keys(hiTypesEnum))
    ).required(),
    permission: joi.object({
      accessMode: joi.string().valid(...accessModeEnum).required(),
      dateRange: joi.object({
        from: joi.string().required(),
        to: joi.string().required()
      }).required(),
      dataEraseAt: joi.string().required(),
      frequency: joi.object({
        unit: joi.string(),
        value: joi.number(),
        repeats: joi.number()
      }).required()
    }).required()
  }).required()
})

const cmRequestSchema = joi.object({
  requestId: joi.string().required(),
  timestamp: joi.string().required(),
  hiRequest: joi.object({
    consent: joi.object({
      id: joi.string().required()
    }).required(),
    dateRange: joi.object({
      from: joi.string().required(),
      to: joi.string().required()
    }).required(),
    dataPushUrl: joi.string().uri().required(),
    keyMaterial: joi.object({
      cryptoAlg: joi.string().required(),
      curve: joi.string().required(),
      dhPublicKey: joi.object({
        expiry: joi.string().required(),
        parameters: joi.string().required(),
        keyValue: joi.string().required()
      }).required(),
      nonce: joi.string().required()
    }).required()
  }).required()
})

const fetchConsentSchema = joi.object({
  requestId: joi.string().required(),
  timestamp: joi.string().required(),
  consentId: joi.string().required()
})

const onNotifyHipSchema = joi.object({
  requestId: joi.string().required(),
  timestamp: joi.string().required(),
  acknowledgement: joi.object({
    status: joi.string().required(),
    consentId: joi.string().required()
  }),
  resp: joi.object({
    requestId: joi.string().required()
  })
})

const onNotifyHiuSchema = joi.object({
  requestId: joi.string().required(),
  timestamp: joi.string().required(),
  acknowledgement: joi.array().items(
    joi.object({
      status: joi.string().required(),
      consentId: joi.string().required()
    })
  ),
  resp: joi.object({
    requestId: joi.string().required()
  })
})


const consentRequestStatusSchema = joi.object({
  requestId: joi.string().required(),
  timestamp: joi.string().required(),
  consentRequestId: joi.string().required()
})

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
  consentRequestInitSchema,
  cmRequestSchema,
  fetchConsentSchema,
  onNotifyHipSchema,
  onNotifyHiuSchema,
  consentRequestStatusSchema
}
