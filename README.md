# Page Pulse

Page Pulse is a small full-stack web auditing tool built for the Digital Heroes Training Task. Enter a public HTTP/HTTPS URL and the application returns useful page-level metrics.

## Features

- HTTP response status
- Response time
- Page title
- Meta description
- H1 count
- Images with missing/empty alt text
- Approximate visible word count
- Invalid URL handling
- Timeout and network error handling
- Non-HTML response handling
- Basic SSRF protection for local/private targets

## Tech Stack

**Frontend:** React, Vite, Bootstrap  
**Backend:** Node.js, Express, Axios, Cheerio  
**Testing:** Jest, Supertest

## Project Structure

- `frontend/` - React user interface
- `backend/` - Express API, page fetcher, parser, validation and tests

## Local Setup

Requires a recent Node.js LTS version.

### Backend

```bash
cd backend
npm install
npm run dev
```

The API runs at `http://localhost:5000`.

### Frontend

Open another terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

On Windows, create `.env` manually from `.env.example` if `cp` is unavailable.

## API Contract

### `POST /api/audit`

Request:

```json
{
  "url": "https://example.com"
}
```

Successful response:

```json
{
  "url": "https://example.com/",
  "status": 200,
  "responseTime": 243,
  "title": "Example Domain",
  "metaDescription": "",
  "h1Count": 1,
  "imagesMissingAlt": 0,
  "wordCount": 28
}
```

Errors use a consistent shape:

```json
{
  "error": {
    "code": "INVALID_URL",
    "message": "Please provide a valid HTTP or HTTPS URL."
  }
}
```

Possible status codes include `400`, `415`, `502`, `504`, and `500`.

## Tests

```bash
cd backend
npm test
```

The parser test suite includes a normal happy path plus failure/edge cases.

## Design Decisions

1. **Cheerio instead of a headless browser.** The requested audit fields can be extracted from server-returned HTML, so Cheerio keeps the service fast and lightweight.
2. **Fetching and parsing are separated.** `fetchPage.js` handles networking while `parsePage.js` handles HTML analysis. This makes the parsing logic easy to unit test without relying on external websites.
3. **Structured errors and defensive URL validation.** The API distinguishes invalid input, unsupported content, timeouts and fetch failures. It also blocks obvious local/private network targets to reduce SSRF risk.

## Limitations / What I Would Improve

JavaScript-heavy websites may render important content only after browser execution. With more time, I would add an optional Playwright-based audit mode and strengthen SSRF protection across redirect/DNS-rebinding scenarios.

## Deployment

A simple deployment option is:

- Frontend: Vercel
- Backend: Render

Set `VITE_API_URL` in the frontend deployment to the public backend URL.

## Required Credit

The live frontend includes a visible footer link:

[Built for Digital Heroes Training Task](https://digitalheroesco.com)
