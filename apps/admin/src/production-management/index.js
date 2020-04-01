import PMIcon from '@material-ui/icons/Storefront';

import { ProductionManagementCreate } from './Create';
import { ProductionManagementEdit } from './Edit';
import { ProductionManagementList } from './List';

export default {
    create: ProductionManagementCreate,
    edit: ProductionManagementEdit,
    icon: PMIcon,
    list: ProductionManagementList,
    options: { label: 'Pôles de gestion' }
};
