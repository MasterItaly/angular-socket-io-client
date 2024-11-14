import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { GatewayEventEnum } from '../enums/gateway-event.enum';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  private serverUrl: string = 'http://localhost:3000';

  constructor() {
    this.socket = io(this.serverUrl);
  }

  sendMessage(message: string): void {
    this.socket.emit(GatewayEventEnum.MESSAGE, message);
  }

  getMessages(): Observable<{ response: string; data: string }> {
    return new Observable((observer): void => {
      this.socket.on(GatewayEventEnum.MESSAGE, (data: any): void => {
        observer.next(data);
      });
    });
  }
}
