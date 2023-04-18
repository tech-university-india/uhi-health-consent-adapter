const healthId = require('../../src/services/healthId')
const RequestError = require('../../src/utils/requestError')
const abdm = require('../../src/controllers/abdm')

describe('abdm controller', () => {
  it('should return 200 for a valid request', async () => {
    const req = {
      baseUrl: '/abdm/fetch-modes',
      method: 'POST',
      body: {
        id: '12345',
        purpose: 'test',
        requester: {
          type: 'test',
          id: '12345'
        }
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    healthId.healthId = jest.fn().mockReturnValue({
      data: {
        requestId: '12345',
        timestamp: '2020-01-01T00:00:00.000Z',
        query: {
          id: '12345',
          purpose: 'test',
          requester: {
            type: 'test',
            id: '12345'
          }
        }
      },
      status: 200
    })

    await abdm(req, res)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      requestId: '12345',
      timestamp: '2020-01-01T00:00:00.000Z',
      query: {
        id: '12345',
        purpose: 'test',
        requester: {
          type: 'test',
          id: '12345'
        }
      }
    })
  })

  it('should return 400 for a bad request', async () => {
    const req = {
      baseUrl: '/abdm/fetch-modes',
      method: 'POST',
      body: {
        id: '12345',
        purpose: 'test',
        requester: {
          type: 'test',
          id: '12345'
        }
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    healthId.healthId = jest.fn().mockImplementation(() => {
      throw new RequestError('Bad Request', 400)
    })

    await abdm(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: 'Bad Request' })
  })
})
