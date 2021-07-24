
const staticRoute = (route: string) => route;

/**
 * open routes
 */
export const HOMEPAGE = staticRoute('/');

/**
 * protected routes
 */
export const DASHBOARD = staticRoute('/dashboard');

export const ORDERS = staticRoute('/dashboard/orders');
export const SINGLE_ORDER = staticRoute('/dashboard/orders/:id');

export const USERS = staticRoute('/dashboard/users');
export const SINGLE_USER = staticRoute('/dashboard/users/:id');

export const FEATURED = staticRoute('/dashboard/featured');

export const REPORT = staticRoute('/dashboard/report');

export const PROFILE = staticRoute('/dashboard/profile');
