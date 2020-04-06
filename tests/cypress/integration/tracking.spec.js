const payloadFactory = require('../utils/payloadFactory');

describe('Tracking page', function () {
    before(function () {
        cy.authenticate();
    });

    it('it should show last request tracking view', function () {
        const payload = payloadFactory();
        cy.visit('/').fillRequestForm(payload).submit();

        const token = window.localStorage.getItem('token');

        cy.request({
            method: 'GET',
            url: '/api/requests',
            headers: {
                Authorization: token
            }
        })
            .its('body')
            .should('not.be.empty')
            .as('requests');

        cy.get('@requests').then((requests) => {
            const lastRequest = requests.pop();
            cy.visit(`/track/${lastRequest.id}`);

            const commandNumber = `${lastRequest.publicNumber}`.padStart(
                5,
                '0'
            );

            cy.title().should('contain', 'Usine Partagée');
            cy.get('.panel-body').should(
                'contain.text',
                `Suivi de la demande n°${commandNumber}`
            );
            cy.get('.status').within(() => {
                cy.get('li').should('have.length', 3);
                cy.get('li').not('.done').should('have.length', 2);
                cy.get('li.done').should('contain.text', 'Prise en compte');
            });
        });
    });
});
