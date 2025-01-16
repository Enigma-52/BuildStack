import { it, describe, expect, jest, beforeEach } from '@jest/globals';
import type { Request, Response } from 'express';
import * as newsletterService from '../src/services/newsletterService.js';
import { subscribe, sendWeeklyNewsletter } from '../src/controllers/newsletterController.js';

jest.mock('../src/services/newsletterService.js');

type MockRequest = Partial<Request> & {
 body: { email?: string }
}

type MockResponse = Partial<Response> & {
 status: jest.Mock;
 json: jest.Mock;
}

describe('Newsletter Controller', () => {
 let mockReq: MockRequest;
 let mockRes: MockResponse;
 let mockNext: jest.Mock;

 beforeEach(() => {
   mockReq = { body: {} };
   mockRes = {
     status: jest.fn().mockReturnThis(),
     json: jest.fn()
   } as MockResponse;
   mockNext = jest.fn();
   jest.clearAllMocks();
 });

 describe('subscribe', () => {
   it('should subscribe with valid email', async () => {
     const email = 'test@example.com';
     const subscriber = { id: '1', email };
     
     mockReq.body = { email };
     jest.spyOn(newsletterService, 'subscribe').mockResolvedValue(subscriber);

     await subscribe(mockReq as Request, mockRes as Response, mockNext);

     expect(newsletterService.subscribe).toHaveBeenCalledWith({ email });
     expect(mockRes.status).toHaveBeenCalledWith(201);
     expect(mockRes.json).toHaveBeenCalledWith(subscriber);
   });

   it('should throw error when email missing', async () => {
     await expect(subscribe(mockReq as Request, mockRes as Response, mockNext))
       .rejects.toThrow();
     expect(newsletterService.subscribe).not.toHaveBeenCalled(); 
   });

   it('should throw service errors', async () => {
     mockReq.body = { email: 'test@example.com' };
     const error = new Error('Subscription failed');
     jest.spyOn(newsletterService, 'subscribe').mockRejectedValue(error);

     await expect(subscribe(mockReq as Request, mockRes as Response, mockNext))
       .rejects.toThrow('Subscription failed');
   });
 });

 describe('sendWeeklyNewsletter', () => {
   it('should send newsletter successfully', async () => {
    const result = { message: 'Newsletter sent successfully', recipientCount: 100 };
    jest.spyOn(newsletterService, 'sendWeeklyNewsletter').mockResolvedValue(result);

     await sendWeeklyNewsletter(mockReq as Request, mockRes as Response, mockNext);

     expect(newsletterService.sendWeeklyNewsletter).toHaveBeenCalled();
     expect(mockRes.status).toHaveBeenCalledWith(200);
     expect(mockRes.json).toHaveBeenCalledWith(result);
   });

   it('should throw service errors', async () => {
     const error = new Error('Newsletter sending failed');
     jest.spyOn(newsletterService, 'sendWeeklyNewsletter').mockRejectedValue(error);

     await expect(sendWeeklyNewsletter(mockReq as Request, mockRes as Response, mockNext))
       .rejects.toThrow(error.message);
   });
 });
});