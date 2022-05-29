import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './modules/account/account.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [AccountModule, UserModule, TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
