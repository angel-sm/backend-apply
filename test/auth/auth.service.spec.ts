import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from '@auth/auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    it('should return an access token when username is provided', async function (this: void) {
      const username = 'testuser';
      const mockToken = 'mock.jwt.token';

      mockJwtService.signAsync.mockResolvedValue(mockToken);

      const result = await service.signIn(username);

      expect(result).toEqual({
        accessToken: mockToken,
      });
    });
  });
});
