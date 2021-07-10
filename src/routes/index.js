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
export const CONFIRM_PAYPAL_PAYMENT = staticRoute('/dashboard/orders/:id/paypal/:token/confirm');

export const EARNINGS = staticRoute('/dashboard/earnings');
export const PAYMENTS = staticRoute('/dashboard/payments');

export const REPORT = staticRoute('/dashboard/report');

export const PROFILE = staticRoute('/dashboard/profile');

export const SERVICES = staticRoute('/dashboard/services');
export const CREATE_SERVICE = staticRoute('/dashboard/services/create');
export const SINGLE_SERVICE = staticRoute('/dashboard/services/:id');
