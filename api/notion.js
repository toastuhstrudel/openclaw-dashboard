// api/notion.js - Vercel serverless function
// Fetches dashboard data from Notion

const NOTION_KEY = process.env.NOTION_KEY;
const DASHBOARD_DB = '30da2bc5-bfbd-818b-ae69-f4065280fc76';

export default async function handler(req, res) {
  // Set CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${DASHBOARD_DB}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sorts: [{ property: 'Last Run', direction: 'descending' }],
        page_size: 50
      })
    });
    
    const data = await response.json();
    
    const jobs = data.results?.map(page => {
      const props = page.properties;
      return {
        name: props.Name?.title?.[0]?.plain_text || 'Untitled',
        type: props.Type?.select?.name || 'Unknown',
        status: props.Status?.select?.name || 'Idle',
        schedule: props.Schedule?.rich_text?.[0]?.plain_text || 'N/A',
        lastRun: props['Last Run']?.date?.start || null,
        nextRun: props['Next Run']?.date?.start || null,
        notes: props.Notes?.rich_text?.[0]?.plain_text || ''
      };
    }) || [];
    
    res.status(200).json({ jobs });
  } catch (e) {
    console.error('Notion API error:', e);
    res.status(500).json({ error: e.message, jobs: [] });
  }
}
