import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { Order } from '../models';
import { DbClientService } from '../../shared/services';

@Injectable()
export class OrderService {
  constructor(
    private dbClientService: DbClientService,
  ) {
  }

  async findById(orderId: string): Promise<Order> {
    const client = await this.dbClientService.getClient();
    const query = await client.query(`
      SELECT * FROM orders
      WHERE id = '${orderId}'
    `);
    await client.end();
    const { id, user_id, cart_id, payment, delivery, comments, total, items, status } = query.rows[0];
    return { id, userId: user_id, cartId: cart_id, payment, delivery, comments, total, items, status };
  }

  async create(data: any): Promise<Order> {
    const id = v4(v4());
    const { userId, cartId, payment, delivery, comments, total, items } = data;

    const client = await this.dbClientService.getClient();
    await client.query(`
      INSERT INTO orders (id, user_id, cart_id, payment, delivery, comments, status, total)
      VALUES ('${id}', '${userId}', '${cartId}', ${payment || null}, ${delivery || null}, '${comments || ''}', 'inProgress', ${total});
    `);
    await client.end();

    return { id, userId, cartId, payment, delivery, comments, total, items, status: 'inProgress' };
  }

  async update(orderId: string, data): Promise<Order> {
    const order = await this.findById(orderId);

    if (!order) {
      throw new Error('Order does not exist.');
    }

    const client = await this.dbClientService.getClient();
    const { userId, cartId, payment, delivery, comments, status, total } = data;
    await client.query(`
      UPDATE orders
      SET user_id = ${userId},
          cart_id = ${cartId},
          payment = ${payment},
          delivery = ${delivery},
          comments = ${comments},
          status = ${status},
          total = ${total}
      WHERE id = '${orderId}'
    `);
    await client.end();

    return this.findById(orderId);
  }
}
