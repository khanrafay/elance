import { url } from '../url';

const scopeUrl = (path: string) => url('/' + path);
const adminScopedUrl = (path: string) => url('/admin/' + path);

export const LOGIN = scopeUrl('auth/login');
export const LOGOUT = scopeUrl('auth/logout');
export const AUTH_INFO = scopeUrl('auth/info');
export const REGISTER = scopeUrl('auth/register');

export const ADMIN_PROFILE_UPDATE = adminScopedUrl('profile/update');

export const BackendApp = scopeUrl('dashboard');

export const ADMIN_ORDERS_LIST = adminScopedUrl('orders/');

export const ADMIN_USERS_LIST = adminScopedUrl('users/');

export const CATEGORIES_LIST = adminScopedUrl('categories/list');
export const CREATE_CATEGORY = adminScopedUrl('categories/create');
export const DELETE_CATEGORY = adminScopedUrl('categories/:id');
export const GET_CATEGORY = adminScopedUrl('categories/:id');
export const EDIT_CATEGORY = adminScopedUrl('categories/:id/edit');
