import React, { useState } from 'react';
import { useQuery, useMutation, useRefresh } from 'react-admin';
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
    const classes = useStyles();
    const refresh = useRefresh();

    const upValues = { newStatus: null, newLabel: null };
    const downValues = { newStatus: null, newLabel: null };
    switch (record.status) {
        case 'MANAGEMENT_TODO':
            upValues.newStatus = 'MANAGEMENT_BUILDING';
            upValues.newLabel = 'Passer en fabrication';
            break;
        case 'MANAGEMENT_BUILDING':
            downValues.newStatus = 'MANAGEMENT_TODO';
            downValues.newLabel = 'Remettre en attente'
            upValues.newStatus = 'MANAGEMENT_DELIVERED';
            upValues.newLabel = 'Fabrication livrée';
            break;
        case 'MANAGEMENT_DELIVERED':
            downValues.newStatus = 'MANAGEMENT_BUILDING';
            downValues.newLabel = 'Remettre en fabrication'
            break;
        default:
            break;
    }

    const [up, { loading: upLoading }] = useMutation({
        type: 'update',
        resource: 'dispatcher-requests',
        payload: {
            id: record.id,
            data: {
                status: upValues.newStatus,
            }
        },
    }, { onSuccess: refresh });
    const [down, { loading: downLoading }] = useMutation({
        type: 'update',
        resource: 'dispatcher-requests',
        payload: {
            id: record.id,
            data: {
                status: downValues.newStatus,
            }
        },
    }, { onSuccess: refresh });

    return (
        <Grid container className={classes.container}>
            {downValues.newStatus && <Grid item xs={upValues.newStatus ? 6 : 12}>
                <Button variant="contained" color="secondary" onClick={down} disabled={downLoading}>
                    {downValues.newLabel}
                </Button>
            </Grid>}
            {upValues.newStatus && (
                <Grid
                    item xs={downValues.newStatus ? 6 : 12}
                    justify="flex-end"
                    alignItems="flex-start"
                    container
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={up}
                        disabled={upLoading}
                    >{upValues.newLabel}</Button>
                </Grid>
            )}
        </Grid>
    )
}

export default DispatchActions;
