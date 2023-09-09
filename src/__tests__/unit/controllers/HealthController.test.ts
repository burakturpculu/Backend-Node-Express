import { Request, Response } from 'express'
import HealthController from '../../../controllers/HealthController'

describe('controllers/HealthController', () => {
  test('health returns 200 OK', async () => {
    const req: Request = {} as Request
    const res: Response = {
      send: jest.fn(),
      status: jest.fn(() => res),
    } as unknown as Response

    const resSendSpy: jest.SpyInstance = jest.spyOn(res, 'send')
    const resStatusSpy: jest.SpyInstance = jest.spyOn(res, 'status')

    HealthController.health(req, res)

    expect(resStatusSpy).toHaveBeenCalledTimes(1)
    expect(resStatusSpy).toHaveBeenCalledWith(200)
    expect(resSendSpy).toHaveBeenCalledTimes(1)
    expect(resSendSpy).toHaveBeenCalledWith('OK')
  })
})
