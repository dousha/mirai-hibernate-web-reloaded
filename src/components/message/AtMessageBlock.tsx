import React from 'react';
import {AtMessageComponent} from "../../logic/model/message/MessageBody";
import {Typography} from "@mui/material";

export interface AtMessageBlockProps {
    msg: AtMessageComponent;

    queryMemberName: (x: number | string) => string;
}

export default function AtMessageBlock(props: AtMessageBlockProps) {
    return (<>
        <Typography color={'navy'}>@{props.queryMemberName(props.msg.target)}</Typography>
    </>);
}
