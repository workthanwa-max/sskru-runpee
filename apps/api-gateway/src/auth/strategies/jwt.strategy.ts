import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { getOsEnv } from 'src/common/utils/env.util';
import { Identity } from '../types/auth.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: getOsEnv('JWT_SECRET'),
    });
  }

  validate(payload: any): Identity {
    return {
      id: payload.id || payload.sub,
      roles: payload.roles || [],
      systemUrls: payload.systemUrls || [],
    };
  }
}
