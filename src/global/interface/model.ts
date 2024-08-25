


export interface IUrl extends Document {
    originalUrl: string;
    shortId: string;
    visits: {
      shortLink: number;
      qrCode: number;
    };
  }


