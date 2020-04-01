import React from 'react';
import {
    Datagrid,
    DateField,
    Filter,
    List,
    Pagination,
    SelectInput,
    TextField,
    NumberField,
    FunctionField,
    EditButton
} from 'react-admin';
import { Divider, Tabs, AppBar, Tab } from '@material-ui/core';
import { PrintButton } from '../PrintButton';

import { requesterType } from './index';
import RequestShow from './ShowWithDeliveryTracking';
import StatusActions from './StatusActions';
import { DeliveryPercentage } from '../DeliveryPercentage';

const UserFilter = props => (
    <Filter {...props}>
        <SelectInput
            source="requesterType"
            label="Type de numéro professionnel"
            choices={requesterType}
        />
    </Filter>
);

const RequestPagination = props => (
    <Pagination rowsPerPageOptions={[10, 25]} {...props} />
);

const tabs = [
    { id: 'MANAGEMENT_TODO', name: 'A fabriquer' },
    { id: 'MANAGEMENT_BUILDING', name: 'En fabrication / livraison' },
    { id: 'MANAGEMENT_DELIVERED', name: 'Livré' }
];

const RequestDatagrid = props => (
    <Datagrid
        {...props}
        expand={
            <RequestShow
                renderActions={record => <StatusActions record={record} />}
            />
        }
        rowClick="expand"
    >
        <TextField source="publicNumber" label="#" />
        <TextField source="requesterName" label="Organisation" />
        <NumberField source="maskSmallSizeQuantity" label="Masques Standards" />
        <NumberField source="maskLargeSizeQuantity" label="Masques Longs" />
        <FunctionField
            label="Localité"
            render={({ deliveryPostalCode, deliveryCity }) =>
                `${deliveryPostalCode} ${deliveryCity}`
            }
        />
        <DateField source="createdAt" label="Passé le" showTime />
        <DeliveryPercentage label="Commandes livrées" />
        <EditButton />
        <PrintButton />
    </Datagrid>
);

const TabbedList = props => {
    const handleChange = (event, value) => {
        const { setFilters, filterValues } = props;
        setFilters({ ...filterValues, status: value });
    };

    return (
        <>
            <AppBar position="relative" color="transparent" elevation={0}>
                <Tabs
                    variant="fullWidth"
                    centered
                    value={props.filterValues.status}
                    indicatorColor="primary"
                    onChange={handleChange}
                >
                    {tabs.map(choice => (
                        <Tab
                            key={choice.id}
                            label={choice.name}
                            value={choice.id}
                        />
                    ))}
                </Tabs>
            </AppBar>
            <Divider />
            <div>
                <RequestDatagrid {...props} />
            </div>
        </>
    );
};

export default props => (
    <List
        {...props}
        filters={<UserFilter />}
        filterDefaultValues={{
            ownership: 'me',
            status: 'MANAGEMENT_TODO'
        }}
        sort={{ field: 'createdAt', order: 'ASC' }}
        exporter={false}
        pagination={<RequestPagination />}
        perPage={25}
        bulkActionButtons={false}
        title="Liste des demandes de fabrications"
    >
        <TabbedList {...props} />
    </List>
);
