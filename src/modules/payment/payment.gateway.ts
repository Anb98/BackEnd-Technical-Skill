import { AuthService } from '@modules/auth/auth.service'
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { CreateJobPaymentInput } from './input/create-job-payment.input'

@WebSocketGateway({ namespace: 'payment' })
export class PaymentGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private clients: Set<Socket> = new Set()
  @WebSocketServer() io: Server

  constructor(private readonly authService: AuthService) {}

  afterInit() {}

  handleConnection(client: Socket) {
    this.clients.add(client)
  }

  handleDisconnect(client: Socket) {
    this.clients.delete(client)
  }

  updatePaymentStatus(order: CreateJobPaymentInput) {
    this.clients.forEach(async (client) => {
      const payload = await this.authService.validateToken(client.handshake.headers.authorization)
      if (payload.sub !== order.createdBy) return

      client.emit('status', order)
    })
  }
}
