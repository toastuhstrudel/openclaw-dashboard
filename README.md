# OpenClaw Dashboard

A real-time dashboard for monitoring OpenClaw cron jobs, agent sessions, and memory files.

## Quick Deploy to Vercel

1. **Create a GitHub repo** (or use existing):
   ```bash
   gh repo create openclaw-dashboard --public
   ```

2. **Set Notion API key in Vercel**:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `NOTION_KEY` = your Notion integration secret

3. **Deploy**:
   ```bash
   cd dashboard
   vercel deploy --prod
   ```

## Manual Setup

### 1. Notion Setup
- Database ID: `30da2bc5-bfbd-818b-ae69-f4065280fc76`
- Share the database with your Notion integration

### 2. Local Development
```bash
cd dashboard
npm install
NOTION_KEY=your_key vercel dev
```

### 3. Run Updater Locally
```bash
node dashboard-updater.js
# Add to cron: 0 * * * * cd /path/to/workspace && node dashboard-updater.js
```

## Features
- 📅 Cron job status (last run, next run, success/fail)
- 🧠 Quick links to memory files
- 📊 Stats (total jobs, active, failed)
- 🔄 Auto-refresh every 5 minutes
