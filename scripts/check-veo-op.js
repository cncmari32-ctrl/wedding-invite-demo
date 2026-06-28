import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({
  vertexai: {
    project: 'neat-talon-498015-d8',
    location: 'us-central1'
  }
});

async function checkOperation() {
  const operationName = 'projects/neat-talon-498015-d8/locations/global/publishers/google/models/veo-2.0-generate-001/operations/e2ea9762-1eba-4ebc-8f35-1eba64fc4262';
  console.log(`Checking status for operation: ${operationName}`);
  
  try {
    // We must poll the endpoint manually as the current SDK doesn't natively expose a simple getOperation method.
    const { GoogleAuth } = await import('google-auth-library');
    const auth = new GoogleAuth({
      keyFile: '/home/ubuntu/.config/opencode/vertex-key.json',
      scopes: ['https://www.googleapis.com/auth/cloud-platform']
    });
    
    const client = await auth.getClient();
    const url = `https://us-central1-aiplatform.googleapis.com/v1/${operationName}`;
    
    const res = await client.request({ url });
    console.log(JSON.stringify(res.data, null, 2));

  } catch (err) {
    console.error('Error checking operation:', err.message);
  }
}

checkOperation();
