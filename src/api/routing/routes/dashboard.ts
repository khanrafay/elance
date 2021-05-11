import { url } from '../url';

const scopeUrl = (path: string) => url('/' + path);

export const LOGIN = scopeUrl('auth/login');
export const REGISTER = scopeUrl('auth/register');
export const DASHBOARD = scopeUrl('dashboard');
export const CATEGORIES_LIST = scopeUrl('categories');
export const SERVICES_LIST = scopeUrl('services/list');
export const GET_SERVICE = scopeUrl('services/:id');
export const FEATURED_SERVICES_LIST = scopeUrl('services/featured-list');

export const MEDIA_URL = scopeUrl('media/:id');