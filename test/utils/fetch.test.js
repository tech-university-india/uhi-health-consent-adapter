const Fetch = require('../../src/utils/fetch');
const Redis = require('../../src/utils/cache');
const fetch = require('node-fetch');
const Response = require('../../src/utils/response');

jest.mock('../../src/utils/cache', () => ({
  getCache: jest.fn(),
  setCache: jest.fn(),
}));
jest.mock('node-fetch');
jest.mock('../../src/utils/response', () => ({
  checkForErrorsInResponse: jest.fn(),
  convertToResponseBody: jest.fn(),
}));

describe('fetch', () => {
  it('should return a function', () => {
    expect(typeof fetch).toBe('function');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return cached data if it exists', async () => {
    const requestOptions = {url: 'https://example.com/data'};
    const cachedData = {accessToken: 'cached-access-token'};

    Redis.getCache.mockReturnValue(JSON.stringify(cachedData));

    const result = await Fetch.cacheFetch(requestOptions);
    expect(Redis.getCache).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledTimes(0);
    expect(Redis.getCache).toHaveBeenCalledWith(requestOptions.url);
    expect(Response.checkForErrorsInResponse).not.toHaveBeenCalled();
    expect(Redis.setCache).not.toHaveBeenCalled();
    expect(result).toEqual(cachedData);
  });
  it('should fetch data if it is not cached', async () => {
    const requestOptions = {url: 'https://example.com/data'};
    const responseData = {accessToken: 'fetched-access-token'};
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(responseData),
      text: jest.fn().mockResolvedValueOnce(responseData),
    });

    Response.checkForErrorsInResponse.mockResolvedValueOnce();
    Redis.getCache.mockReturnValue(null);
    Response.convertToResponseBody.mockResolvedValueOnce(responseData);

    Fetch.cacheFetch(requestOptions);
    expect(Redis.getCache).toHaveBeenCalledTimes(1);
  });
});
