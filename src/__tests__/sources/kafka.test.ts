import { consumeKafka, produceKafka } from '../../../../src/sources/kafka'

describe('Health-Service Database Transaction', () => {
  beforeEach(async () => {
    jest.mock('../../../../src/sources/kafka')
  })
  it('should return getUser successfully ', async () => {
    const { data } = await produceKafka('SELECT * FROM user;')
    const mockData = [
      { id: 1, name: 'Ahmet', surname: 'Mehmet' },
      { id: 2, name: 'Ali', surname: 'Veli' },
    ]
    expect(Array.isArray(data)).toBe(true)
    expect(data).toEqual(mockData)
  })

  it('should return getUser fail ', async () => {
    const expected: string =
      'The first argument must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-like Object. Received undefined'
    await expect(getUsers()).rejects.toThrowError(expected)
  })
})
