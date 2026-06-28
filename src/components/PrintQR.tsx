import { useRef, useEffect, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';

const PrintQR = () => {
  const qrRef = useRef<HTMLDivElement>(null);
  const [qrCode] = useState<QRCodeStyling>(
    new QRCodeStyling({
      width: 300,
      height: 300,
      data: window.location.origin + window.location.pathname, // Links to the current site
      margin: 10,
      qrOptions: {
        typeNumber: 0,
        mode: "Byte",
        errorCorrectionLevel: "Q"
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.4,
        margin: 5
      },
      dotsOptions: {
        type: "rounded",
        color: "#0a0a0a"
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      cornersSquareOptions: {
        type: "extra-rounded",
        color: "#0a0a0a"
      },
      cornersDotOptions: {
        type: "dot",
        color: "#0a0a0a"
      }
    })
  );

  useEffect(() => {
    if (qrRef.current) {
      qrRef.current.innerHTML = '';
      qrCode.append(qrRef.current);
    }
  }, [qrCode]);

  const onDownloadClick = () => {
    qrCode.download({
      extension: "png",
      name: "wedding-invite-qr"
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-brand-dark flex flex-col items-center justify-center p-8 relative z-50">
      <div className="max-w-md w-full bg-white p-12 rounded-3xl shadow-2xl flex flex-col items-center text-center border border-black/5">
        <p className="font-sans text-brand-accent tracking-[0.3em] text-xs uppercase mb-6 font-bold">
          Scan to Enter
        </p>
        <h2 className="font-serif text-4xl mb-2">Alexa & Richard</h2>
        <p className="font-sans text-sm text-black/50 mb-12">September 14, 2027</p>
        
        <div ref={qrRef} className="mb-12" />

        <button 
          onClick={onDownloadClick}
          className="px-8 py-3 bg-brand-dark text-white font-sans text-xs uppercase tracking-[0.2em] rounded-full hover:bg-brand-dark/80 transition-colors"
        >
          Download QR Code
        </button>
      </div>

      <button 
        onClick={() => window.location.hash = ''}
        className="mt-8 text-black/50 font-sans text-xs uppercase tracking-widest hover:text-black transition-colors"
      >
        Back to Invite
      </button>
    </div>
  );
};

export default PrintQR;
