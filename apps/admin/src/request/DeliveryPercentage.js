import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        textAlign: 'center'
    },
    progressBar: {
        position: 'relative',
        height: '10px',
        width: '100%',
        borderRadius: '10px',
        border: '1px solid #333',
        overflow: 'hidden'
    },
    filler: {
        background: '#3f51b5',
        height: '100%',
        borderRadius: 'inherit',
        transition: 'width .2s ease-in'
    }
}));

export const DeliveryPercentage = ({ record }) => {
    const classes = useStyles();
    const totalDelivered =
        record.maskSmallSizeDeliveredQuantity +
        record.maskLargeSizeDeliveredQuantity;
    const totalAsked =
        record.maskSmallSizeQuantity + record.maskLargeSizeQuantity;
    const percent = Math.trunc((totalDelivered * 100) / totalAsked);

    return (
        <div className={classes.root}>
            {percent}%{' '}
            <div className={classes.progressBar}>
                <div
                    className={classes.filler}
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
};
