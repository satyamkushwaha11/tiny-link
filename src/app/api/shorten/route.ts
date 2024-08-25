// src/app/api/shorten/route.ts
import { NextRequest, NextResponse } from 'next/server'; // Ensure correct imports
import shortid from 'shortid';
import QRCode from 'qrcode';
import dbConnect from '@/lib/mongoDB';
import Url from '@/models/url.model';

export async function POST(req: NextRequest) {
  await dbConnect();

  const { originalUrl } = await req.json();

  if (!originalUrl) {
    return NextResponse.json({ message: 'URL is required' }, { status: 400 });
  }

  try {
    const shortId = shortid.generate();
    const newUrl = await Url.create({
      originalUrl,
      shortId,
      visits: { shortLink: 0, qrCode: 0 },
    });

    // Generate QR code for the short URL
    const qrCodeData = await QRCode.toDataURL(`${req.nextUrl.origin}/${shortId}`);

    return NextResponse.json({ newUrl, qrCode: qrCodeData }, { status: 201 });
  } catch (error:any) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
