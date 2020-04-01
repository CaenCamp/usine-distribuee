import React, { useEffect } from 'react';
import { useShowController } from 'react-admin';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { ShowMainContent } from '../ShowMainContent';

const useStyles = makeStyles({
    root: { maxWidth: 800, margin: 'auto' }
});

export default (props) => {
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

    return (
        <Card className={classes.root} ref={ref}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    Numéro de commande : #{record.publicNumber}
                    <br />
                    Identifiant interne : {record.id}
                </Typography>
                <ShowMainContent record={record} />
            </CardContent>
        </Card>
    );
};
