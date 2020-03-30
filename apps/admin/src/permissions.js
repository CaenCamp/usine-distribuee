import { buildFullAccessFor } from "ra-auth-acl";

export default {
    admin: buildFullAccessFor([
        "requests",
        "dispatcher-requests",
        "production-manager-requests",
        "production-managements",
        "user-accounts"
    ]),
    dispatcher: {
        ...buildFullAccessFor([
            "dispatcher-requests",
            "requests",
        ]),
        "production-manager-requests": {
            enabled: true,
            list: true,
            show: true,
            create: false,
            edit: true
        },
        "production-managements": {
            enabled: true,
            list: false,
            show: false,
            create: false,
            edit: false
        },
    },
    production_manager: {
        ...buildFullAccessFor([
            "production-manager-requests",
            "requests",
        ]),
        "production-managements": {
            enabled: true,
            list: false,
            show: false,
            create: false,
            edit: false
        },
    },
    guest: {
        ...buildFullAccessFor([
            "requests",
        ]),
        "production-managements": {
            enabled: true,
            list: false,
            show: false,
            create: false,
            edit: false
        },
    },
};
