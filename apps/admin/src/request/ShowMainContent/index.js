import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

import { requesterType as REQUESTER_TYPES } from '../dispatcher/index';
import { RequestResume } from './RequestResume';
import { RequestNotePad } from './RequestNotePad';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    }
}));

export const ShowMainContent = ({ record }) => {
    const classes = useStyles();
    const [tabIndex, setTabIndex] = useState(0);

    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };
    const requesterType = REQUESTER_TYPES.find(
        (type) => type.id === record.requesterType
    );
    const numberType = requesterType.id === 'other' ? null : requesterType.name;
    const commentsLabel = record.productionManagementComments
        ? `Commentaires (${record.productionManagementComments.length})`
        : 'Commentaires';

    return (
        <div className={classes.root}>
            <AppBar position="static" color="transparent">
                <Tabs
                    value={tabIndex}
                    onChange={handleChange}
                    variant="fullWidth"
                    indicatorColor="primary"
                >
                    <Tab label="Résumé de la commande" />
                    <Tab label={commentsLabel} />
                </Tabs>
            </AppBar>
            <RequestResume
                record={record}
                numberType={numberType}
                show={tabIndex === 0}
            />
            <RequestNotePad record={record} show={tabIndex === 1} />
        </div>
    );
};
