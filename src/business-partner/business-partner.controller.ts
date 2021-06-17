import { Controller, Get, HttpCode, HttpException, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { BusinessPartnerService } from './business-partner.service';
import { BusinessPartner, BusinessPartnerAddress, BusinessPartnerRequestBuilder } from '@sap/cloud-sdk-vdm-business-partner-service'

@Controller('business-partners')
export class BusinessPartnerController {
    constructor(private readonly businessPartnerService: BusinessPartnerService) {}

    @Get()
    getAllBusinessPartners(): Promise<BusinessPartner[]> {
        return this.businessPartnerService.getAllBusinessPartners();
    }

    @Get('/:businessPartnerId')
    getBusinessPartnerByID(@Param('businessPartnerId') businessPartnerId): Promise<BusinessPartner> {
        return this.businessPartnerService.getBusinessPartnerById(businessPartnerId)
    }

    @Post('/:businessPartnerId/address')
    @HttpCode(201)
    createBusinessPartnerAddress(@Body() requestBody, @Param('businessPartnerId') businessParnterId): Promise<BusinessPartnerAddress> {
        const address = this.businessPartnerService.buildAddress(requestBody, businessParnterId, null);
        return this.businessPartnerService.createAddress(address);
    }

    @Put('/:businessPartnerId/address/:addressId')
    updateBusinessPartnerAddress(
        @Body() requestBody, 
        @Param('businessPartnerId') businessPartnerId, 
        @Param('addressId') addressId): Promise<BusinessPartnerAddress> {
        const address = this.businessPartnerService.buildAddress(requestBody, businessPartnerId, addressId);
        return this.businessPartnerService.updateBusinessPartnerAddress(address);
    }

    @Delete('/:businessPartnerId/address/:addressId')
    @HttpCode(204)
    deleteBusinessPartnerAddress(@Param('businessPartnerId') businessPartnerId, @Param('addressId') addressId): Promise<void> {
      return this.businessPartnerService.deleteBusinessPartnerAddress(businessPartnerId, addressId);
    }
}

