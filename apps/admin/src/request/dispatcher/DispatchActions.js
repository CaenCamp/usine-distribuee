import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-admin';
import {
    Grid,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container: {
        marginTop: 16,
    },
    formControl: {
        minWidth: 200,
        position: 'relative',
        top: -12,
        marginRight: 16
    }
})

const DispatchActions = ({ record }) => {
    const [selectedProductionManager, setProductionManager] = useState();
    const classes = useStyles();

    const { data: productionManagers, loading: queryLoading } = useQuery({
        type: 'getList',
        resource: 'production-managements',
        payload: {
            pagination: { page: 1, perPage: 1000 },
            sort: { field: 'name', order: 'ASC' }
        }
    });

    const [dispatch, { loading: dispatchLoading }] = useMutation({
        type: 'update',
        resource: 'dispatcher-requests',
        payload: {
            id: record.id,
            data: {
                status: 'MANAGEMENT_TODO',
                production_management_id: selectedProductionManager
            }
        }
    });

    const [postpone, { loading: postoneLoading }] = useMutation({
        type: 'update',
        resource: 'dispatcher-requests',
        payload: {
            id: record.id,
            data: {
                status: 'DISPATCH_PENDING',
            }
        }
    });

    const disabled = queryLoading || dispatchLoading || postoneLoading;

    const handleProductionManagerChange = (evt) => {
        setProductionManager(evt.target.value);
    }

    return (
        <Grid container className={classes.container}>
            <Grid item xs={6}>
                <Button variant="contained" color="secondary" disabled={disabled} onClick={postpone}>
                    Mettre en attente
                </Button>
            </Grid>
            <Grid item xs={6} justify="flex-end" alignItems="flex-start" container>
                <FormControl className={classes.formControl}>
                    <InputLabel id="select-production-manager">Pôle de gestion</InputLabel>
                    <Select
                        labelId="select-production-manager"
                        id="select-production-manager"
                        value={selectedProductionManager}
                        onChange={handleProductionManagerChange}
                    >
                        {productionManagers && productionManagers.map(manager => (
                            <MenuItem key={manager.id} value={manager.id}>{manager.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={!selectedProductionManager || disabled}
                    onClick={dispatch}
                >Affecter</Button>
            </Grid>
        </Grid>
    )
}

export default DispatchActions;
