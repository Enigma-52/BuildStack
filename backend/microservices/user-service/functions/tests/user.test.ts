import request from 'supertest';
import app from '../src/app'; 
import { it, describe, expect} from '@jest/globals';

describe('Health check request', () => {
  it('should return HTTP 200 OK for health check', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});
