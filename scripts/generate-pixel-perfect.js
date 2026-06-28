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
  console.log('Initiating Unique Asset Pixel Perfect Cloner with GSAP ScrollTrigger...');

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

  // Replace photos with premium custom placeholders
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

  // Load GSAP & ScrollTrigger directly for buttery-smooth animations in index.html
  console.log('Injecting high-performance GSAP & ScrollTrigger headers...');
  const gsapCDNs = `
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  `;
  html = html.replace('</head>', `${gsapCDNs}</head>`);

  // Optimize script loading tags to defer sequentially
  html = html.replace(/async\s+charset="utf-8"/g, 'defer charset="utf-8"');
  
  // Fixing strict HTML attribute spacing to satisfy Vite
  html = html.replace(/'([a-zA-Z-]+)=/g, "' $1=");
  html = html.replace(/"([a-zA-Z-]+)=/g, '" $1=');

  // Inject custom scroll video play trigger AND GSAP scroll clouds timeline
  const scrollTriggerScripts = `
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      // 1. Video Scroll Control (plays when scrolling, pauses when idle)
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

      // 2. Buttery Smooth GSAP ScrollTrigger for Timeline Clouds
      // 100% Hardware-Accelerated Sliding motion as user scrolls down!
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Right-sliding cloud (originally slides +700px to reveal)
        gsap.to('[data-elem-id="1776876503947"]', {
          x: 650,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: '#rec2191866633',
            start: 'top 85%',
            end: 'bottom 15%',
            scrub: 1 // subtle smoothing lag
          }
        });

        // Left-sliding cloud (originally slides -690px to reveal)
        gsap.to('[data-elem-id="1776876608318000001"]', {
          x: -650,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: '#rec2191866633',
            start: 'top 85%',
            end: 'bottom 15%',
            scrub: 1
          }
        });
      }
    });
  </script>
  `;
  html = html.replace('</body>', `${scrollTriggerScripts}</body>`);

  // Emojis scrub
  html = html.replace(/👰/g, '').replace(/🤵/g, '').replace(/💍/g, '').replace(/🎉/g, '');

  const outHtmlPath = path.join(PROJECT_DIR, 'index.html');
  fs.writeFileSync(outHtmlPath, html);
  console.log(`✅ Success! Strict Unique Clean generated with GSAP timelines at ${outHtmlPath}`);
}

run();
