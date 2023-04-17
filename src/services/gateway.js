const cacheFetch = require('../utils/fetch')

// Change this to custom aws lambda route while running locally - krke
const SANDBOX_URL = process.env.SANDBOXURL
const getToken = async () => {
  if (SANDBOX_URL) {
    const { accessToken } = await cacheFetch(
      {
        url: SANDBOX_URL
      },
      true
    )
    return accessToken
  }

  const { accessToken } = await cacheFetch(
    {
      method: 'POST',
      url: `${process.env.GATEWAY_URL}/v0.5/sessions`,
      body: JSON.stringify({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
      })
    },
    true
  )
  return accessToken
}

module.exports = getToken
