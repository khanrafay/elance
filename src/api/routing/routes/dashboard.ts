import { url } from '../url';

const scopeUrl = (path: string) => url('/' + path);

export const LOGIN = scopeUrl('auth/login');
export const LOGOUT = scopeUrl('auth/logout');
export const AUTH_INFO = scopeUrl('auth/info');
export const REGISTER = scopeUrl('auth/register');
export const DASHBOARD = scopeUrl('dashboard');
export const CATEGORIES_LIST = scopeUrl('categories');
export const SERVICES_LIST = scopeUrl('services/list');
export const GET_SERVICE = scopeUrl('services/:id');
export const FEATURED_SERVICES_LIST = scopeUrl('services/featured-list');

export const MEDIA_URL = scopeUrl('media/:id');
export const MEDIA_DOWNLOAD_URL = scopeUrl('media/:id/download');

export const THREADS_LIST = scopeUrl('threads/');
export const CREATE_THREAD = scopeUrl('threads/create');
export const THREAD_MESSAGES = scopeUrl('threads/:id/messages');
export const SEND_MESSAGE = scopeUrl('threads/:id/send');

export const CREATE_OFFER = scopeUrl('offer/create');
export const ACCEPT_OFFER = scopeUrl('offer/:id/accept');
export const REJECT_OFFER = scopeUrl('offer/:id/reject');

export const ORDERS_LIST = scopeUrl('orders/');
export const CREATE_ORDER = scopeUrl('orders/create');
export const GET_ORDER = scopeUrl('orders/:id');
export const UPDATE_ORDER = scopeUrl('orders/:id/update');
export const ORDER_PAYMENT_PAYPAL = scopeUrl('orders/:id/payment/paypal');