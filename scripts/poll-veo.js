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
     const op = await ai.operations.getVideosOperation({ operation: { name: operationName } });
     console.log(JSON.stringify(op, null, 2));
  } catch(e) {
     console.error(e);
  }
}
poll();
