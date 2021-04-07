import { acceptHeader, contentTypeHeader } from '../../lib/http/header/header';
import { APPLICATION_JSON } from '../../lib/http/mime/mime';

export const jsonContentTypeHeader = () => contentTypeHeader(APPLICATION_JSON);

export const jsonAcceptHeader = () => acceptHeader(APPLICATION_JSON);