import React from 'react';
import {PlainTextMessageComponent} from "../../logic/model/message/MessageBody";
import {Typography} from "@mui/material";

export interface PlaintTextMessageBlockProps {
    msg: PlainTextMessageComponent;
}

export default function PlainTextMessageBlock(props: PlaintTextMessageBlockProps) {
    return (<>
        <Typography>{props.msg.content}</Typography>
    </>);
}
