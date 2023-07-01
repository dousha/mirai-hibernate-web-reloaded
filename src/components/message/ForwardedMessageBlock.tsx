import React from 'react';
import {ForwardedMessageComponent} from "../../logic/model/message/MessageBody";
import {Paper, Typography} from "@mui/material";

export interface ForwardedMessageBlockProps {
    msg: ForwardedMessageComponent;
}

export default function ForwardedMessageBlock(props: ForwardedMessageBlockProps) {
    return (<>
        <Paper variant={'outlined'}>
            <Typography>{props.msg.title}</Typography>
            {props.msg.preview.map((it, index) => <Typography color={'gray'} key={index}>{it}</Typography>)}
        </Paper>
    </>);
}
