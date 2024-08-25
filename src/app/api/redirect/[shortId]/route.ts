import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoDB';
import Url from '@/models/url.model';

// API Route to handle URL redirection and increment visit count
export async function GET(request: Request, { params }: { params: { shortId: string } }) {
  const { shortId } = params;
  await dbConnect();

  try {
    // Fetch the original URL from the database using the shortId
    const urlDoc = await Url.findOne({ shortId });

    if (urlDoc) {
      // Increment the visit count for shortLink
      await Url.updateOne({ shortId }, { $inc: { 'visits.shortLink': 1 } });

      // Return the original URL
      return NextResponse.json({ originalUrl: urlDoc.originalUrl });
    } else {
      // URL not found, return 404 status
      return NextResponse.json({ error: 'URL not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error finding URL:', error);
    // Return a 500 status for server error
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
