import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { IAppContext } from 'src/common/types/context.type';
import { Identity } from '../types/auth.type';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context);
    const gqlReq = ctx.getContext<IAppContext>().req;
    return gqlReq;
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | import('rxjs').Observable<boolean> {
    return super.canActivate(context) as any;
  }

  handleRequest<T = Identity>(err: any, user: any): T {
    if (err || !user) {
      throw err || new UnauthorizedException('Unauthorized: Invalid or missing Token');
    }
    return user as T;
  }
}
