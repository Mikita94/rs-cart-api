import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { Cart } from '../models';
import { DbClientService } from '../../shared/services';

@Injectable()
export class CartService {
  constructor(
    private dbClientService: DbClientService
  ) {
  }

  async findByUserId(userId: string): Promise<Cart> {
    const client = await this.dbClientService.getClient();
    const query = await client.query(`
      SELECT carts.id, user_id, product_id, count, title, description, price FROM carts
      LEFT JOIN cart_items ON carts.id = cart_items.cart_id
      LEFT JOIN products ON products.id = cart_items.product_id
      WHERE user_id = '${userId}'
    `);
    await client.end();
    const { id } = query.rows[0] || {};
    if (id) {
      const items = query.rows
        .filter((row) => row.count)
        .map((row) => {
          const { count, product_id, title, description, price } = row;
          return {
            product: { id: product_id, title, description, price },
            count,
          };
        });
      return { id, items };
    }
    return null;
  }

  async createByUserId(userId: string): Promise<Cart> {
    const id = v4(v4());
    const userCart = {
      id,
      items: [],
    };

    const client = await this.dbClientService.getClient();
    await client.query(`
      INSERT INTO carts (id, user_id, created_at, updated_at)
      VALUES ('${id}', '${userId}', now(), now())
    `);
    await client.end();

    return userCart;
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items: newItems }: Cart): Promise<Cart> {
    const { id, items } = await this.findOrCreateByUserId(userId);

    const client = await this.dbClientService.getClient();
    await Promise.all(newItems.map(async (newItem) => {
      const isAlreadyAdded = !!items.find(item => item.product.id === newItem.product.id);
      const { product, count } = newItem;
      if (isAlreadyAdded) {
        await client.query(`
          UPDATE cart_items
          SET count = ${count}
          WHERE cart_id = '${id}' AND product_id = '${newItem.product.id}'
        `);
        return;
      }
      await client.query(`
        INSERT INTO cart_items (cart_id, product_id, count)
        VALUES ('${id}', '${product.id}', ${count})
      `);
    }));
    await client.end();

    return this.findOrCreateByUserId(userId);
  }

  async removeByUserId(userId: string): Promise<void> {
    const client = await this.dbClientService.getClient();
    await client.query(`
      DELETE FROM carts
      WHERE user_id = '${userId}'
    `);
    await client.end();
  }
}
