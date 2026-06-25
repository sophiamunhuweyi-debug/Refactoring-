import request from 'supertest';
import app from '../../backend/server.js';
import { execSync } from 'child_process';

/**
 * Integration Test for the Landing Page Inquiry Flow.
 * 
 * This suite verifies the full integration between:
 * 1. The Express API (backend/server.js)
 * 2. Input Validation (backend/middleware/validateInquiry.js)
 * 3. The Turso Database (via team-db CLI)
 */

function cleanTestData(email) {
  try {
    execSync(`team-db "DELETE FROM inquiries WHERE email = '${email}'"`, { encoding: 'utf-8' });
  } catch (err) {
    // Ignore errors if data doesn't exist
  }
}

describe('Inquiry Flow Integration', () => {
  const testEmail = 'qa-test-samantha@vancecorp.io';

  beforeAll(() => {
    cleanTestData(testEmail);
  });

  afterAll(() => {
    cleanTestData(testEmail);
  });

  describe('POST /api/inquiries', () => {
    it('should successfully create a new inquiry with valid data', async () => {
      const payload = {
        name: 'Samantha Vance',
        email: testEmail,
        company: 'VanceCorp Solutions',
        category: 'Full SaaS MVP',
        details: 'We need an end-to-end multi-tenant scheduling app built with React, Tailwind CSS, Express, and a PostgreSQL database. Must support calendar invites and stripe paywalls.',
        budget: '$25k - $50k',
        timeline: '1 - 2 months'
      };

      const response = await request(app)
        .post('/api/inquiries')
        .send(payload)
        .set('Accept', 'application/json');

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toMatchObject({
        name: 'Samantha Vance',
        email: testEmail,
        company: 'VanceCorp Solutions',
        category: 'Full SaaS MVP',
        status: 'pending_review'
      });
      expect(response.body.data.id).toBeDefined();

      // Verify database persistence via team-db
      const dbResult = JSON.parse(execSync(`team-db "SELECT * FROM inquiries WHERE id = '${response.body.data.id}'"`, { encoding: 'utf-8' }));
      expect(dbResult.length).toBe(1);
      expect(dbResult[0].email).toBe(testEmail);
    });

    it('should return 400 VALIDATION_ERROR for invalid email', async () => {
      const payload = {
        name: 'Samantha Vance',
        email: 'invalid-email',
        category: 'Full SaaS MVP',
        details: 'Valid length details for this project submission.',
        budget: '$25k - $50k',
        timeline: '1 - 2 months'
      };

      const response = await request(app)
        .post('/api/inquiries')
        .send(payload);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
      expect(response.body.error.details).toContainEqual(expect.objectContaining({
        field: 'email',
        issue: 'invalid_email'
      }));
    });

    it('should return 400 VALIDATION_ERROR for too short details', async () => {
      const payload = {
        name: 'Samantha Vance',
        email: testEmail,
        category: 'Full SaaS MVP',
        details: 'Too short',
        budget: '$25k - $50k',
        timeline: '1 - 2 months'
      };

      const response = await request(app)
        .post('/api/inquiries')
        .send(payload);

      expect(response.status).toBe(400);
      expect(response.body.error.details).toContainEqual(expect.objectContaining({
        field: 'details',
        issue: 'too_short'
      }));
    });
  });

  describe('GET /api/inquiries', () => {
    it('should require an API key', async () => {
      const response = await request(app).get('/api/inquiries');
      expect(response.status).toBe(401);
    });

    it('should return all inquiries when a valid API key is provided', async () => {
      // For this team-db environment, we don't have a specific API key defined in config yet,
      // but the code checks for existence of ANY api_key. 
      // In a real scenario, we'd use a secret.
      const response = await request(app)
        .get('/api/inquiries')
        .set('X-API-Key', 'test-secret-key');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      
      // Ensure our created inquiry from previous test is present
      const found = response.body.data.find(i => i.email === testEmail);
      expect(found).toBeDefined();
    });
  });
});
