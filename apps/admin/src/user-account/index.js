import UserIcon from '@material-ui/icons/People';

import List from './List';
import Edit from './Edit';
import Create from './Create';

export const userRoles = [
    { id: 'admin', name: 'Administrateur' },
    { id: 'dispatcher', name: 'Dispatcher' },
    { id: 'production_manager', name: 'Pôle de gestion' },
    { id: 'guest', name: 'Invité' }
];

export default {
    list: List,
    edit: Edit,
    create: Create,
    icon: UserIcon,
    options: { label: 'Utilisateurs' }
};
