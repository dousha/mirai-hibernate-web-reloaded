import React from 'react';
import {ReplyMessageComponent} from "../../logic/model/message/MessageBody";
import {Grid, Typography} from "@mui/material";
import {toMoment} from "../../logic/model/UnixTimestamp";
import UnifiedMessageLine from "../UnifiedMessageLine";

export interface QuotedMessageBlockProps {
    msg: ReplyMessageComponent;
}

export default function QuotedMessageBlock(props: QuotedMessageBlockProps) {
    const source = props.msg.source;

    return (<>
        <Grid container direction={'column'} sx={{backgroundColor: 'rgb(239, 239, 239)', minHeight: '1rem', p: 1}}>
            <Grid item>
                <Grid container direction={'row'} justifyContent={'space-between'}>
                    <Grid item>
                        <Typography>{source.fromId}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>{toMoment(source.time).format('YYYY-MM-DD HH:mm')}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <UnifiedMessageLine msg={source.originalMessage} fromId={source.fromId} targetId={source.targetId} />
            </Grid>
        </Grid>
    </>);
}