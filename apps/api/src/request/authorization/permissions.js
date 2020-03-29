const ownProductionManagement = (user, from, to) =>
    user.production_management_ids.includes(to.id);

const isAffectedToManagement = (user, from, to) =>
    !!to.production_management_id;

const manager = {
    MANAGEMENT_TODO: {
        MANAGEMENT_TODO: ownProductionManagement,
        MANAGEMENT_BUILDING: ownProductionManagement
    },
    MANAGEMENT_BUILDING: {
        MANAGEMENT_BUILDING: ownProductionManagement,
        MANAGEMENT_BUILT: ownProductionManagement
    },
    MANAGEMENT_BUILT: {
        MANAGEMENT_BUILT: ownProductionManagement,
        MANAGEMENT_DELIVERED: ownProductionManagement
    }
};

const dispatcher = {
    DISPATCH_TODO: {
        DISPATCH_TODO: true,
        DISPATCH_REJECTED: true,
        DISPATCH_PENDING: true,
        MANAGEMENT_TODO: isAffectedToManagement
    },
    DISPATCH_REJECTED: {
        DISPATCH_REJECTED: true,
        DISPATCH_TODO: true
    },
    DISPATCH_PENDING: {
        DISPATCH_PENDING: true,
        DISPATCH_TODO: true,
        MANAGEMENT_TODO: isAffectedToManagement
    },
    ...manager
};

module.exports = {
    dispatcher,
    manager,
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
    }
};
