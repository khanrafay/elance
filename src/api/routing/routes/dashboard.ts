import { url } from '../url';

const scopeUrl = (path: string) => url('/' + path);

export const DASHBOARD = scopeUrl('dashboard');
export const CATEGORIES_LIST = scopeUrl('categories');
export const SERVICES_LIST = scopeUrl('services/list');