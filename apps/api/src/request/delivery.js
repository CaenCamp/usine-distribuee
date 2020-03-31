const products = ["maskSmallSize", "maskLargeSize"];

const sumDelivered = (request, product) =>
    (request.delivery_tracking || []).reduce(
        (total, delivery) => total + delivery[`${product}Delivered`],
        0
    );

const isProductFullyDelivered = (request, product) =>
    request[`${product}Quantity`] === sumDelivered(request, product);

const isFullyDelivered = request => products.every(isProductFullyDelivered);

const hasDeliveryStarted = request =>
    request.delivery_tracking && !!request.delivery_tracking.length;

module.exports = {
    isFullyDelivered,
    hasDeliveryStarted
};
