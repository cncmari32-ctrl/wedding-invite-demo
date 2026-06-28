import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  vertexai: {
    project: 'neat-talon-498015-d8',
    location: 'us-central1'
  }
});

async function poll() {
  const operationName = 'projects/neat-talon-498015-d8/locations/global/publishers/google/models/veo-2.0-generate-001/operations/e2ea9762-1eba-4ebc-8f35-1eba64fc4262';
  try {
     console.log('We cannot retrieve it dynamically this way because the genai SDK does not export getOperation yet.');
  } catch(e) {
     console.log(e);
  }
}
poll();
