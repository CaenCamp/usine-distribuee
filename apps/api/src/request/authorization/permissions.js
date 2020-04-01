const { hasDeliveryStarted, isFullyDelivered } = require("../delivery");

const ownProductionManagement = (user, from) => {
    return (
        user.role === "admin" ||
        user.productionManagementIds.includes(from.productionManagementId)
    );
};

const and = (...conditions) => (...args) =>
    conditions.every(condition => condition(...args));

const production_manager = {
    MANAGEMENT_TODO: {
        MANAGEMENT_TODO: ownProductionManagement,
        MANAGEMENT_BUILDING: ownProductionManagement,
        MANAGEMENT_DELIVERED: ownProductionManagement
    },
    MANAGEMENT_BUILDING: {
        MANAGEMENT_TODO: and(
            ownProductionManagement,
            (user, from) => !hasDeliveryStarted(from)
        ),
        MANAGEMENT_BUILDING: ownProductionManagement,
        MANAGEMENT_DELIVERED: ownProductionManagement
    },
    MANAGEMENT_DELIVERED: {
        MANAGEMENT_TODO: and(
            ownProductionManagement,
            (user, from) => !hasDeliveryStarted(from)
        ),
        MANAGEMENT_BUILDING: and(
            ownProductionManagement,
            (user, from) => !isFullyDelivered(from)
        ),
        MANAGEMENT_DELIVERED: ownProductionManagement
    }
};

const dispatcher = {
    DISPATCH_TODO: {
        DISPATCH_TODO: true,
        DISPATCH_REJECTED: true,
        DISPATCH_PENDING: true,
        MANAGEMENT_TODO: true
    },
    DISPATCH_REJECTED: {
        DISPATCH_REJECTED: true,
        DISPATCH_TODO: true
    },
    DISPATCH_PENDING: {
        DISPATCH_PENDING: true,
        DISPATCH_TODO: true,
        DISPATCH_REJECTED: true,
        MANAGEMENT_TODO: true
    },
    ...production_manager
};

module.exports = {
    dispatcher,
    production_manager,
    admin: {
        DISPATCH_TODO: {
            DISPATCH_TODO: true,
            DISPATCH_REJECTED: true,
            DISPATCH_PENDING: true,
            MANAGEMENT_TODO: true,
            MANAGEMENT_BUILDING: true,
            MANAGEMENT_DELIVERED: true
        },
        DISPATCH_REJECTED: {
            DISPATCH_TODO: true,
            DISPATCH_REJECTED: true,
            DISPATCH_PENDING: true,
            MANAGEMENT_TODO: true,
            MANAGEMENT_BUILDING: true,
            MANAGEMENT_DELIVERED: true
        },
        DISPATCH_PENDING: {
            DISPATCH_TODO: true,
            DISPATCH_REJECTED: true,
            DISPATCH_PENDING: true,
            MANAGEMENT_TODO: true,
            MANAGEMENT_BUILDING: true,
            MANAGEMENT_DELIVERED: true
        },
        MANAGEMENT_TODO: {
            DISPATCH_TODO: true,
            DISPATCH_REJECTED: true,
            DISPATCH_PENDING: true,
            MANAGEMENT_TODO: true,
            MANAGEMENT_BUILDING: true,
            MANAGEMENT_DELIVERED: true
        },
        MANAGEMENT_BUILDING: {
            DISPATCH_TODO: true,
            DISPATCH_REJECTED: true,
            DISPATCH_PENDING: true,
            MANAGEMENT_TODO: true,
            MANAGEMENT_BUILDING: true,
            MANAGEMENT_DELIVERED: true
        },
        MANAGEMENT_DELIVERED: {
            DISPATCH_TODO: true,
            DISPATCH_REJECTED: true,
            DISPATCH_PENDING: true,
            MANAGEMENT_TODO: true,
            MANAGEMENT_BUILDING: true,
            MANAGEMENT_DELIVERED: true
        }
    }
};
