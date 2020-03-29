import React from 'react';
import {
    Grid,
    Button,
    FormControl,
    InputLabel,
    Select
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

const DispatchActions = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.container}>
            <Grid item xs={6}><Button variant="contained">Mettre en attente</Button></Grid>
            <Grid item xs={6} justify="flex-end" alignItems="flex-start" container>
                <FormControl className={classes.formControl}>
                    <InputLabel id="select-production-manager">Pôle de gestion</InputLabel>
                    <Select
                        labelId="select-production-manager"
                        id="select-production-manager"
                    >
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary">Affecter</Button>
            </Grid>
        </Grid>
    )
}

export default DispatchActions;
