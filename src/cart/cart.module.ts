import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';
import { DbClientService } from '../shared/services';


@Module({
  imports: [ OrderModule ],
  providers: [ CartService, DbClientService ],
  controllers: [ CartController ]
})
export class CartModule {}
