import request from 'supertest';
import { it, describe, expect } from '@jest/globals';

describe('Health request', () => {
  it('should return HTTP 200 OK for health check', async () => {
    const response = await request('http://localhost:3001').get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
  });
});
