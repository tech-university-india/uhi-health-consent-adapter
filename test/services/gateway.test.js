const getToken = require('../../src/services/gateway')
const cacheFetch = require('../../src/utils/fetch')

describe('gateway service', () => {
  const mockAccessToken = 'mockAccessToken'
  const mockUrl = 'https://sandbox.example.com'
  beforeEach(() => {
    jest.resetAllMocks()
    process.env.GATEWAY_URL = 'mockGatewayUrl'
    process.env.CLIENT_ID = 'mockClientId'
    process.env.CLIENT_SECRET = 'mockClientSecret'
  })

  afterEach(() => {
    delete process.env.GATEWAY_URL
    delete process.env.SANDBOX_URL
    delete process.env.CLIENT_ID
    delete process.env.CLIENT_SECRET
  })
  it('returns the access token from the sandbox URL when it is set', async () => {
    process.env.SANDBOX_URL = mockUrl
    const mockResponse = { accessToken: mockAccessToken }
    cacheFetch.cacheFetch = jest.fn().mockResolvedValue(mockResponse)
    const result = await getToken.getToken()

    expect(cacheFetch.cacheFetch).toHaveBeenCalledWith({
      url: mockUrl
    }, true)
    expect(result).toBe(mockAccessToken)
  })

  it('returns the access token from the gateway when the sandbox URL is not set', async () => {
    const mockResponse = { accessToken: mockAccessToken }
    cacheFetch.cacheFetch = jest.fn().mockResolvedValue(mockResponse)

    const result = await getToken.getToken()

    expect(cacheFetch.cacheFetch).toHaveBeenCalledWith({ method: 'POST', url: `${process.env.GATEWAY_URL}/v0.5/sessions`, body: JSON.stringify({ clientId: process.env.CLIENT_ID, clientSecret: process.env.CLIENT_SECRET }) }, true)
    expect(result).toBe(mockAccessToken)
  })
})
