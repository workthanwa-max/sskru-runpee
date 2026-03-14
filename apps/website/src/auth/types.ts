// ----------------------------------------------------------------------

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthUserType = null | {
  id: string;
  roles: string[];
  systemUrls: string[];
  [key: string]: unknown;
};

export type AuthStateType = {
  status?: string;
  loading: boolean;
  user: AuthUserType;
};

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type AuthContextType = {
  user: AuthUserType;
  method: 'jwt';
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register?: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  forgotPassword?: (email: string) => Promise<void>;
};
