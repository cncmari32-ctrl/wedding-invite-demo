import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import https from 'https';

const ai = new GoogleGenAI({
  vertexai: {
    project: 'neat-talon-498015-d8',
    location: 'us-central1'
  }
});

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function generateVeoVideo() {
  console.log('Initiating Veo Video Generation (veo-2.0-generate-001)...');
  console.log('This will take several minutes. Please wait...');
  
  const assetsDir = path.join(process.cwd(), 'public', 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  try {
    const response = await ai.models.generateVideos({
      model: 'veo-2.0-generate-001',
      prompt: 'A cinematic, extremely slow-motion, macro shot of dark champagne silk fabric rippling and flowing elegantly in the wind. Moody, dramatic, and luxurious lighting. Photorealistic, 4k resolution, 16:9 aspect ratio.',
      config: {
        fps: 24,
        durationSeconds: 5
      }
    });

    console.log('Generation completed. Processing response...');
    
    if (response.generatedVideos && response.generatedVideos.length > 0) {
      const video = response.generatedVideos[0].video;
      const outputPath = path.join(assetsDir, 'veo-background.mp4');

      if (video.videoBytes) {
        fs.writeFileSync(outputPath, Buffer.from(video.videoBytes, 'base64'));
        console.log(`✅ Successfully saved Veo video to ${outputPath}`);
      } else if (video.uri) {
        console.log(`Downloading video from URI: ${video.uri}`);
        await downloadFile(video.uri, outputPath);
        console.log(`✅ Successfully downloaded Veo video to ${outputPath}`);
      } else {
         console.error('No videoBytes or uri found in the response.');
         console.log(JSON.stringify(response, null, 2));
      }
    } else {
        console.log('No generated videos found in response.');
        console.log(JSON.stringify(response, null, 2));
    }
  } catch (error) {
    console.error('⚠️ Veo generation failed:', error);
  }
}

generateVeoVideo();
