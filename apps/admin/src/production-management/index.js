import PMIcon from "@material-ui/icons/Storefront";
import { ListGuesser, EditGuesser } from 'react-admin';

import { ProductionManagementCreate } from './Create';

export default {
    create: ProductionManagementCreate,
    edit: EditGuesser,
    icon: PMIcon,
    list: ListGuesser,
    options: { label: "Pôle de gestion" }
};