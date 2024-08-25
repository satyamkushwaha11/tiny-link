"use client";

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ originalUrl }),
    });

    const data = await res.json();
    setShortUrl(`${window.location.origin}/${data.newUrl.shortId}`);
    setQrCode(data.qrCode);
    setLoading(false);
  };

  const handleCopyUrl = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl).then(() => {
        alert('Short URL copied to clipboard!');
      });
    }
  };

  const handleDownloadQR = (format: string) => {
    if (qrCode) {
      const link = document.createElement('a');
      link.href = qrCode;
      link.download = `QRCode.${format}`;
      link.click();
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-[70vh] text-white">
        <div className="p-6 bg-white shadow-lg bg-blue-200 min-h-[85vh] w-full flex flex-col items-center bg-black">
          <div className='py-5 mb-6'>
            <h1 className="text-[1.7rem] md:text-[2.3rem] lg:text-[3rem] font-bold text-center text-gray-800 text-white">One Click to short your URL</h1>
            <p className='text-sm md:text-xl text-center text-gray-400 lg'>Enter the URL to find out how many clicks it has received so far. Example: rb.gy/pjzjsl</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-0 w-full px-0 md:px-4 lg:px-0 lg:w-3/4 mx-auto flex flex-col md:flex-row gap-2 md:gap-0 justify-center items-center">
            <input
              type="url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="Enter your URL"
              className="w-full md:w-2/4 px-2 text-black py-4 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <button type="submit" className="w-2/5 md:w-[150px] mt-0 px-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-sm hover:bg-blue-700">
              {loading ? "Loading..." : "Shorten URL"}
            </button>
          </form>
          <div className='py-3 underline cursor-pointer ' onClick={() => setOriginalUrl('')}>Short other Url</div>

          {shortUrl && (
            <div className="mt-6 text-center">
              <div className='md:flex items-center gap-3 my-3 mb-5 '>

                <p className="text-lg">
                  <span className='font-[700] pe-1'> Short URL : </span><a href={shortUrl} className="text-green-600 hover:underline">{shortUrl}</a>
                </p>
                <button onClick={handleCopyUrl} className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 bg-gradient-to-r from-blue-500 to-purple-500 ">
                  Copy URL
                </button>
              </div>
              {qrCode && (
                <div className='md:flex'>
                  <div>
                    <Image
                      src={qrCode}
                      alt="QR Code"
                      width={328}
                      height={328}
                      className="mt-4 mx-auto"
                    />
                  </div>
                  <div className="mt-4 flex flex-col md:w-9/12  justify-center items-center gap-3">
                    <button onClick={() => handleDownloadQR('png')} className="bg-gradient-to-r from-blue-500 to-purple-500  text-white py-2 px-4 rounded hover:bg-green-700">
                      Download QR as PNG
                    </button>
                    <button onClick={() => handleDownloadQR('svg')} className="bg-gradient-to-r from-blue-500 to-purple-500  text-white py-2 px-4 rounded hover:bg-green-700">
                      Download QR as SVG
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
