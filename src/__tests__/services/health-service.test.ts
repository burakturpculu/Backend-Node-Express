import {
  getUsers,
  checkDatabaseConnection,
} from '../../services/health-service'

describe('Health-Service Database Transaction', () => {
  beforeEach(async () => {
    jest.mock('../../../../src/services/health-service')
  })
  afterAll(async () => {
    const pool = await checkDatabaseConnection()
    pool.end()
  })

  it('should return checkDatabaseConnection successfully ', async () => {
    const pool = await checkDatabaseConnection()
    const PromisePoolConnection = await pool.getConnection()
    expect(PromisePoolConnection).not.toBeNull()
  })

  it('should return getUser successfully ', async () => {
    const { data } = await getUsers('SELECT * FROM user;')
    const mockData = [
      { id: 1, name: 'Ahmet', surname: 'Mehmet' },
      { id: 2, name: 'Ali', surname: 'Veli' },
    ]
    expect(Array.isArray(data)).toBe(true)
    expect(data).toEqual(mockData)
  })

  it('should return getUser failure ', async () => {
    const expected: string =
      'The first argument must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-like Object. Received undefined'
    await expect(getUsers()).rejects.toThrowError(expected)
  })
})
