import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({
  vertexai: {
    project: 'neat-talon-498015-d8',
    location: 'us-central1'
  }
});

async function runImagen() {
  console.log('Generating Bento Grid Images with Imagen 3...');
  const assetsDir = path.join(process.cwd(), 'public', 'assets');
  if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
  }
  
  try {
    const imageResponse = await ai.models.generateImages({
      model: 'imagen-3.0-generate-001',
      prompt: 'A cinematic, extremely dark and moody wide drone shot over a misty italian lake at dusk, surrounded by dark silhouetted mountains. photorealistic, 8k resolution, elegant, minimalist. high-end fashion aesthetic.',
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '16:9'
      }
    });

    if (imageResponse.generatedImages && imageResponse.generatedImages.length > 0) {
      const base64Image = imageResponse.generatedImages[0].image.imageBytes;
      const outPath = path.join(assetsDir, 'lake-venue.jpg');
      fs.writeFileSync(outPath, Buffer.from(base64Image, 'base64'));
      console.log('✅ Successfully saved ' + outPath);
    }
    
    const imageResponse2 = await ai.models.generateImages({
      model: 'imagen-3.0-generate-001',
      prompt: 'A cinematic, macro shot of dark champagne silk fabric rippling smoothly, dramatic moody lighting, 8k resolution, photorealistic, elegant, minimalist. high-end fashion aesthetic.',
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '16:9'
      }
    });

    if (imageResponse2.generatedImages && imageResponse2.generatedImages.length > 0) {
      const base64Image = imageResponse2.generatedImages[0].image.imageBytes;
      const outPath = path.join(assetsDir, 'silk-texture.jpg');
      fs.writeFileSync(outPath, Buffer.from(base64Image, 'base64'));
      console.log('✅ Successfully saved ' + outPath);
    }
  } catch (error) {
    console.error('⚠️ Imagen generation failed:', error);
  }
}

runImagen();
