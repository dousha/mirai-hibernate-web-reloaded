import React from 'react';
import {MessageOriginComponent} from "../../logic/model/message/MessageBody";
import {Typography} from "@mui/material";

export interface ForwardedMessageXmlBlockProps {
    msg: MessageOriginComponent;
}

export default function ForwardedMessageXmlBlock(props: ForwardedMessageXmlBlockProps) {
    return (<>
        <Typography color={'transparent'}>{props.msg.resourceId}</Typography>
    </>);
}
