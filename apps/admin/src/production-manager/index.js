import RequestIcon from "@material-ui/icons/Build";

import List from "./List";
// import Edit from "./Edit";
// import Create from "./Create";

export const requestStatus = [
    { id: "DISPATCH_TODO", name: "A dispatcher" },
    { id: "DISPATCH_REJECTED", name: "Rejeté" },
    { id: "DISPATCH_PENDING", name: " En attente" },
    { id: "MANAGEMENT_TODO", name: "Fabrication demandée" },
    { id: "MANAGEMENT_BUILDING", name: "En fabrication" },
    { id: "MANAGEMENT_BUILT", name: "Fabriqué" },
    { id: "MANAGEMENT_DELIVERED", name: "Livré" },
];

export const requesterType = [
    { id: "finess", name: "FITNESS" },
    { id: "rpps", name: "RPPS" },
    { id: "adeli", name: "ADELI" },
    { id: "other", name: "Autre" },
];

export default {
    list: List,
    // edit: Edit,
    // create: Create,
    icon: RequestIcon,
    options: { label: "Production" }
};
