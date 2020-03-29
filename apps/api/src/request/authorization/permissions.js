module.exports = {
    dispatcher: {
        DISPATCH_TODO: {
            DISPATCH_REJECTED: true,
            DISPATCH_PENDING: true,
            MANAGEMENT_TODO: (from, to) => !!to.production_management_id
        },
        DISPATCH_REJECTED: {
            DISPATCH_TODO: true
        },
        DISPATCH_PENDING: {
            DISPATCH_TODO: true,
            MANAGEMENT_TODO: (from, to) => !!to.production_management_id
        },
    },
    manager: {
        MANAGEMENT_TODO: {
            MANAGEMENT_BUILDING: true
        },
        MANAGEMENT_BUILDING: {
            MANAGEMENT_BUILT: true
        },
        MANAGEMENT_BUILT: {
            MANAGEMENT_DELIVERED: true
        },
    },
    admin: {
        DISPATCH_TODO: {
            DISPATCH_TODO: true,
            DISPATCH_REJECTED: true,
            DISPATCH_PENDING: true,
            MANAGEMENT_TODO: true,
            MANAGEMENT_BUILDING: true,
            MANAGEMENT_BUILT: true,
            MANAGEMENT_DELIVERED: true
        },
        DISPATCH_REJECTED: {
            DISPATCH_TODO: true,
            DISPATCH_REJECTED: true,
            DISPATCH_PENDING: true,
            MANAGEMENT_TODO: true,
            MANAGEMENT_BUILDING: true,
            MANAGEMENT_BUILT: true,
            MANAGEMENT_DELIVERED: true
        },
        DISPATCH_PENDING: {
            DISPATCH_TODO: true,
            DISPATCH_REJECTED: true,
            DISPATCH_PENDING: true,
            MANAGEMENT_TODO: true,
            MANAGEMENT_BUILDING: true,
            MANAGEMENT_BUILT: true,
            MANAGEMENT_DELIVERED: true
        },
        MANAGEMENT_TODO: {
            DISPATCH_TODO: true,
            DISPATCH_REJECTED: true,
            DISPATCH_PENDING: true,
            MANAGEMENT_TODO: true,
            MANAGEMENT_BUILDING: true,
            MANAGEMENT_BUILT: true,
            MANAGEMENT_DELIVERED: true
        },
        MANAGEMENT_BUILDING: {
            DISPATCH_TODO: true,
            DISPATCH_REJECTED: true,
            DISPATCH_PENDING: true,
            MANAGEMENT_TODO: true,
            MANAGEMENT_BUILDING: true,
            MANAGEMENT_BUILT: true,
            MANAGEMENT_DELIVERED: true
        },
        MANAGEMENT_BUILT: {
            DISPATCH_TODO: true,
            DISPATCH_REJECTED: true,
            DISPATCH_PENDING: true,
            MANAGEMENT_TODO: true,
            MANAGEMENT_BUILDING: true,
            MANAGEMENT_BUILT: true,
            MANAGEMENT_DELIVERED: true
        },
        MANAGEMENT_DELIVERED: {
            DISPATCH_TODO: true,
            DISPATCH_REJECTED: true,
            DISPATCH_PENDING: true,
            MANAGEMENT_TODO: true,
            MANAGEMENT_BUILDING: true,
            MANAGEMENT_BUILT: true,
            MANAGEMENT_DELIVERED: true
        }
    },
};
