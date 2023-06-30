import React from 'react';
import {CircularProgress, Container, Grid} from "@mui/material";

export default function SuspensePage() {
    return (<>
        <Container>
            <Grid container>
                <Grid item>
                    <CircularProgress />
                </Grid>
            </Grid>
        </Container>
    </>);
}
