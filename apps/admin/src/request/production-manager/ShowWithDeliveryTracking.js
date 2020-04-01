import React, { useEffect } from 'react';
import { useShowController } from 'react-admin';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

import { ShowMainContent } from '../ShowMainContent';
import DeliveryTracking from './DeliveryTracking';

const useStyles = makeStyles({
    root: { maxWidth: 800, margin: 'auto' }
});

export default ({ renderActions, ...props }) => {
    const { record } = useShowController(props);
    const classes = useStyles();
    const ref = React.createRef();

    useEffect(() => {
        if (!ref) {
            return;
        }
        ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }, [ref]);

    if (!record) {
        return null;
    }

    if (record.status === 'MANAGEMENT_BUILDING') {
        return (
            <Grid container>
                <Grid item xs={5}>
                    <Card className={classes.root} ref={ref}>
                        <CardContent>
                            <ShowMainContent record={record} />
                            {renderActions && renderActions(record, props)}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={7}>
                    <DeliveryTracking record={record} />
                </Grid>
            </Grid>
        );
    }

    return (
        <Card className={classes.root} ref={ref}>
            <CardContent>
                <ShowMainContent record={record} />
                {renderActions && renderActions(record, props)}
            </CardContent>
        </Card>
    );
};
