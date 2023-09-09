import request, { Response } from 'supertest'

describe('health', () => {
  test('GET /health', async () => {
    const response: Response = await request(`http://localhost:3000`).get(
      '/health'
    )
    expect(response.text).toEqual('OK')
    expect(response.statusCode).toBe(200)
  })
})
