import { execSync } from 'child_process';

async function poll() {
  const token = execSync('gcloud auth print-access-token').toString().trim();
  const resourceName = 'projects/neat-talon-498015-d8/locations/us-central1/publishers/google/models/veo-2.0-generate-001';
  const url = `https://us-central1-aiplatform.googleapis.com/v1beta1/${resourceName}:fetchPredictOperation`;
  
  const payload = {
    operationName: `${resourceName}/operations/3b096ec4-8fda-48b7-a5ad-f573a84af8ba`
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

poll();
