import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const publicRoutes = [
    '/',
    '/events/:id',
    '/api/webhook/clerk',
    '/api/webhook/stripe',
    '/api/uploadthing',
];

const ignoredRoutes = [
    '/api/webhook/clerk',
    '/api/webhook/stripe',
    '/api/uploadthing',
];

const routerMatcher = createRouteMatcher({
    publicRoutes,
    ignoredRoutes,
});

export default clerkMiddleware({
    matcher: routerMatcher,
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
