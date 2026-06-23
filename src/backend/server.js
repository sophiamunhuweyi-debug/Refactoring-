/**
 * Vanguard Engineering — Backend API Server
 *
 * Express.js server for client inquiry submissions.
 * - POST /api/inquiries  — Submit a new inquiry
 * - GET  /api/inquiries  — Retrieve inquiries (admin, requires API key)
 *
 * Serves on port 3000 (bound to 0.0.0.0) to be accessible via the
 * team's public website URL. CORS is configured to allow requests
 * from the frontend dev server at http://localhost:5173.
 */

import express from 'express';
import cors from 'cors';
import inquiriesRouter from './routes/inquiries.js';

const app = express();
const PORT = process.env.PORT || 3000;

// ---- Middleware ----

// CORS: allow the frontend dev server
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'X-API-Key'],
  })
);

// Parse JSON request bodies
app.use(express.json());

// ---- Routes ----

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'Vanguard API is running.' });
});

// Inquiry endpoints
app.use('/api/inquiries', inquiriesRouter);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'The requested endpoint does not exist.',
    },
  });
});

export default app;