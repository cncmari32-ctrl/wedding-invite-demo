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
  console.log('Initiating Unique Asset Pixel Perfect Cloner with GSAP & Google Maps...');

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
  html = html.split('<title>Alexa &amp; Richard</title>').join('<title>Charlotte &amp; William</title>');
  html = html.split('<title>Alexa & Richard</title>').join('<title>Charlotte & William</title>');
  html = html.split('content="Alexa &amp; Richard"').join('content="Charlotte &amp; William"');
  html = html.split('content="Alexa & Richard"').join('content="Charlotte & William"');
  html = html.split('>Alexa &amp; Richard</div>').join('>Charlotte &amp; William</div>');
  html = html.split('>Alexa & Richard</div>').join('>Charlotte & William</div>');
  html = html.split('>Alexa &amp; Richard</span>').join('>Charlotte &amp; William</span>');
  html = html.split('>Alexa & Richard</span>').join('>Charlotte & William</span>');
  html = html.split('<span class="tdr-num">14</span>').join('<span class="tdr-num">20</span>');
  html = html.split('<span class="tdr-num">2025</span>').join('<span class="tdr-num">2027</span>');

  // INTERACTIVE GOOGLE MAP REPLACEMENT: Populate empty wedding venue card with a beautiful, fully interactive Google Map
  console.log('Injecting Google Map iframe into the Wedding Venue card container...');
  const mapIframe = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2710.222718317551!2d-1.5583939!3d47.213233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4805ec6a235313a6%3A0xc3b00bd561a01dd8!2s33%20Rue%20de%20l'Indre%2C%2044000%20Nantes%2C%20France!5e0!3m2!1sen!2sus!4v1781959653!5m2!1sen!2sus" width="100%" height="380" style="border:0; border-radius:30px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
  
  // Robust lazy regex replacement for the tn-atom inside the venue image element
  const regexVenueCard = /<div class='t396__elem tn-elem tn-elem__20476572031730388904759'([^>]*)>([\s\S]*?)<div class='tn-atom'>([\s\S]*?)<\/div>([\s\S]*?)<\/div>/;
  html = html.replace(regexVenueCard, (match, p1, p2, p3, p4) => {
    return `<div class='t396__elem tn-elem tn-elem__20476572031730388904759'${p1}>${p2}<div class='tn-atom' style='height:380px;'>${mapIframe}</div>${p4}</div>`;
  });

  // Update venue address text safely to Nantes
  html = html.split('Address: Puerto Vallarta, MX').join("Address: 33 rue de l'indre, Nantes 44000");

  // BYPASS Tilda's SBS script for these two cloud elements so they don't fight with GSAP ScrollTrigger over transform properties!
  console.log('Bypassing Tilda SBS on cloud elements to give GSAP 100% exclusive smooth control...');
  html = html.replace(/data-elem-id='1776876503947' data-elem-type='image'[^>]*data-animate-sbs-event="scroll"/, "data-elem-id='1776876503947' data-elem-type='image' data-animate-sbs-event='none'");
  html = html.replace(/data-elem-id='1776876608318000001' data-elem-type='image'[^>]*data-animate-sbs-event="scroll"/, "data-elem-id='1776876608318000001' data-elem-type='image' data-animate-sbs-event='none'");

  // Load standard jQuery and high-performance GSAP & ScrollTrigger headers directly
  console.log('Injecting high-performance jQuery, GSAP & ScrollTrigger headers...');
  const headCDNs = `
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  `;
  html = html.replace('</head>', `${headCDNs}</head>`);

  // Optimize script loading tags to defer sequentially
  html = html.split('async charset="utf-8"').join('defer charset="utf-8"');
  
  // Fixing strict HTML attribute spacing to satisfy Vite
  html = html.replace(/'([a-zA-Z-]+)=/g, "' $1=");
  html = html.replace(/"([a-zA-Z-]+)=/g, '" $1=');

  // Inject custom scroll video play trigger, GSAP scroll clouds, AND direct fully-functional RSVP popup form submit intercept!
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
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Right-sliding cloud (slides +650px to reveal)
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

        // Left-sliding cloud (slides -650px to reveal)
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

      // 3. Fully Functional RSVP Form Submission Hook (LocalStorage database + WhatsApp redirect!)
      setTimeout(function() {
        const form = document.getElementById('form2195253293');
        if (form) {
          form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Extract values
            const nameInput = document.getElementById('input_2221855674630');
            const name = nameInput ? nameInput.value.trim() : '';
            
            // Extract selected attendance
            const checkedBoxes = Array.from(form.querySelectorAll('.t-checkbox:checked'));
            const attending = checkedBoxes.map(cb => cb.value).join(', ') || 'Yes, I will';
            
            // Extract dietary
            const dietaryInput = document.getElementById('input_2221855674632');
            const intolerance = dietaryInput ? dietaryInput.value.trim() : '';
            
            if (!name) {
              alert('Please enter your full name.');
              return;
            }

            // A. Save to LocalStorage guest registry (for love2027 dashboard!)
            const rsvpEntry = {
              id: Math.random().toString(36).substring(2, 9),
              name: name,
              attending: attending.toLowerCase().includes('yes') ? 'yes' : 'no',
              plusOne: 'no',
              meal: 'beef',
              dietary: intolerance,
              message: 'Tilda RSVP popup',
              submittedAt: new Date().toLocaleString()
            };

            const existing = localStorage.getItem('wedding_rsvps');
            const list = existing ? JSON.parse(existing) : [];
            list.push(rsvpEntry);
            localStorage.setItem('wedding_rsvps', JSON.stringify(list));

            // B. Direct WhatsApp Redirect
            const phoneNumber = "1234567890";
            let messageText = '*RSVP for Charlotte & William\\'s Wedding*%0A%0A';
            messageText += '*Guest:* ' + encodeURIComponent(name) + '%0A';
            messageText += '*Will you come:* ' + encodeURIComponent(attending) + '%0A';
            if (intolerance) {
              messageText += '*Intolerances:* ' + encodeURIComponent(intolerance) + '%0A';
            }

            // C. Show Tilda standard Form Success State box inline!
            const successBox = form.querySelector('.js-successbox') || form.parentElement.querySelector('.t-form__successbox');
            if (successBox) {
              successBox.style.display = 'block';
              form.style.display = 'none';
            } else {
              alert('Thank you! Your response was successfully recorded.');
            }

            // D. Open WhatsApp in new tab
            window.open('https://wa.me/' + phoneNumber + '?text=' + messageText, '_blank');
          });
        }
      }, 1000);
    });
  </script>
  `;
  html = html.replace('</body>', `${scrollTriggerScripts}</body>`);

  // Emojis scrub
  html = html.replace(/👰/g, '').replace(/🤵/g, '').replace(/💍/g, '').replace(/🎉/g, '');

  const outHtmlPath = path.join(PROJECT_DIR, 'index.html');
  fs.writeFileSync(outHtmlPath, html);
  console.log(`✅ Success! Strict Unique Clean generated with Google Maps & RSVP Hooks at ${outHtmlPath}`);
}

run();
