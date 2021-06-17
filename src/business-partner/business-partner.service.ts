import { Injectable } from '@nestjs/common';
import { BusinessPartner, BusinessPartnerAddress } from '@sap/cloud-sdk-vdm-business-partner-service'
import { and, or } from '@sap-cloud-sdk/core';

@Injectable()
export class BusinessPartnerService {
    public dummyText = 'Not yet implemented';

    getAllBusinessPartners(): Promise<BusinessPartner[]> {
        return BusinessPartner.requestBuilder()
            .getAll()
            .select(
                BusinessPartner.BUSINESS_PARTNER,
                BusinessPartner.FIRST_NAME,
                BusinessPartner.LAST_NAME
              )
              .filter(
                BusinessPartner.BUSINESS_PARTNER_CATEGORY.equals('1')
              )
            .top(10)
            // .withCustomHeaders({ APIKey: 'ARGqlo1dASAOB3al2GoOC934b3lJzv9V'})
            // .execute({
            //   url: 'https://sandbox.api.sap.com/s4hanacloud'
            // });
            .execute({
                destinationName: 'MockServer'
            })
    }

    getBusinessPartnerById(businessPartnerId: string): Promise<BusinessPartner> {
        return BusinessPartner.requestBuilder()
            .getByKey(businessPartnerId)
            .select(
                BusinessPartner.BUSINESS_PARTNER,
                BusinessPartner.LAST_NAME,
                BusinessPartner.FIRST_NAME,
                BusinessPartner.IS_MALE,
                BusinessPartner.IS_FEMALE,
                BusinessPartner.CREATION_DATE,
                BusinessPartner.TO_BUSINESS_PARTNER_ADDRESS.select(
                    BusinessPartnerAddress.BUSINESS_PARTNER,
                    BusinessPartnerAddress.ADDRESS_ID,
                    BusinessPartnerAddress.COUNTRY,
                    BusinessPartnerAddress.POSTAL_CODE,
                    BusinessPartnerAddress.CITY_NAME,
                    BusinessPartnerAddress.STREET_NAME,
                    BusinessPartnerAddress.HOUSE_NUMBER
                )
            )
            .execute({
                destinationName: 'MockServer'
            })
    }

    createAddress(address: BusinessPartnerAddress): Promise<BusinessPartnerAddress> {
        return BusinessPartnerAddress.requestBuilder()
        .create(address)
        .execute({
            destinationName: 'MockServer'
        })
    }

    buildAddress(requestBody: any, businessParnterId: string, addressId: string): BusinessPartnerAddress {
        const address = BusinessPartnerAddress.builder().fromJson(requestBody);
        address.businessPartner = businessParnterId;
        if (addressId) {
            address.addressId = addressId
        }
        return address;
    }

    updateBusinessPartnerAddress(address: BusinessPartnerAddress): Promise<BusinessPartnerAddress> {
        return BusinessPartnerAddress.requestBuilder()
            .update(address)
            .execute({
                destinationName: 'MockServer'
            })
    }

    deleteBusinessPartnerAddress(businessPartnerId: string, addressId: string): Promise<void> {
        return BusinessPartnerAddress.requestBuilder()
            .delete(businessPartnerId, addressId)
            .execute({
                destinationName: 'MockServer'
            });
    }
}
