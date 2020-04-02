import RequestIcon from '@material-ui/icons/Build';

import List from './List';
import Show from '../PrintableShow';
import Edit from '../Edit';

export const requestStatus = [
    { id: 'MANAGEMENT_TODO', name: 'Fabrication demandée' },
    { id: 'MANAGEMENT_BUILDING', name: 'En fabrication' },
    { id: 'MANAGEMENT_DELIVERED', name: 'Livré' }
];

export const requesterType = [
    { id: 'finess', name: 'FINESS' },
    { id: 'rpps', name: 'RPPS' },
    { id: 'adeli', name: 'ADELI' },
    { id: 'other', name: 'Autre' }
];

export default {
    list: List,
    show: Show,
    edit: Edit,
    icon: RequestIcon,
    options: { label: 'Fabrication' }
};
