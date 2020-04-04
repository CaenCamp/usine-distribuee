// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('fillRequestForm', (payload) => {
    cy.get('form').within(() => {
        cy.get('input[name=requester_name]').type(payload.requesterName);
        cy.get('input[name=requester_type]').check(payload.requesterType);
        cy.get('input[name=requester_professional_identifier]').type(
            payload.requesterProfessionalIdentifier
        );

        if (payload.requesterType === 'other') {
            cy.get('input[name=requester_other_type]').type(
                payload.requesterOtherType
            );
        }

        cy.get('input[name=contact_name]').type(payload.contactName);
        cy.get('input[name=contact_email]').type(payload.contactEmail);
        cy.get('input[name=contact_phone]').type(payload.contactPhone);

        cy.get('input[name=delivery_address]').type(payload.deliveryAddress);
        cy.get('input[name=delivery_postal_code]').type(
            payload.deliveryPostalCode
        );
        cy.get('input[name=delivery_city]').type(payload.deliveryCity);

        cy.get('input[name=mask_small_size_quantity]')
            .clear()
            .type(payload.maskSmallSizeQuantity);
        cy.get('input[name=mask_large_size_quantity]')
            .clear()
            .type(payload.maskLargeSizeQuantity);

        cy.get('input[name=forecast_quantity]')
            .clear()
            .type(payload.forecastQuantity);
        cy.get('input[name=forecast_days]').clear().type(payload.forecastDays);

        cy.get('textarea[name=requester_comment]').type(
            payload.requesterComment
        );

        cy.root();
    });
});
