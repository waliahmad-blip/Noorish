import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

export interface VertexKey {
  client_email: string;
  private_key: string;
  project_id: string;
  token_uri?: string;
}

export function resolveVertexKey(): VertexKey | null {
  const candidates = [
    process.env.GOOGLE_APPLICATION_CREDENTIALS,
    process.env.NOORIX_VERTEX_KEY,
    path.resolve(process.cwd(), 'noorix-vertex-key.json'),
    'C:\\Nooriva\\noorix-vertex-key.json',
    'C:\\Noorix\\noorix-vertex-key.json'
  ];
  for (const p of candidates) {
    if (p && fs.existsSync(p)) {
      try {
        const k = JSON.parse(fs.readFileSync(p, 'utf8'));
        if (k.client_email && k.private_key) return k;
      } catch {}
    }
  }
  if (process.env.VERTEX_SERVICE_ACCOUNT_JSON) {
    try {
      const k = JSON.parse(process.env.VERTEX_SERVICE_ACCOUNT_JSON);
      if (k.client_email && k.private_key) return k;
    } catch {}
  }
  return null;
}

let cached: { token: string; exp: number } | null = null;

export async function getVertexAccessToken(k: VertexKey): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  if (cached && cached.exp > now + 120) return cached.token;

  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const claim = Buffer.from(JSON.stringify({
    iss: k.client_email,
    scope: 'https://www.googleapis.com/auth/cloud-platform',
    aud: k.token_uri || 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  })).toString('base64url');

  const unsigned = `${header}.${claim}`;
  const sig = crypto.createSign('RSA-SHA256').update(unsigned).sign(k.private_key, 'base64url');
  const jwt = `${unsigned}.${sig}`;

  const res = await fetch(k.token_uri || 'https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    })
  });
  if (!res.ok) throw new Error(`Token exchange failed: ${res.status}`);
  const data = (await res.json()) as { access_token: string; expires_in?: number };
  cached = { token: data.access_token, exp: now + (data.expires_in || 3600) };
  return data.access_token;
}
