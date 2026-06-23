/**
 * Validation middleware for POST /api/inquiries
 * Matches the validation rules defined in docs/ui-design.md Section 5.2
 */

const VALID_CATEGORIES = [
  'Full SaaS MVP',
  'Responsive Frontend',
  'Custom REST/GraphQL API',
  'Consulting & Architecture',
];

const VALID_BUDGETS = ['<$10k', '$10k - $25k', '$25k - $50k', '$50k+'];

const VALID_TIMELINES = ['< 1 month', '1 - 2 months', '2 - 4 months', '4+ months'];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInquiry(body) {
  const details = [];

  // name: required, 2-80 chars
  if (!body.name || typeof body.name !== 'string' || body.name.trim().length < 2) {
    details.push({
      field: 'name',
      issue: 'too_short',
      message: 'Please enter your full name (minimum 2 characters).',
    });
  } else if (body.name.trim().length > 80) {
    details.push({
      field: 'name',
      issue: 'too_long',
      message: 'Name must be at most 80 characters.',
    });
  }

  // email: required, valid format
  if (!body.email || typeof body.email !== 'string' || !EMAIL_REGEX.test(body.email.trim())) {
    details.push({
      field: 'email',
      issue: 'invalid_email',
      message: 'Please enter a valid business email address.',
    });
  }

  // company: optional, max 100 chars
  if (body.company !== undefined && body.company !== null && body.company !== '') {
    if (typeof body.company !== 'string' || body.company.trim().length > 100) {
      details.push({
        field: 'company',
        issue: 'too_long',
        message: 'Company name must be at most 100 characters.',
      });
    }
  }

  // category: required, must be valid option
  if (!body.category || !VALID_CATEGORIES.includes(body.category)) {
    details.push({
      field: 'category',
      issue: 'invalid_category',
      message: 'Please select a project category.',
    });
  }

  // details (project details): required, 20-1000 chars
  if (!body.details || typeof body.details !== 'string' || body.details.trim().length < 20) {
    details.push({
      field: 'details',
      issue: 'too_short',
      message: 'Please describe your project in more detail (at least 20 characters).',
    });
  } else if (body.details.trim().length > 1000) {
    details.push({
      field: 'details',
      issue: 'too_long',
      message: 'Project details must be at most 1000 characters.',
    });
  }

  // budget: required, must be valid option
  if (!body.budget || !VALID_BUDGETS.includes(body.budget)) {
    details.push({
      field: 'budget',
      issue: 'invalid_budget',
      message: 'Please select an estimated budget range.',
    });
  }

  // timeline: required, must be valid option
  if (!body.timeline || !VALID_TIMELINES.includes(body.timeline)) {
    details.push({
      field: 'timeline',
      issue: 'invalid_timeline',
      message: 'Please select your target timeline.',
    });
  }

  return details;
}