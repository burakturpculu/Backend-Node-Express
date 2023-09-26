import AuthService from '../../auth/auth.service'
import UserDTO from '../../users/users.dto'

import FinderService from '../../users/services/finder.service'

import AuthUtil from '../../utils/auth.utils'
describe('Auth-Service Transaction', () => {
  beforeEach(async () => {
    jest.mock('../../../src/auth/auth.service')
  })
  // Successful login with valid email and password
  // Successful login with valid email and password
  it('should return AuthDTO object with valid data when login is successful', async () => {
    // Arrange
    const email = 'validemail@example.com'
    const password = 'validpassword'
    const expectedAccessToken = 'validAccessToken'
    const expectedRefreshToken = 'validRefreshToken'
    const expectedResponse = {
      accessToken: expectedAccessToken,
      refreshToken: expectedRefreshToken,
    }

    // Mock FinderService.getUserByEmailAndPassword
    const mockUserDTO: UserDTO = {
      id: 'validUserId',
      email: email,
      name: 'John',
      surname: 'Doe',
    }
    const mockGetUserByEmailAndPassword = jest
      .spyOn(FinderService, 'getUserByEmailAndPassword')
      .mockResolvedValue(mockUserDTO)

    // Mock AuthUtil.generateAccessToken
    const mockGenerateAccessToken = jest
      .spyOn(AuthUtil, 'generateAccessToken')
      .mockReturnValue(expectedAccessToken)

    // Mock AuthUtil.generateRefreshToken
    const mockGenerateRefreshToken = jest
      .spyOn(AuthUtil, 'generateRefreshToken')
      .mockReturnValue(expectedRefreshToken)

    // Act
    const response = await AuthService.login({ email, password })

    // Assert
    expect(mockGetUserByEmailAndPassword).toHaveBeenCalledWith({
      email,
      password,
    })
    expect(mockGenerateAccessToken).toHaveBeenCalledWith(mockUserDTO.id)
    expect(mockGenerateRefreshToken).toHaveBeenCalledWith(mockUserDTO.id)
    expect(response).toEqual(expectedResponse)
  })
})
