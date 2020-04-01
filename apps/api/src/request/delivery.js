const products = ['maskSmallSize', 'maskLargeSize'];

const sumDelivered = (request, product) =>
    (request.deliveryTracking || []).reduce(
        (total, delivery) => total + delivery[`${product}Delivered`],
        0
    );

const isProductFullyDelivered = (request, product) =>
    request[`${product}Quantity`] === sumDelivered(request, product);

const isFullyDelivered = () => products.every(isProductFullyDelivered);

const hasDeliveryStarted = (request) =>
    request.deliveryTracking && !!request.deliveryTracking.length;

const extractQuantitiesFromDeliveries = (deliveries) => {
    return (deliveries || []).reduce(
        (total, delivery) => {
            return {
                small: total.small + delivery.maskSmallSizeDelivered,
                large: total.large + delivery.maskLargeSizeDelivered
            };
        },
        { small: 0, large: 0 }
    );
};

module.exports = {
    extractQuantitiesFromDeliveries,
    isFullyDelivered,
    hasDeliveryStarted
};
