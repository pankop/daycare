import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Mengambil token dari header Authorization
      ignoreExpiration: false, // Token akan tidak valid jika sudah expired
      secretOrKey: configService.get<string>('JWT_SECRET'), // Kunci rahasia untuk memverifikasi token
    });
  }

  // Metode ini dipanggil ketika token berhasil diverifikasi
  async validate(payload: any) {
    // Payload yang dikirim berisi data user (sub dan username) serta entityType
    return {
      userId: payload.sub,
      username: payload.username,
      entityType: payload.entityType,
    };
  }
}
