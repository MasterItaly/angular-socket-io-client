import { HostListener, Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { GatewayEventEnum } from '../enums/gateway-event.enum';

@Injectable({
  providedIn: 'root',
})
export class SocketService implements OnDestroy {
  private socket: Socket;

  constructor() {
    this.socket = io();
    this.socket.on('connect', (): void => {
      console.log('🟢 Successfully connected to the server!');
    });

    this.socket.on('disconnect', (reason: any): void => {
      console.log('🔴 Disconnected:', reason);
    });

    this.socket.on('reconnect', (attempt: any): void => {
      console.log(`🟢 Reconnected on attempt ${attempt}`);
    });

    this.socket.on('reconnect_attempt', (attempt: any): void => {
      console.log(`⚪️ Attempting to reconnect... (Attempt ${attempt})`);
    });

    this.socket.on('reconnect_error', (error: any): void => {
      console.error('🔴 Reconnect error:', error);
    });

    this.socket.on('message', (msg: any): void => {
      console.log('⚪️ Received message:', msg);
    });

    this.socket.on('connect_error', (error: any): void => {
      console.error('🔴 Error connecting to the server:', error);
    });

    this.socket.on('ping', (): void => {
      console.log('⚪️ Ping sent to server');
    });

    this.socket.on('pong', (latency: any): void => {
      console.log(`⚪️ Pong received. Latency: ${latency} ms`);
    });

    this.socket.on('error', (error: any): void => {
      console.error('🔴 Socket.IO Error:', error);
    });

    this.socket.on('upgrade', (): void => {
      console.log('🔵 Connection upgraded to WebSocket');
    });

    this.socket.on('packet', (packet: any): void => {
      console.log('⚪️ Received packet:', packet);
    });
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

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    this.socket?.disconnect();
    console.log('⚪️ Socket connection closed');
  }
}
