import { url } from '../url';

const scopeUrl = (path: string) => url('/' + path);

export const LOGIN = scopeUrl('auth/login');
export const LOGOUT = scopeUrl('auth/logout');
export const AUTH_INFO = scopeUrl('auth/info');
export const REGISTER = scopeUrl('auth/register');

export const PROFILE_UPDATE = scopeUrl('profile/update');

export const BackendApp = scopeUrl('dashboard');

export const CATEGORIES_LIST = scopeUrl('categories');
export const SERVICES_LIST = scopeUrl('services/list');
export const GET_SERVICE = scopeUrl('services/:id');
export const FEATURED_SERVICES_LIST = scopeUrl('services/featured-list');
export const CREATE_SERVICE = scopeUrl('seller/services/create');
export const DELETE_SERVICE = scopeUrl('seller/services/:id');
export const UPDATE_SERVICE = scopeUrl('seller/services/:id/edit');

export const MEDIA_UPLOAD = scopeUrl('media/upload');
export const MEDIA_UPLOAD_MULTIPLE = scopeUrl('media/upload/multiple');
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
export const UPDATE_ORDER_REQUEST = scopeUrl('orders/:id/request/update');
export const CANCEL_ORDER_REQUEST = scopeUrl('orders/:id/request/cancel');
export const DELIVER_ORDER_REQUEST = scopeUrl('orders/:id/request/deliver');
export const CANCEL_ORDER_HISTORY = scopeUrl('orders/:id/history/cancel');
export const APPROVE_ORDER_HISTORY = scopeUrl('orders/:id/history/approve');

export const ORDER_PAYMENT_PAYPAL = scopeUrl('buyer/orders/:id/payment/paypal');
export const CONFIRM_PAYPAL_PAYMENT = scopeUrl('buyer/orders/:id/paypal/:token/confirm');

export const MY_SERVICES = scopeUrl('seller/services/list');
