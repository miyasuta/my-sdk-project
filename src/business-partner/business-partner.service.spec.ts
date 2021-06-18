import { Test, TestingModule } from '@nestjs/testing';
import { BusinessPartnerService } from './business-partner.service';
import { mockTestDestination } from '@sap-cloud-sdk/test-util';
import { 
  mockBPForGet,
  mockBPForCreateAddress,
  mockBusinessPartner,
  mockBusinessPartners,
  mockAddressInput,
  mockAddressUpdate } from '../../test/mock/business-partner.json';

describe('BusinessPartnerService', () => {
  let service: BusinessPartnerService;
  mockTestDestination('MockServer');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessPartnerService],
    }).compile();

    service = module.get<BusinessPartnerService>(BusinessPartnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('srvice: should get business partners', async () => {
    return expect(service.getAllBusinessPartners()).resolves.toEqual(mockBusinessPartners);
  })

  it('srvice: should get single business partner', async () => {
    const result = await service.getBusinessPartnerById(mockBPForGet);
    expect(JSON.stringify(result)).toEqual(JSON.stringify(mockBusinessPartner))
  })

  it('srvice: should create an address object with given id', async () => {
    const address = service.buildAddress(mockAddressInput, mockBPForCreateAddress, null)
    expect(address.businessPartner).toBe(mockBPForCreateAddress)
    expect(address.addressId).toBeUndefined()
  })

  it('srvice: should create an address object with given id and address', async () => {
    const address = service.buildAddress(mockAddressUpdate, mockAddressUpdate.businessPartner, mockAddressUpdate.addressId)
    expect(address.businessPartner).toBe(mockAddressUpdate.businessPartner)
    expect(address.addressId).toBe(mockAddressUpdate.addressId)
  })  

  it('srvice: should create address for given business partner', async () => {
    const address = service.buildAddress(mockAddressInput, mockBPForCreateAddress, null)
    const result = await service.createAddress(address)

    for (const item in mockAddressInput) {
      expect(result[item]).toBe(mockAddressInput[item])
    }
  })  

  it('srvice: should update address for given business partner', async () => {
    const address = service.buildAddress(mockAddressUpdate, mockAddressUpdate.businessPartner, mockAddressUpdate.addressId)
    const result = await service.updateBusinessPartnerAddress(address)

    for (const item in mockAddressUpdate) {
      expect(result[item]).toBe(mockAddressUpdate[item])
    }
  })
  
  it('srvice: should delete address for given business partner', async () => {
    //1. create new address
    const address = service.buildAddress(mockAddressInput, mockBPForCreateAddress, null)
    const result = await service.createAddress(address)

    //2. delete address just created
    await service.deleteBusinessPartnerAddress(result.businessPartner, result.addressId)

    // 3. verify that the address has been deleted
    const bp = await service.getBusinessPartnerById(result.businessPartner);
    const createdAddress = bp.toBusinessPartnerAddress.filter(address => address.addressId === result.addressId);
    expect(createdAddress).toHaveLength(0)
  })  
});
