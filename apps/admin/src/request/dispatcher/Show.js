import React, { useEffect } from "react";
import { useShowController } from "react-admin";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from '@material-ui/core/Tooltip';
import FileCopyIcon from "@material-ui/icons/FileCopy";

import { makeStyles } from "@material-ui/core/styles";

import { requesterType as REQUESTER_TYPES } from "./index";

const useStyles = makeStyles({
    root: { maxWidth: 800, margin: "auto" }
});

const copyToClipboard = str => {
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
};

export const ShowMainContent = ({ record }) => {
    const requesterType = REQUESTER_TYPES.find(
        type => type.id === record.requesterType
    );
    const numberType = requesterType.id === "other" ? null : requesterType.name;
    return (
        <>
            <Grid container>
                <Grid item xs={6}>
                    <p>
                        <Typography variant="h6" gutterBottom>
                            Organisation
                            </Typography>
                        <Typography gutterBottom>
                            {record.requesterName}
                            <br />
                            {record.requesterOtherType && (
                                <>
                                    Numéro personnalisé :{" "}
                                    {record.requesterOtherType}
                                    <br />
                                </>
                            )}
                            {numberType && `[${numberType}]`}{" "}
                            {record.requesterProfessionalIdentifier}
                        </Typography>
                    </p>
                    <p>
                        <Typography variant="h6" gutterBottom>
                            Livraison
                            </Typography>
                        <Typography gutterBottom>
                            {record.deliveryAddress}
                            <br />
                            {record.deliveryPostalCode}{" "}
                            {record.deliveryCity}
                        </Typography>
                    </p>
                </Grid>
                <Grid item xs={6}>
                    <p>
                        <Typography variant="h6" gutterBottom align="right">
                            Contact
                            </Typography>
                        <Typography gutterBottom align="right">
                            {record.contactName}
                            <br />
                            {record.contactEmail}
                            <br />
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
                            <TableCell align="right">
                                {record.maskSmallSizeQuantity}
                                {record.maskSmallSizeDeliveredQuantity ? ` (livrés: ${record.maskSmallSizeDeliveredQuantity})` : ''}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Masque modèle long (34cm)
                                </TableCell>
                            <TableCell align="right">
                                {record.maskLargeSizeQuantity}
                                {record.maskLargeSizeDeliveredQuantity ? ` (livrés: ${record.maskLargeSizeDeliveredQuantity})` : ''}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
};

export default ({ renderActions, ...props }) => {
    const { record } = useShowController(props);
    const classes = useStyles();
    const ref = React.createRef();

    useEffect(() => {
        if (!ref) {
            return;
        }
        ref.current.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }, [ref]);

    const handleCopyToClipboard = value => () => copyToClipboard(value);

    if (!record) {
        return null;
    }

    return (
        <Card className={classes.root} ref={ref}>
            <CardContent>
                <ShowMainContent record={record} />
                {renderActions && renderActions(record, props)}
                <Typography
                    color="textSecondary"
                    variant="caption"
                    align="right"
                    gutterBottom
                >
                    {record.id}{" "}
                    <Tooltip title="Copier dans le presse-papier">
                        <IconButton
                            aria-label="Copier dans le presse-papier"
                            color="textSecondary"
                            size="small"
                            onClick={handleCopyToClipboard(record.id)}
                        >
                            <FileCopyIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Typography>
            </CardContent>
        </Card>
    );
};
