import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusinessPartnerModule } from './business-partner/business-partner.module';

@Module({
  imports: [ConfigModule.forRoot(), BusinessPartnerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
