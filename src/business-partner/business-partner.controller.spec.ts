import { Test, TestingModule } from '@nestjs/testing';
import { BusinessPartnerController } from './business-partner.controller';
import { BusinessPartnerService } from './business-partner.service';
import {
  mockBusinessPartner,
  mockBusinessPartners,
  mockBPForCreateAddress,
  mockAddressInput,
  mockAddressResult,
  mockAddressUpdate
} from '../../test/mock/business-partner.json';
import * as mockBusinessPartnerService from '../../test/mock/mockBusinessPartnerService';  

describe('BusinessPartnerController', () => {
  let controller: BusinessPartnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessPartnerController],
      providers: [BusinessPartnerService]
    })
      .overrideProvider(BusinessPartnerService)
      .useValue(mockBusinessPartnerService)
      .compile();

    controller = module.get<BusinessPartnerController>(BusinessPartnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('controller: should get business partners', async () => {
    const result = await controller.getAllBusinessPartners();
    expect(JSON.stringify(result)).toEqual(JSON.stringify(mockBusinessPartners))
    //expect(mockBusinessPartnerService.getAllBusinessPartners).toHaveBeenCalled();
  })

  it('controller: should get single business partner', async () => {
    const result = await controller.getBusinessPartnerByID('1003764');
    expect(JSON.stringify(result)).toEqual(JSON.stringify(mockBusinessPartner))
    //expect(mockBusinessPartnerService.getBusinessPartnerById).toHaveBeenCalled();
  })

  it('controller: should create new address', async () => {
    const result = await controller.createBusinessPartnerAddress(mockAddressInput, mockBPForCreateAddress);
    expect(JSON.stringify(result)).toEqual(JSON.stringify(mockAddressResult))
    //expect(mockBusinessPartnerService.createAddress).toHaveBeenCalled();
  })  

  it('controller: should update existing address', async () => {
    const result = await controller.updateBusinessPartnerAddress(mockAddressUpdate, mockAddressUpdate.businessPartner, mockAddressUpdate.addressId)
    expect(JSON.stringify(result)).toEqual(JSON.stringify(mockAddressUpdate))
    //expect(mockBusinessPartnerService.updateBusinessPartnerAddress).toHaveBeenCalled();
  })  

  it('controller: should delete given address', async () => {
    await expect(controller.deleteBusinessPartnerAddress(mockAddressUpdate.businessPartner, mockAddressUpdate.addressId)).resolves.toBe(1)
    //expect(mockBusinessPartnerService.deleteBusinessPartnerAddress).toHaveBeenCalled();
  })
  
});
