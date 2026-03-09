import { withAuth } from 'next-auth/middleware';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // The middleware function is called for all routes except those excluded
    console.log('Middleware executed for:', req.nextUrl.pathname);
  },
  {
    callbacks: {
      authorized: ({ token, req: authReq }) => {
        console.log(
          'Authorization check for:',
          authReq?.nextUrl?.pathname,
          'Token:',
          !!token
        );
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - login page (to allow access to login)
     * - register page (to allow access to register)
     * - privacy page (to allow access to privacy policy)
     * - terms page (to allow access to terms of service)
     * - cookies page (to allow access to cookies policy)
     * - license page (to allow access to license)
     * - help page (to allow access to help)
     * - docs page (to allow access to documentation)
     * - status page (to allow access to status)
     * - community page (to allow access to community)
     * - contact page (to allow access to contact)
     * - about page (to allow access to about)
     * - products page (to allow access to products)
     * - details page (to allow access to product details)
     * - dashboard pages (to allow access to dashboard)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public|login|register|privacy|terms|cookies|license|help|docs|status|community|contact|about|products|details|dashboard).*)',
  ],
};
