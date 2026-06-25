/**
 * Backend integration tests for the Vanguard Engineering Inquiry API.
 */

import request from 'supertest';
import app from '../server.js';

describe('GET /api/health', () => {
  it('should return 200 and health status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Vanguard API is running.');
  });
});

describe('POST /api/inquiries — Validation', () => {
  it('should return 400 when body is empty', async () => {
    const res = await request(app).post('/api/inquiries').send({});
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('should return 400 when name is too short', async () => {
    const res = await request(app)
      .post('/api/inquiries')
      .send({
        name: 'A',
        email: 'test@example.com',
        company: 'TestCo',
        category: 'Full SaaS MVP',
        details: 'We want a full custom SaaS application built from scratch with modern tools.',
        budget: '$10k - $25k',
        timeline: '1 - 2 months',
      });
    expect(res.status).toBe(400);
    expect(res.body.error.details[0].field).toBe('name');
  });

  it('should return 400 for invalid email', async () => {
    const res = await request(app)
      .post('/api/inquiries')
      .send({
        name: 'Alice Smith',
        email: 'not-an-email',
        company: 'TestCo',
        category: 'Full SaaS MVP',
        details: 'We want a full custom SaaS application built from scratch with modern tools.',
        budget: '$10k - $25k',
        timeline: '1 - 2 months',
      });
    expect(res.status).toBe(400);
    expect(res.body.error.details[0].field).toBe('email');
  });

  it('should return 400 for invalid category', async () => {
    const res = await request(app)
      .post('/api/inquiries')
      .send({
        name: 'Alice Smith',
        email: 'alice@example.com',
        category: 'Invalid Category',
        details: 'We want a full custom SaaS application built from scratch with modern tools.',
        budget: '$10k - $25k',
        timeline: '1 - 2 months',
      });
    expect(res.status).toBe(400);
    expect(res.body.error.details[0].field).toBe('category');
  });

  it('should return 400 when details is too short', async () => {
    const res = await request(app)
      .post('/api/inquiries')
      .send({
        name: 'Alice Smith',
        email: 'alice@example.com',
        category: 'Full SaaS MVP',
        details: 'Too short',
        budget: '$10k - $25k',
        timeline: '1 - 2 months',
      });
    expect(res.status).toBe(400);
    expect(res.body.error.details[0].field).toBe('details');
  });

  it('should return 400 for invalid budget', async () => {
    const res = await request(app)
      .post('/api/inquiries')
      .send({
        name: 'Alice Smith',
        email: 'alice@example.com',
        category: 'Full SaaS MVP',
        details: 'We want a full custom SaaS application built from scratch with modern tools.',
        budget: 'Not a valid budget',
        timeline: '1 - 2 months',
      });
    expect(res.status).toBe(400);
    expect(res.body.error.details[0].field).toBe('budget');
  });

  it('should return 400 for invalid timeline', async () => {
    const res = await request(app)
      .post('/api/inquiries')
      .send({
        name: 'Alice Smith',
        email: 'alice@example.com',
        category: 'Full SaaS MVP',
        details: 'We want a full custom SaaS application built from scratch with modern tools.',
        budget: '$10k - $25k',
        timeline: 'Not a valid timeline',
      });
    expect(res.status).toBe(400);
    expect(res.body.error.details[0].field).toBe('timeline');
  });
});

describe('GET /api/inquiries — Auth', () => {
  it('should return 401 without API key', async () => {
    const res = await request(app).get('/api/inquiries');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('UNAUTHORIZED');
  });

  it('should return 200 with valid API key', async () => {
    const res = await request(app).get('/api/inquiries').set('X-API-Key', 'test-key-123');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

describe('404 handler', () => {
  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/api/unknown');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('NOT_FOUND');
  });
});