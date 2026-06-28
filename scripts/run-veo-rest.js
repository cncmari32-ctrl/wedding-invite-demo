import { execSync } from 'child_process';

async function generateVeo() {
  const token = execSync('gcloud auth print-access-token').toString().trim();
  const url = 'https://us-central1-aiplatform.googleapis.com/v1/projects/neat-talon-498015-d8/locations/us-central1/publishers/google/models/veo-2.0-generate-001:predictLongRunning';
  
  const payload = {
    instances: [
      {
        prompt: "A cinematic, extremely slow-motion, macro shot of dark champagne silk fabric rippling and flowing elegantly in the wind. Moody, dramatic, and luxurious lighting. Photorealistic, 4k resolution, 16:9 aspect ratio."
      }
    ],
    parameters: {
      aspectRatio: "16:9"
    }
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

generateVeo();
