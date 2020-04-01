import RequestIcon from "@material-ui/icons/List";

import List from "./List";

export const requestStatus = [
    { id: "DISPATCH_TODO", name: "A dispatcher" },
    { id: "DISPATCH_REJECTED", name: "Rejeté" },
    { id: "DISPATCH_PENDING", name: "En attente" },
    { id: "MANAGEMENT_TODO", name: "Fabrication demandée" },
    { id: "MANAGEMENT_BUILDING", name: "En fabrication" },
    { id: "MANAGEMENT_DELIVERED", name: "Livré" },
];

export const requesterType = [
    { id: "finess", name: "FINESS" },
    { id: "rpps", name: "RPPS" },
    { id: "adeli", name: "ADELI" },
    { id: "other", name: "Autre" },
];

export default {
    list: List,
    icon: RequestIcon,
    options: { label: "Demandes" }
};
