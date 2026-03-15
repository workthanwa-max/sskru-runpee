import { Request } from 'express';
import { Identity } from 'src/auth/types/auth.type';
export type IAppContext = {
  req: Request & { user: Identity };
};
