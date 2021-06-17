import { Module } from '@nestjs/common';
import { BusinessPartnerController } from './business-partner.controller';
import { BusinessPartnerService } from './business-partner.service';

@Module({
    controllers: [BusinessPartnerController],
    providers: [BusinessPartnerService]
})
export class BusinessPartnerModule {}
