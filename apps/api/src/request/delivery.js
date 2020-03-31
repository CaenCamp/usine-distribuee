const products = ["maskSmallSize", "maskLargeSize"];

const sumDelivered = (request, product) =>
    (request.deliveryTracking || []).reduce(
        (total, delivery) => total + delivery[`${product}Delivered`],
        0
    );

const isProductFullyDelivered = (request, product) =>
    request[`${product}Quantity`] === sumDelivered(request, product);

const isFullyDelivered = request => products.every(isProductFullyDelivered);

const hasDeliveryStarted = request =>
    request.deliveryTracking && !!request.deliveryTracking.length;

module.exports = {
    isFullyDelivered,
    hasDeliveryStarted
};
