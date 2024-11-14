import { Component } from '@angular/core';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  message: string = '';
  receivedMessage: string = '';

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.getMessages().subscribe((msg): void => {
      this.receivedMessage = msg.response;
    });
  }

  sendMessage(): void {
    this.socketService.sendMessage(this.message);
    this.message = '';
  }
}
