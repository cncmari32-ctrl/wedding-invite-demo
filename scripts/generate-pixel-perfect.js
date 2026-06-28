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
  console.log('Initiating Unique Asset Pixel Perfect Cloner...');

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
    
    const urlParts = urlObj.pathname.split('/').filter(Boolean);
    const filename = urlParts.join('_');
    
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

  // Replace photos
  const customPhotos = {
    'tild3862-3630-4035-b331-383335383439_romantic-moments-bea.jpg': 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    'tild3965-6266-4165-b837-303236623330_elegant-couple-love-.jpg': 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop',
    'tild3361-3537-4334-b532-323531306235_8cdb6addd9fcedfeb54b.jpg': 'https://images.unsplash.com/photo-1520854221256-17451cc350db?q=80&w=1200&auto=format&fit=crop'
  };

  for (const [filename, fallbackUrl] of Object.entries(customPhotos)) {
    const localPath = path.join(ASSETS_DIR, filename);
    try {
      await downloadFile(fallbackUrl, localPath);
    } catch (e) {
      console.error(`Failed to replace ${filename}:`, e.message);
    }
  }

  // SURGICAL replacement of couple names & dates
  console.log('Surgically replacing couple names and dates inside HTML...');
  html = html.replace(/<title>Alexa &amp; Richard<\/title>/g, '<title>Charlotte &amp; William</title>');
  html = html.replace(/<title>Alexa & Richard<\/title>/g, '<title>Charlotte & William</title>');
  html = html.replace(/content="Alexa &amp; Richard"/g, 'content="Charlotte &amp; William"');
  html = html.replace(/content="Alexa & Richard"/g, 'content="Charlotte & William"');
  html = html.replace(/>Alexa &amp; Richard<\/div>/g, '>Charlotte &amp; William</div>');
  html = html.replace(/>Alexa & Richard<\/div>/g, '>Charlotte & William</div>');
  html = html.replace(/>Alexa &amp; Richard<\/span>/g, '>Charlotte &amp; William</span>');
  html = html.replace(/>Alexa & Richard<\/span>/g, '>Charlotte & William</span>');
  html = html.replace(/<span class="tdr-num">14<\/span>/g, '<span class="tdr-num">20</span>');
  html = html.replace(/<span class="tdr-num">2025<\/span>/g, '<span class="tdr-num">2027</span>');

  // STRICT PARSE ERROR & SCRIPT ORDER FIX:
  // We change 'async' to 'defer' on all script tags to guarantee correct sequential loading!
  console.log('Optimizing script loading sequence for 100% animation fidelity...');
  html = html.replace(/async\s+charset="utf-8"/g, 'defer charset="utf-8"');
  
  // Fixing strict HTML attribute spacing to satisfy Vite
  html = html.replace(/'([a-zA-Z-]+)=/g, "' $1=");
  html = html.replace(/"([a-zA-Z-]+)=/g, '" $1=');

  // Inject custom scroll video play trigger AND local fail-safe smooth parallax scroll clouds!
  // If Tilda's engine doesn't fire, this script will run as a pristine native fallback
  // driving the timeline cloud-reveal beautifully on scroll!
  const scrollTriggerScripts = `
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      // 1. Video Scroll Control
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

      // 2. Timeline Cloud Parallax & Reveal Motion Fallback
      // This directly moves the left-side and right-side branch assets as the user scrolls!
      const leftCloud = document.querySelector('[data-elem-id="1776876608318000001"]');
      const rightCloud = document.querySelector('[data-elem-id="1776878815963000001"]');
      
      if (leftCloud || rightCloud) {
        window.addEventListener('scroll', function() {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          
          // Calculate parallax factors
          if (leftCloud) {
            const leftRect = leftCloud.getBoundingClientRect();
            if (leftRect.top < windowHeight && leftRect.bottom > 0) {
              const progress = (windowHeight - leftRect.top) / (windowHeight + leftRect.height);
              // Slide in from the left as we scroll down
              const offset = -400 + (progress * 400);
              leftCloud.style.transform = 'translateX(' + Math.min(0, offset) + 'px)';
              leftCloud.style.transition = 'transform 0.1s ease-out';
            }
          }
          
          if (rightCloud) {
            const rightRect = rightCloud.getBoundingClientRect();
            if (rightRect.top < windowHeight && rightRect.bottom > 0) {
              const progress = (windowHeight - rightRect.top) / (windowHeight + rightRect.height);
              // Slide in from the right as we scroll down
              const offset = 400 - (progress * 400);
              rightCloud.style.transform = 'translateX(' + Math.max(0, offset) + 'px)';
              rightCloud.style.transition = 'transform 0.1s ease-out';
            }
          }
        }, { passive: true });
      }
    });
  </script>
  `;
  html = html.replace('</body>', `${scrollTriggerScripts}</body>`);

  // Emojis scrub
  html = html.replace(/👰/g, '').replace(/🤵/g, '').replace(/💍/g, '').replace(/🎉/g, '');

  const outHtmlPath = path.join(PROJECT_DIR, 'index.html');
  fs.writeFileSync(outHtmlPath, html);
  console.log(`✅ Success! Strict Unique Clean generated at ${outHtmlPath}`);
}

run();
