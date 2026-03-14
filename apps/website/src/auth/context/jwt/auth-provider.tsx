'use client';

import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { jwtDecode } from 'jwt-decode';

import { ActionMapType, AuthStateType, AuthUserType } from '@src/auth/types';
import axiosInstance, { endpoints } from '@src/utils/axios';
import { AuthContext } from './auth-context';

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
};

type Action = ActionMapType<Payload>[keyof ActionMapType<Payload>];

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: Action) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

const STORAGE_KEY = 'accessToken';

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(() => {
    try {
      const accessToken = window.localStorage.getItem(STORAGE_KEY);

      if (accessToken) {
        const decoded = jwtDecode(accessToken) as any;
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...decoded,
              id: decoded.id || decoded.sub,
            } as AuthUserType,
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(
    async (username: string, password: string) => {
      const response = await axiosInstance.post(endpoints.auth.login, { username, password });
      const { token } = response.data;
      if (token) {
        window.localStorage.setItem(STORAGE_KEY, token);
        const decoded = jwtDecode(token) as any;
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...decoded,
              id: decoded.id || decoded.sub,
            } as AuthUserType,
          },
        });
      }
    },
    [],
  );

  // LOGOUT
  const logout = useCallback(async () => {
    window.localStorage.removeItem(STORAGE_KEY);
    dispatch({
      type: Types.INITIAL,
      payload: {
        user: null,
      },
    });
  }, []);

  // Placeholder functions for compatibility
  const register = useCallback(() => {
    throw new Error('Register not implemented in local auth');
  }, []);
  const forgotPassword = useCallback(() => {
    throw new Error('Forgot password not implemented in local auth');
  }, []);
  const loginWithGoogle = useCallback(() => {
    throw new Error('Social login not implemented in local auth');
  }, []);
  const loginWithGithub = useCallback(() => {
    throw new Error('Social login not implemented in local auth');
  }, []);
  const loginWithTwitter = useCallback(() => {
    throw new Error('Social login not implemented in local auth');
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user !== null ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt' as const,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      logout,
      register,
      forgotPassword,
      loginWithGoogle,
      loginWithGithub,
      loginWithTwitter,
    }),
    [
      status,
      state.user,
      login,
      logout,
      register,
      forgotPassword,
      loginWithGithub,
      loginWithGoogle,
      loginWithTwitter,
    ],
  );

  return <AuthContext.Provider value={memoizedValue as any}>{children}</AuthContext.Provider>;
}
