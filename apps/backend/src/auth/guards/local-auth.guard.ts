import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { IAppContext } from 'src/common/types/context.type';
import { Identity } from '../types/auth.type';

@Injectable()
export class LocalAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext): IAppContext['req'] {
    const ctx = GqlExecutionContext.create(context);
    const gqlReq = ctx.getContext<IAppContext>().req;
    return gqlReq;
  }

  handleRequest<T = Identity>(err: any, user: any): T {
    if (err || !user) {
      throw err || new UnauthorizedException('Unauthorized: Invalid or missing Token');
    }
    return user as T;
  }
}
