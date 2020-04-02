describe('Index page', function () {
    beforeEach(function () {
        cy.visit('/');
    });

    it('it contains "Usine Partagée" in the title', function () {
        cy.title().should('contain', 'Usine Partagée');
    });

    it('it contains each block titles', function () {
        const blockTitles = [
            'ORGANISATION',
            'CONTACT OPERATIONNEL',
            'ADRESSE DE LIVRAISON',
            'PREVISIONNEL',
            'COMMENTAIRE'
        ];

        return cy.get('h4').then((titles) => {
            blockTitles.forEach((blockTitle) => {
                expect(titles).contain(blockTitle);
            });
        });
    });

    it('it contains an organisation block with inputs', function () {
        cy.get('input[name=requester_name]').should('exist');
        cy.get('input[name=requester_type]').should('exist');
        cy.get('input[name=requester_professional_identifier]').should('exist');

        cy.get('input[name=requester_other_type]').should('not.visible');
        cy.get('input[name=requester_type]').check('other');
        cy.get('input[name=requester_other_type]').should('be.visible');
    });

    it('it contains an operation contact block with inputs', function () {
        cy.get('input[name=contact_name]').should('exist');
        cy.get('input[name=contact_email]').should('exist');
        cy.get('input[name=contact_phone]').should('exist');
    });

    it('it contains a delivery address block with inputs', function () {
        cy.get('input[name=delivery_address]').should('exist');
        cy.get('input[name=delivery_postal_code]').should('exist');
        cy.get('input[name=delivery_city]').should('exist');
    });

    it('it contains a prevision block with inputs', function () {
        cy.get('input[name=forecast_quantity]').should('exist');
        cy.get('input[name=forecast_days]').should('exist');
    });

    it('it contains a comment block with textarea', function () {
        cy.get('textarea[name=requester_comment]').should('exist');
    });
});
