import { Module } from '@nestjs/common';

import { OrderService } from './services';
import { DbClientService } from '../shared/services';

@Module({
  providers: [ OrderService, DbClientService ],
  exports: [ OrderService ]
})
export class OrderModule {}
