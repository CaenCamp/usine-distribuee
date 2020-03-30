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
        ]),
        "production-manager-requests": {
            enabled: true,
            list: true,
            show: true,
            create: false,
            edit: true
        },
        "requests": {
            enabled: true,
            list: true,
            show: true,
            create: false,
            edit: false
        }
    },
    production_manager: {
        ...buildFullAccessFor(["production-manager-requests"]),
        "requests": {
            enabled: true,
            list: true,
            show: true,
            create: false,
            edit: false
        }
    },
    guest: {
        "requests": {
            enabled: true,
            list: true,
            show: true,
            create: false,
            edit: false
        }
    }
};
