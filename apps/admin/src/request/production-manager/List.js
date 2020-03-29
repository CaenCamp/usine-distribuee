import React from "react";
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
} from "react-admin";
import {
    Divider,
    Tabs,
    AppBar,
    Tab,
} from '@material-ui/core';

import { requesterType } from './index';
import RequestShow from '../dispatcher/Show';

const UserFilter = props => (
    <Filter {...props}>
        <SelectInput
            source="requesterType"
            label="Type de professionnel"
            choices={requesterType}
        />
    </Filter>
);

const RequestPagination = props => (
    <Pagination rowsPerPageOptions={[10, 25]} {...props} />
);

const tabs = [
    { id: "me", name: "Mes commandes" },
    { id: "all", name: "Toutes les commandes" },
];

const RequestDatagrid = props => (
    <Datagrid {...props} expand={<RequestShow />}>
        <TextField source="requesterName" label="Organisation" />
        <NumberField source="maskSmallSizeQuantity" label="Masques Standards" />
        <NumberField source="maskLargeSizeQuantity" label="Masques Longs" />
        <FunctionField label="Localité" render={({ deliveryPostalCode, deliveryCity }) => `${deliveryPostalCode} ${deliveryCity}`} />
        <DateField source="createdAt" label="Passé le" showTime />
    </Datagrid>
)

const TabbedList = (props) => {
    const handleChange = (event, value) => {
        const { setFilters, filterValues } = props;
        setFilters({ ...filterValues, ownership: value });
    };

    return (
        <>
            <AppBar position="relative" color="transparent">
                <Tabs
                    variant="fullWidth"
                    centered
                    value={props.filterValues.ownership}
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
    )
}

export default (props) => (
    <List
        {...props}
        filters={<UserFilter />}
        filterDefaultValues={{ ownership: 'me' }}
        sort={{ field: "createdAt", order: "ASC" }}
        exporter={false}
        pagination={<RequestPagination />}
        bulkActionButtons={false}
        title="Liste des commandes"
    >
        <TabbedList {...props} />
    </List>
);
