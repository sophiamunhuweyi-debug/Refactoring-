/**
 * Routes: /api/inquiries
 * 
 * POST /api/inquiries - Submit a new client inquiry
 * GET  /api/inquiries - Retrieve all inquiries (admin view with basic auth)
 */

import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { execSync } from 'child_process';
import { validateInquiry } from '../middleware/validateInquiry.js';

const router = Router();

function runTeamDb(sql) {
  const escaped = sql.replace(/"/g, '\\"');
  const output = execSync(`team-db "${escaped}"`, { encoding: 'utf-8', timeout: 10000 });
  return JSON.parse(output);
}

/**
 * POST /api/inquiries — Submit a new inquiry
 */
router.post('/', (req, res) => {
  try {
    const validationErrors = validateInquiry(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'The inquiry payload failed validation.', details: validationErrors },
      });
    }

    const { name, email, company, category, details, budget, timeline } = req.body;
    const id = uuidv4();
    const now = new Date().toISOString().replace('T', ' ').split('.')[0];
    const esc = (v) => (v ? v.replace(/'/g, "''") : '');

    const sql = `INSERT INTO inquiries (id, name, email, company, category, details, budget, timeline, status, created_at, updated_at) VALUES ('${esc(id)}', '${esc(name.trim())}', '${esc(email.trim())}', '${esc(company ? company.trim() : '')}', '${esc(category)}', '${esc(details.trim())}', '${esc(budget)}', '${esc(timeline)}', 'pending_review', '${now}', '${now}') RETURNING *`;

    const result = runTeamDb(sql);
    const row = result[0];

    return res.status(201).json({
      success: true,
      message: 'Inquiry successfully submitted.',
      data: {
        id: row.id,
        name: row.name,
        email: row.email,
        company: row.company || null,
        category: row.category,
        details: row.details,
        budget: row.budget,
        timeline: row.timeline,
        status: row.status,
        createdAt: row.created_at,
      },
    });
  } catch (err) {
    console.error('POST /api/inquiries error:', err);
    return res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'An unexpected error occurred. Our engineers have been notified.' },
    });
  }
});

/**
 * GET /api/inquiries — Retrieve all inquiries (admin, requires API key)
 */
router.get('/', (req, res) => {
  try {
    const apiKey = req.headers['x-api-key'] || req.query.api_key;
    if (!apiKey) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'API key is required. Provide it via X-API-Key header or ?api_key= parameter.' },
      });
    }

    const result = runTeamDb('SELECT * FROM inquiries ORDER BY created_at DESC');

    return res.status(200).json({
      success: true,
      data: result.map((row) => ({
        id: row.id,
        name: row.name,
        email: row.email,
        company: row.company || null,
        category: row.category,
        details: row.details,
        budget: row.budget,
        timeline: row.timeline,
        status: row.status,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      })),
    });
  } catch (err) {
    console.error('GET /api/inquiries error:', err);
    return res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'An unexpected error occurred. Our engineers have been notified.' },
    });
  }
});

export default router;