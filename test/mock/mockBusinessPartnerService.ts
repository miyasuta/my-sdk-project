import { 
    mockBusinessPartner, 
    mockBusinessPartners, 
    mockBPForGet, 
    mockBPForCreateAddress,
    mockAddressInput,
    mockAddressResult,
    mockAddressUpdate } from './business-partner.json'

module.exports = {
    getAllBusinessPartners: jest.fn().mockResolvedValue(mockBusinessPartners),
    getBusinessPartnerById: jest.fn().mockResolvedValue(mockBusinessPartner),
    createAddress: jest.fn().mockResolvedValue(mockAddressResult),
    updateBusinessPartnerAddress: jest.fn().mockResolvedValue(mockAddressUpdate),
    deleteBusinessPartnerAddress: jest.fn(()=> {
      return Promise.resolve(1)
    }),
    buildAddress: jest.fn().mockImplementation(address => address),
}