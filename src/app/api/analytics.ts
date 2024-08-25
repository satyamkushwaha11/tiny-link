// src/pages/api/analytics.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongoDB';
import Url from '@/models/url.model';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    const { urlId } = req.query; // Assuming you provide `urlId` as a query parameter

    if (!urlId) {
      return res.status(400).json({ message: 'Missing URL ID parameter' });
    }

    try {
      const analytics = await Url.aggregate([
        {
          $match: { _id: urlId } // Filter by specific URL ID
        },
        {
          $unwind: "$visits" // Unwind visits array for easier manipulation
        },
        {
          $group: {
            _id: { $month: "$visits.date" }, // Group by month of visit date
            shortLink: { $sum: "$visits.shortLink" },
            qrCode: { $sum: "$visits.qrCode" }
          }
        },
        {
          $sort: { "_id": 1 }
        },
        {
          $project: {
            month: "$_id",
            shortLink: 1,
            qrCode: 1,
            _id: 0
          }
        }
      ]);

      res.status(200).json(analytics);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
