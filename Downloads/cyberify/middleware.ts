import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';


// Define public routes
const isPublicRoute = createRouteMatcher([ '/','/events/:id','/api/webhook/clerk','/api/webhook/stripe','/api/uploadthing']);

// Define ignored routes (e.g., health check APIs, static files)
const ignoreRoutes = createRouteMatcher(['/api/webhook/clerk','/api/webhook/stripe','/api/uploadthing']);

export default clerkMiddleware((auth, request) => {
  const { pathname } = request.nextUrl;

  // // If the route is in the ignored routes, skip Clerk middleware logic
  // if (ignoreRoutes(request)) {
  //   return; // Ignore these routes, no authentication checks applied
  // }

  // // If the route is public, allow access without protection
  // if (isPublicRoute(request)) {
  //   return;
  // }

  // For all other routes, enforce protection
  auth().protect();
});

export const config = {
  matcher: [
    // Middleware will apply to all routes except for static assets and internals
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};



// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

// export default clerkMiddleware({
//   publicRoutes: [
//     '/',
//     '/events/:id',
//     '/api/webhook/clerk',
//     '/api/webhook/stripe',
//     '/api/uploadthing'
//   ],
//   ignoreRoutes: [
//     '/api/webhook/clerk',
//     '/api/webhook/stripe',
//     '/api/uploadthing'
//   ]
// });

// // export default clerkMiddleware((auth, request) => {
// //   if (!isPublicRoute(request)) {
// //     auth().protect()
// //   }
// // })

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };
