/**
 * open routes
 */
const staticRoute = (route) => route;

export const HOMEPAGE = staticRoute('/');
export const LOGIN = staticRoute('/login');
export const SIGNUP = staticRoute('/sign-up');
export const SEARCH_ROUTE = staticRoute('/search');
export const SERVICE_ROUTE = staticRoute('/service/:id');

/**
 * protected routes
 */
export const DASHBOARD = staticRoute('/dashboard');
export const INBOX = staticRoute('/dashboard/messages');
export const SINGLE_MESSAGE = staticRoute('/dashboard/messages/:id');

export const ORDERS = staticRoute('/dashboard/orders');
export const SINGLE_ORDER = staticRoute('/dashboard/orders/:id');
export const ORDER_PAYMENT = staticRoute('/dashboard/orders/:id/payment');

export const EARNINGS = staticRoute('/dashboard/earnings');

export const REPORT = staticRoute('/dashboard/report');