import React, {useState, useEffect, useCallback} from 'react';
import {useVersion, useDataProvider} from 'react-admin';
import {useMediaQuery} from '@material-ui/core';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Collections from '@material-ui/icons/Collections';
import AccountBox from '@material-ui/icons/AccountBox';
import PanTool from '@material-ui/icons/PanTool';
import Build from '@material-ui/icons/Build';
import LocalShipping from '@material-ui/icons/LocalShipping';

import { Button } from '@material-ui/core';

import RequestKPI from './RequestKPI';

const styles = {
    flex: {
        display: 'flex'
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column'
    },
    leftCol: {
        flex: 1,
        marginRight: '1em'
    },
    rightCol: {
        flex: 1,
        marginLeft: '1em'
    },
    singleCol: {
        marginTop: '2em',
        marginBottom: '2em'
    }
};

const Dashboard = () => {
    const [state, setState] = useState({
        request_nb:0,
        requester_nb:0,
        requested_shade_qty:0,
        in_production_shade_qty:0,
        delivered_shade_qty:0
    });
    const version = useVersion();
    const dataProvider = useDataProvider();
    const isXSmall = useMediaQuery((theme) =>
        theme.breakpoints.down('xs')
    );
    const isSmall = useMediaQuery((theme) =>
        theme.breakpoints.down('sm')
    );

    const fetchStats = useCallback(async () => {
        const { data : stats } = await dataProvider.getList('stats', {
            sort: { field: 'id', order: 'ASC' },
            pagination: { page: 1, perPage: 1 }
        });
        const request_nb = stats[0].requestNb;
        const requester_nb = stats[0].requesterNb;
        const requested_shade_qty = stats[0].requestedShadeQty;
        const in_production_shade_qty = stats[0].inProductionShadeQty;
        const delivered_shade_qty = stats[0].deliveredShadeQty;
        setState(state => ({ ...state, request_nb, requester_nb, requested_shade_qty, in_production_shade_qty, delivered_shade_qty }));
    }, [dataProvider]);

    useEffect(() => {
        fetchStats();
    }, [version]); // eslint-disable-line react-hooks/exhaustive-deps

    const {
        request_nb,
        requester_nb,
        requested_shade_qty,
        in_production_shade_qty,
        delivered_shade_qty,
    } = state;

    const request_nb_props = {
        title: 'Nombre de demandes',
        value: request_nb,
        icon: Collections,
    };
    const requester_nb_props = {
        title: 'Nombre de demandeurs',
        value: requester_nb,
        icon: AccountBox,
    };
    const requested_shade_qty_props = {
        title: 'Visières demandées',
        value: requested_shade_qty,
        icon: PanTool,
    };
    const in_production_shade_qty_props = {
        title: 'Visières en production',
        value: in_production_shade_qty,
        icon: Build,
    };
    const delivered_shade_qty_props = {
        title: 'Visières livrées',
        value: delivered_shade_qty,
        icon: LocalShipping,
    };
    
    return isXSmall ? (
        <div>
            <div style={styles.flexColumn}>
                    <RequestKPI {...request_nb_props} />
                    <RequestKPI {...requester_nb_props} />
                    <RequestKPI {...requested_shade_qty_props} />
                    <RequestKPI {...in_production_shade_qty_props} />
                    <RequestKPI {...delivered_shade_qty_props} />
                    <Button 
                        variant="contained" 
                        color="primary"
                        href="#/requests"
                    >
                        Voir la liste des demandes
                    </Button>
            </div>
        </div>
    ) : isSmall ? (
        <div style={styles.flexColumn}>
            <div style={styles.flexColumn}>
                <RequestKPI {...request_nb_props} />
                <RequestKPI {...requester_nb_props} />
                <RequestKPI {...requested_shade_qty_props} />
                <RequestKPI {...in_production_shade_qty_props} />
                <RequestKPI {...delivered_shade_qty_props} />
                <Button 
                    variant="contained" 
                    color="primary"
                    href="#/requests"
                >
                    Voir la liste des demandes
                </Button>
            </div>
        </div>
    ) : (
        <TableContainer>
            <Table>
            <TableHead>
                    <TableRow>
                        <TableCell>
                            <RequestKPI {...request_nb_props} />
                        </TableCell>
                        <TableCell>
                            <RequestKPI {...requester_nb_props} />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <RequestKPI {...requested_shade_qty_props} />
                        </TableCell>
                        <TableCell>
                            <RequestKPI {...in_production_shade_qty_props} />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>
                            <RequestKPI {...delivered_shade_qty_props} />
                        </TableCell>
                        <TableCell align='center'>
                            <Button 
                                variant="contained" 
                                color="primary"
                                href="#/requests"
                            >
                                Voir la liste des demandes
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        
    );
};

export default Dashboard;