// import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI as string;

// if (!MONGODB_URI) {
//   throw new Error(
//     'Please define the MONGODB_URI environment variable inside .env.local'
//   );
// }


// let cached:any = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function dbConnect() {
//   if (cached.conn) {
//     console.log('database connection start-------')
//     return cached.conn;
//   }
  
//   if (!cached.promise) {
//     const opts:{} = {
//       // useNewUrlParser: true,
//       // useUnifiedTopology: true,
//     };

//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//       return mongoose;
//     });
//     console.log('database connected ')
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default dbConnect;













import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Create a cached connection variable
let cachedConnection: mongoose.Connection | null | any = null;
let cachedPromise: Promise<typeof mongoose> | null = null;

async function dbConnect() {
  // If the connection already exists, return it
  if (cachedConnection) {
    console.log('Using existing database connection');
    return cachedConnection;
  }

  // If there's no existing connection, create one
  if (!cachedPromise) {
    const opts = {
      // Add any connection options here if needed
    };

    cachedPromise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log('New database connection established');
      cachedConnection = mongooseInstance.connection;
      return mongooseInstance;
    });
  }

   cachedConnection = await cachedPromise;
  return cachedConnection;
}

export default dbConnect;

