import { it, describe, expect, beforeEach, jest } from '@jest/globals';
import type { Request, Response } from 'express';
import { authMiddleware } from '../src/middleware/authMiddleware.js';
import { verifyToken } from '../src/services/authService.js';

jest.mock('../src/services/authService.js');

type MockRequest = Partial<Request> & {
  user?: { userId: string };
  headers: { authorization?: string };
};

describe('Auth Middleware', () => {
  let mockReq: MockRequest;
  let mockRes: Partial<Response>;
  let nextFunction: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockReq = { headers: {} };
    mockRes = {};
    nextFunction = jest.fn();
  });

  it('should authenticate with valid token', () => {
    const token = 'valid.token';
    mockReq.headers.authorization = `Bearer ${token}`;
    (verifyToken as jest.Mock).mockReturnValue({ userId: '123' });

    authMiddleware(mockReq as Request, mockRes as Response, nextFunction);

    expect(mockReq.user).toEqual({ userId: '123' });
    expect(nextFunction).toHaveBeenCalledWith();
  });

  it('should fail with missing or invalid authorization header', () => {
    const invalidHeaders = [
      {},                              // Missing header
      { authorization: 'Basic token' }, // Wrong scheme
      { authorization: 'Bearer ' }      // Empty token
    ];
  
    invalidHeaders.forEach(headers => {
      jest.clearAllMocks();
      mockReq.headers = headers;
      
      authMiddleware(mockReq as Request, mockRes as Response, nextFunction);
  
      expect(verifyToken).not.toHaveBeenCalled();
      expect(nextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Authorization header is missing or invalid'
        })
      );
    });
  });

  it('should fail when token verification fails', () => {
    mockReq.headers.authorization = 'Bearer invalid.token';
    (verifyToken as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    authMiddleware(mockReq as Request, mockRes as Response, nextFunction);

    expect(nextFunction).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Invalid token'
      })
    );
  });
});