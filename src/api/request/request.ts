import { request as httpRequest } from '../../lib/http/request';
import { fetchConfig } from '../config/fetch.config';
import { composeHeaders } from '../../lib/http/header/compose';
import { jsonAcceptHeader, jsonContentTypeHeader } from './header';

/**
 * @see httpRequest
 */
export const request = async (input: RequestInfo, init: RequestInit = {}): Promise<Response> => {
  const defaultHeaders = fetchConfig.headers || {};
  const initHeaders = init.headers || {};

  init = {
    ...fetchConfig,
    ...init,
    headers: composeHeaders(defaultHeaders, initHeaders)
  };

  return httpRequest(input, init);
};

/**
 * @see httpRequest
 */
export const jsonRequest = async (input: RequestInfo, init: RequestInit = {}) => {
  const initHeaders = init.headers || {};

  const headers = composeHeaders(
    initHeaders, jsonContentTypeHeader(), jsonAcceptHeader()
  );

  init = {
    ...init,
    headers
  };

  return request(input, init);
};
