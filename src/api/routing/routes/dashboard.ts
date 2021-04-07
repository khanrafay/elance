import { url } from '../url';

const scopeUrl = (path: string) => url('/' + path);

export const DASHBOARD = scopeUrl('dashboard');