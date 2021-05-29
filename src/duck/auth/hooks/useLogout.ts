import { useState } from 'react';
import { userLoggedOut } from '../auth.action';
import { useDispatch } from 'react-redux';
import {jsonRequest} from "../../../api/request/request";
import {LOGOUT} from "../../../api/routing/routes/dashboard";

export interface LogoutState {
  isLoading: boolean;
  error?: any;
}

export type LogoutAction = () => Promise<void>;

export const useLogout = (): [LogoutState, LogoutAction] => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const logout = async () => {
    setIsLoading(true);
    setError(undefined);

    try {
      await jsonRequest(LOGOUT);

    } catch (e) {
      setError(e);
      return;

    } finally {
      setIsLoading(false);
    }

    dispatch(userLoggedOut());
  };

  return [{ isLoading, error }, logout];
};