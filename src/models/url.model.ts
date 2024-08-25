import mongoose, { Document, Model, Schema } from 'mongoose';

import { IUrl } from '@/global/interface/model';


const UrlSchema: Schema = new Schema({
  originalUrl: { type: String, required: true },
  shortId: { type: String, required: true, unique: true },
  visits: {
    shortLink: { type: Number, default: 0 },
    qrCode: { type: Number, default: 0 },
  },
}, { timestamps: true });

const Url: Model<IUrl> = mongoose.models.Url || mongoose.model<IUrl>('Url', UrlSchema);

export default Url;
