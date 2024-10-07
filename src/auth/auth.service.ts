import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    entityType: string,
    username: string,
    password: string,
  ): Promise<any> {
    let user;

    // Cek entityType untuk menentukan di tabel mana kita akan mencari user
    if (entityType === 'nanny') {
      user = await this.prisma.nanny.findUnique({
        where: { Username: username },
      });
    } else if (entityType === 'parent') {
      user = await this.prisma.parent.findUnique({
        where: { Username: username },
      });
    } else if (entityType === 'hospitality') {
      user = await this.prisma.hospitality.findUnique({
        where: { Username: username },
      });
    }

    if (user && (await bcrypt.compare(password, user.Password))) {
      const { Password, ...result } = user; // Hapus password sebelum return
      return result;
    }

    return null; // Jika tidak ditemukan atau password salah
  }

  async generatePayload(user: any, entityType: string) {
    const payload: any = {
      sub: user.id,
      username: user.Username,
      entityTypeuser: user.entityType,
    };

    if (entityType === 'nanny') {
      payload.FullName = `${user.N_FName} ${user.N_MName ? user.N_MName + ' ' : ''}${user.N_LName}`;
      payload.N_Address = user.N_Address;
    } else if (entityType === 'parent') {
      payload.FullName = `${user.P_FName} ${user.P_MName ? user.P_MName + ' ' : ''}${user.P_LName}`;
      payload.P_Address = user.P_Address;
    } else if (entityType === 'hospitality') {
      payload.FullName = `${user.H_FName} ${user.H_MName ? user.H_MName + ' ' : ''}${user.H_LName}`;
      payload.H_Address = user.H_Address;
    }

    return payload;
  }
  async login(user: any, entityType: string) {
    const payload = await this.generatePayload(user, entityType);
    const accessToken = this.jwtService.sign(payload);
    return {
      access_token: accessToken,
    };
  }

  async register(data: any, entityType: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(data.Password, 10);
    let createdUser;

    if (entityType === 'nanny') {
      createdUser = await this.prisma.nanny.create({
        data: { ...data, Password: hashedPassword },
      });
    } else if (entityType === 'parent') {
      createdUser = await this.prisma.parent.create({
        data: { ...data, Password: hashedPassword },
      });
    } else if (entityType === 'hospitality') {
      createdUser = await this.prisma.hospitality.create({
        data: { ...data, Password: hashedPassword },
      });
    }

    const { Password, ...result } = createdUser; // Hapus password sebelum return
    return result;
  }
}
