const faker = require('faker/locale/fr');

module.exports = () => ({
    requesterName: faker.company.companyName(),
    requesterType: faker.random.arrayElement([
        'finess',
        'rpps',
        'adeli'
        // 'other'
    ]),
    requesterProfessionalIdentifier: faker.helpers.replaceSymbolWithNumber(
        '########'
    ),
    requesterOtherType: null,
    contactName: faker.name.findName(),
    contactEmail: faker.internet.email(),
    contactPhone: faker.phone.phoneNumber(),
    deliveryAddress: faker.address.streetAddress(),
    deliveryPostalCode: faker.address.zipCode(),
    deliveryCity: faker.address.city(),
    maskSmallSizeQuantity: faker.random.number({ min: 5, max: 75 }),
    maskLargeSizeQuantity: faker.random.number({ min: 5, max: 75 }),
    forecastQuantity: faker.random.number(150),
    forecastDays: faker.random.number(15),
    requesterComment: faker.lorem.sentence()
});
