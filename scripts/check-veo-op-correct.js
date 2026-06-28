import { GoogleAuth } from 'google-auth-library';

async function checkOperation() {
  const operationId = 'e2ea9762-1eba-4ebc-8f35-1eba64fc4262';
  const projectId = 'neat-talon-498015-d8';
  const location = 'us-central1';
  
  try {
    const auth = new GoogleAuth({
      keyFile: '/home/ubuntu/.config/opencode/vertex-key.json',
      scopes: ['https://www.googleapis.com/auth/cloud-platform']
    });
    
    const client = await auth.getClient();
    // Vertex AI LROs are usually checked via the Operations endpoint
    const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/operations/${operationId}`;
    
    const res = await client.request({ url });
    console.log(JSON.stringify(res.data, null, 2));

  } catch (err) {
    console.error('Error checking operation:', err.message);
  }
}

checkOperation();
