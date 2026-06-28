import { GoogleAuth } from 'google-auth-library';

async function checkOperation() {
  const operationName = 'projects/neat-talon-498015-d8/locations/us-central1/publishers/google/models/veo-2.0-generate-001/operations/e2ea9762-1eba-4ebc-8f35-1eba64fc4262';
  const location = 'us-central1';
  
  try {
    const auth = new GoogleAuth({
      keyFile: '/home/ubuntu/.config/opencode/vertex-key.json',
      scopes: ['https://www.googleapis.com/auth/cloud-platform']
    });
    
    const client = await auth.getClient();
    // Some LROs are nested under the specific model API
    const url = `https://${location}-aiplatform.googleapis.com/v1beta1/${operationName}`;
    
    const res = await client.request({ url });
    console.log(JSON.stringify(res.data, null, 2));

  } catch (err) {
    console.error('Error checking operation:', err.message);
  }
}

checkOperation();
