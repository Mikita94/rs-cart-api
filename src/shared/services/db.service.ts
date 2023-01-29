import { Injectable } from '@nestjs/common';
import { Client, ClientConfig, Pool } from 'pg';

@Injectable()
export class DbClientService {
  private config: ClientConfig;

  constructor() {
    const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;
    this.config = {
      host: PG_HOST,
      port: +PG_PORT,
      database: PG_DATABASE,
      user: PG_USERNAME,
      password: PG_PASSWORD,
    };
  }

  async getClient(): Promise<Client> {
    const client = new Client(this.config);
    await client.connect();
    return client;
  }

  async getPool(): Promise<Pool> {
    const pool = new Pool(this.config);
    await pool.connect();
    return pool;
  }
}
