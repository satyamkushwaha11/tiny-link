'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface RedirectProps {
  params: { shortId: string };
}

// Client Component
export default function RedirectPage({ params }: RedirectProps) {
  const { shortId } = params;
  const router = useRouter(); // Use useRouter for navigation on client-side

  const getUrl = async () => {
    try {
      const res = await fetch(`/api/redirect/${shortId}`, {
        method: 'GET',
      });

      const data = await res.json();

      if (res.ok && data?.originalUrl) {
        // Perform client-side navigation
        window.location.href = data.originalUrl;
      } else {
        // Redirect to home page on client-side
        router.push('/');
      }
    } catch (error) {
      console.error('Error during redirection:', error);
      // Redirect to home page on client-side
      router.push('/');
    }
  };

  useEffect(() => {
    getUrl();
  }, []);

  // This component does not render any content because it's always redirected
  return null;
}






// // src/app/[shortId]/page.tsx

// import { redirect } from 'next/navigation';
// import dbConnect from '@/lib/mongoDB';
// import Url from '@/models/url.model';

// interface RedirectProps {
//   params: { shortId: string };
// }

// // Server Component
// const  RedirectPage= async({ params }: RedirectProps)=> {
//   const { shortId } = params;

//   await dbConnect();

//   try {
//     // Fetch the original URL from the database using the shortId
//     const urlDoc = await Url.findOne({ shortId });
//     console.log(urlDoc,"urlDoc",'lls;samdc')

//     if (urlDoc) {
//       // Increment the visit count for shortLink
//       await Url.updateOne({ shortId }, { $inc: { 'visits.shortLink': 1 } });

//       // Redirect to the original URL if found
//       redirect(urlDoc.originalUrl);
//     } else {
//       // Redirect to the home page if the URL is not found
//       redirect('/');
//     }
//   } catch (error) {
//     console.error('Error during redirection:', error);

//     // Redirect to the home page in case of any error
//     redirect('/');
//   }

//   // Render nothing as the page will be redirected
//   return null;
// }


// export default RedirectPage