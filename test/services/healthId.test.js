/* eslint-disable no-global-assign */
const healthId = require('../../src/services/healthId');
const getToken = require('../../src/services/gateway');
const response = require('../../src/utils/response');

describe('healthId service', () => {
  const path = '/test';
  const body = {};
  const mockAccessToken = 'mockAccessToken';
  const headers = {'content-type': 'xyz'};

  beforeEach(() => {
    jest.resetAllMocks();
    process.env.HEALTH_ID_URL = 'mockHealthIdUrl';
  });
  afterEach(() => {
    delete process.env.HEALTH_ID_URL;
  });
  it('should call getToken GET', async () => {
    const method = 'GET';
    fetch = jest.fn().mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValueOnce({}),
    });

    response.checkForErrorsInResponse = jest.fn().mockResolvedValueOnce({});
    response.convertToResponseBody = jest.fn().mockResolvedValueOnce({});
    getToken.getToken = jest.fn().mockResolvedValue(mockAccessToken);
    await healthId.healthId(path, method, headers, body);
    expect(getToken.getToken).toBeCalledTimes(1);
  });

  it('should call getToken POST', async () => {
    const method = 'POST';
    fetch = jest.fn().mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValueOnce({}),
    });

    response.checkForErrorsInResponse = jest.fn().mockResolvedValueOnce({});
    response.convertToResponseBody = jest.fn().mockResolvedValueOnce({});
    getToken.getToken = jest.fn().mockResolvedValue(mockAccessToken);
    await healthId.healthId(path, method, headers, body);
    expect(getToken.getToken).toBeCalledTimes(1);
  });
});
