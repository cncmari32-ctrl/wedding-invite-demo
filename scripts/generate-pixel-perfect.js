import fs from 'fs';
import path from 'path';
import https from 'https';

const PROJECT_DIR = '/home/ubuntu/wedding-invite-template';
const PUBLIC_DIR = path.join(PROJECT_DIR, 'public');
const ASSETS_DIR = path.join(PUBLIC_DIR, 'assets');

if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const cleanUrl = url.startsWith('//') ? `https:${url}` : url;
    
    https.get(cleanUrl, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      
      const file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log('Initiating Strict HTML Clean and Asset Cloner...');

  const htmlUrl = 'https://webgency.tilda.ws/template6';
  const htmlRes = await fetch(htmlUrl);
  let html = await htmlRes.text();

  // Find all static tildacdn assets
  const regex = /(https:)?\/\/static\.tildacdn\.(net|com)\/[^\s\"')]+/g;
  const matches = [...new Set(html.match(regex) || [])];
  
  const assetMap = {};

  for (const assetUrl of matches) {
    const cleanUrl = assetUrl.startsWith('//') ? `https:${assetUrl}` : assetUrl;
    const urlObj = new URL(cleanUrl);
    const filename = path.basename(urlObj.pathname);
    
    if (!filename) continue;

    const localPath = path.join(ASSETS_DIR, filename);
    const webPath = `./assets/${filename}`;

    try {
      await downloadFile(cleanUrl, localPath);
      assetMap[assetUrl] = webPath;
      assetMap[`//static.tildacdn.net${urlObj.pathname}`] = webPath;
      assetMap[`https://static.tildacdn.net${urlObj.pathname}`] = webPath;
    } catch (e) {
      console.error(`Failed to download ${cleanUrl}:`, e.message);
    }
  }

  // Rewrite asset paths
  for (const [remote, local] of Object.entries(assetMap)) {
    html = html.split(remote).join(local);
  }

  html = html.replace(/https:\/\/static\.tildacdn\.net\/css\/tilda-grid-3\.0\.min\.css/g, './assets/tilda-grid-3.0.min.css');

  // Replace photos with premium custom placeholders
  const customPhotos = {
    'romantic-moments-bea.jpg': 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    'elegant-couple-love-.jpg': 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop',
    '8cdb6addd9fcedfeb54b.jpg': 'https://images.unsplash.com/photo-1520854221256-17451cc350db?q=80&w=1200&auto=format&fit=crop'
  };

  for (const [filename, fallbackUrl] of Object.entries(customPhotos)) {
    const localPath = path.join(ASSETS_DIR, filename);
    try {
      await downloadFile(fallbackUrl, localPath);
    } catch (e) {
      console.error(`Failed to replace ${filename}:`, e.message);
    }
  }

  // Swap names and dates as requested ("randomise the names and dates")
  console.log('Replacing couple names and dates inside HTML...');
  html = html.split('Alexa &amp; Richard').join('Charlotte &amp; William');
  html = html.split('Alexa & Richard').join('Charlotte & William');
  html = html.split('Alexa').join('Charlotte');
  html = html.split('Richard').join('William');
  html = html.split('14').join('20');
  html = html.split('2025').join('2027'); // Futured for active countdown timer!

  // STRICT PARSE ERROR FIX: Ensure there are proper whitespaces between packed attributes
  console.log('Fixing strict HTML attribute spacing to satisfy Vite...');
  html = html.replace(/'([a-zA-Z-]+)=/g, "' $1=");
  html = html.replace(/"([a-zA-Z-]+)=/g, '" $1=');

  // Inject custom scroll video play trigger
  const scrollVideoScript = `
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const video = document.getElementById('bgVideo2');
      if (video) {
        let scrollTimeout;
        window.addEventListener('scroll', function() {
          if (video.paused) {
            video.play().catch(() => {});
          }
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            video.pause();
          }, 150);
        }, { passive: true });
      }
    });
  </script>
  `;
  html = html.replace('</body>', `${scrollVideoScript}</body>`);

  // Emojis scrub
  html = html.replace(/👰/g, '').replace(/🤵/g, '').replace(/💍/g, '').replace(/🎉/g, '');

  const outHtmlPath = path.join(PROJECT_DIR, 'index.html');
  fs.writeFileSync(outHtmlPath, html);
  console.log(`✅ Success! Strict Clean generated at ${outHtmlPath}`);
}

run();
