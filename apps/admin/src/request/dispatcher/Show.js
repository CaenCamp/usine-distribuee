import React from 'react';
import { useShowController } from 'react-admin';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import { requesterType as REQUESTER_TYPES } from './index';

const useStyles = makeStyles({
    root: { maxWidth: 800, margin: 'auto' },
});

export default ({ renderActions, ...props }) => {
    const { record } = useShowController(props);
    const classes = useStyles();


    if (!record) {
        return null;
    }

    const requesterType = REQUESTER_TYPES.find(type => type.id === record.requesterType);
    const numberType = requesterType.id === 'other' ? null : requesterType.name;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {record.id}
                </Typography>
                <Grid container>
                    <Grid item xs={6}>
                        <p>
                            <Typography variant="h6" gutterBottom>
                                Organisation
                        </Typography>
                            <Typography gutterBottom>
                                {record.requesterName}<br />
                                {record.requesterOtherType && <>Numéro personnalisé : {record.requesterOtherType}<br /></>}
                                {numberType && `[${numberType}]`} {record.requesterProfessionalIdentifier}
                            </Typography>
                        </p>
                        <p>
                            <Typography variant="h6" gutterBottom>
                                Livraison
                            </Typography>
                            <Typography gutterBottom>
                                {record.deliveryAddress}<br />
                                {record.deliveryPostalCode} {record.deliveryCity}
                            </Typography>
                        </p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>
                            <Typography variant="h6" gutterBottom align="right">
                                Contact
                        </Typography>
                            <Typography gutterBottom align="right">
                                {record.contactName}<br />
                                {record.contactEmail}<br />
                                {record.contactPhone}
                            </Typography>
                        </p>
                        <p>
                            <Typography variant="h6" gutterBottom align="right">
                                Commentaire
                            </Typography>
                            <Typography gutterBottom align="right">
                                {record.requesterComment}
                            </Typography>
                        </p>
                    </Grid>
                </Grid>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Matériel demandé</TableCell>
                                <TableCell align="right">Quantité</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Masque modèle standard (24cm)
                                </TableCell>
                                <TableCell align="right">{record.maskSmallSizeQuantity}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Masque modèle long (34cm)
                                </TableCell>
                                <TableCell align="right">{record.maskLargeSizeQuantity}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                {renderActions && renderActions(record, props)}
            </CardContent>
        </Card>
    );
}
