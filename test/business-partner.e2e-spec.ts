import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BusinessPartnerModule } from './../src/business-partner/business-partner.module';
import { BusinessPartnerService } from './../src/business-partner/business-partner.service';
import { 
  mockBusinessPartner, 
  mockBusinessPartners, 
  mockBPForGet, 
  mockBPForCreateAddress,
  mockAddressInput,
  mockAddressResult,
  mockAddressUpdate } from './mock/business-partner.json';
  import * as mockBusinessPartnerService from './mock/mockBusinessPartnerService';

describe('BusinessPartnerController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BusinessPartnerModule],
    }).overrideProvider(BusinessPartnerService).useValue(mockBusinessPartnerService).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/business-partners (GET)', () => {
    return request(app.getHttpServer())
      .get('/business-partners')
      .expect(200)
      .expect(mockBusinessPartners);
  });

  it('/business-partners/:businessPartnerId (GET)', () => {
    return request(app.getHttpServer())
      .get(`/business-partners/${mockBPForGet}`)
      .expect(200)
      .expect(mockBusinessPartner);
  });  

  it('/business-partners/:businessPartnerId/address (POST)', () => {
    return request(app.getHttpServer())
      .post(`/business-partners/${mockBPForCreateAddress}/address`)
      .send(mockAddressInput)
      .set('Content-Type', 'application/json')
      .expect(201)
      .expect(mockAddressResult)
  });  

  it('/business-partners/:businessPartnerId/address/:addressId (PUT)', () => {
    return request(app.getHttpServer())
      .put(`/business-partners/${mockAddressUpdate.businessPartner}/address/${mockAddressUpdate.addressId}`)
      .send(mockAddressUpdate)
      .set('Content-Type', 'application/json')
      .expect(200)
      .expect(mockAddressUpdate)
  });   

  it('/business-partners/:businessPartnerId/address/:addressId (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/business-partners/${mockAddressUpdate.businessPartner}/address/${mockAddressUpdate.addressId}`)
      //.expect(204)
      .expect(200)
  });    
});
