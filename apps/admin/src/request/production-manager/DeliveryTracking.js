import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: { maxWidth: 800, margin: "auto" }
});

export default ({ record }) => {
    const classes = useStyles();

    if (!record) {
        return null;
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <p>
                    <Typography variant="h5" gutterBottom>
                        Gestion des livraisons
                    </Typography>
                </p>
            </CardContent>
        </Card>
    );
};
