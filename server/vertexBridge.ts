import type { Plugin } from 'vite';
import { resolveVertexKey, getVertexAccessToken } from './vertexAuth';

const SYSTEM_PROMPT = `You are NOORIX, the executive assistant and digital guardian to Noorish Sabah, Director of the Pakistan Sports Board (Punjab) and an officer of the Pakistan Administrative Service (PAS, 40th Common).
- If greeted ("hello", "hi", "assalam o alaikum"), respond: "Assalam o Alaikum. I am Noorix, executive assistant and digital guardian to Noorish Sabah, PAS (Director, Pakistan Sports Board, Punjab)."
- Speak as her executive assistant and digital guardian: polite, authoritative, discreet, and helpful.
- Never output robotic disclaimers ("As an AI...", "As a language model...").
- Never output internal scratchpad reasoning or <think> tags.
- Trajectory: Director PSB Punjab (119 sports facilities, 14,000+ athletes, 2026 Integrated National Sports Model), Senior Director HRM KMC Karachi (PKR 85M saved from ghost payrolls), ADC Hafizabad (Child Protection Model), Director Operations PHA Lahore (1M trees).
- Multilateral: IMF ESRx (97%) & FPP.1x (94%), MIT DEDP Fellow, KU Leuven HUMANAIx.
- Contact: dirlahrpsb@sports.gov.pk | 042-99230383 | @noorishsabah.`;

export async function executeVertexInference(query: string): Promise<{ text: string; model: string }> {
  const key = resolveVertexKey();
  if (!key) throw new Error('No Vertex AI credentials found');
  const token = await getVertexAccessToken(key);
  const projectId = key.project_id || 'noorix-498112';

  const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
  for (const model of models) {
    try {
      const url = `https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/${model}:generateContent`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: query }] }],
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          tools: [{ google_search: {} }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 1024 }
        })
      });
      if (res.ok) {
        const data = (await res.json()) as any;
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text && text.trim()) {
          const sanitized = text
            .replace(/<think>[\s\S]*?<\/think>/gi, '')
            .replace(/<think>[\s\S]*/gi, '')
            .replace(/^As an AI (assistant|language model)[^.\n]*[.\n]*/i, '')
            .trim();
          return { text: sanitized, model };
        }
      }
    } catch {}
  }
  throw new Error('All Vertex AI models failed');
}

export function vertexCloudBridgePlugin(): Plugin {
  const handler = async (req: any, res: any) => {
    if (req.method !== 'POST') {
      res.statusCode = 405;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Method Not Allowed' }));
      return;
    }
    let body = '';
    req.on('data', (c: Buffer) => { body += c.toString(); });
    req.on('end', async () => {
      try {
        const { query } = JSON.parse(body || '{}');
        if (!query || typeof query !== 'string') {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Missing query' }));
          return;
        }
        const result = await executeVertexInference(query);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ ok: true, text: result.text, model: result.model, grounded: true }));
      } catch (err: any) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ ok: false, error: err.message || 'Inference error' }));
      }
    });
  };

  return {
    name: 'vertex-cloud-bridge',
    configureServer(s) {
      s.middlewares.use((req, res, next) => {
        if (req.url === '/api/vertex' || req.url === '/api/vertex/') handler(req, res);
        else next();
      });
    },
    configurePreviewServer(s) {
      s.middlewares.use((req, res, next) => {
        if (req.url === '/api/vertex' || req.url === '/api/vertex/') handler(req, res);
        else next();
      });
    }
  };
}
