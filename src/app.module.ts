import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { FooGateway } from './foo.gateway';

@Module({
  imports: [],
  providers: [AppGateway, FooGateway],
})
export class AppModule {}
