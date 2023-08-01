import { IoAdapter } from '@nestjs/platform-socket.io';
import { AuthenticatedSocket } from '../utils/interfaces';
import { User } from '../utils/typeorm';
import * as cookieParser from 'cookie-parser';
import * as cookie from 'cookie';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class WebsocketAdapter extends IoAdapter {
  createIOServer(port: number, options?: any) {
    const server = super.createIOServer(port || 90, options);
    server.use(async (socket: AuthenticatedSocket, next) => {
      console.log('Inside Websocket Adapter');
      const p = socket.handshake.headers?.cu;
      const { cookie: clientCookie } = socket.handshake.headers;
      if (!clientCookie) {
        console.log('Client has no cookies');
        return next(new Error('Not Authenticated. No cookies were sent'));
      }
      const { CHAT_APP_SESSION_ID } = cookie.parse(clientCookie);
      if (!CHAT_APP_SESSION_ID) {
        console.log('CHAT_APP_SESSION_ID DOES NOT EXIST');
        return next(new Error('Not Authenticated'));
      }
      const signedCookie = cookieParser.signedCookie(
        CHAT_APP_SESSION_ID,
        process.env.COOKIE_SECRET,
      );
      if (!signedCookie) return next(new Error('Error signing cookie'));
      try {
        socket.user = plainToInstance(User, JSON.parse(p as string));
      } catch (e) {
        console.log(e);
      }
      next();
    });
    return server;
  }
}
