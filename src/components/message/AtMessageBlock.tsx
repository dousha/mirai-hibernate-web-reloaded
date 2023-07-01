import React from 'react';
import {AtMessageComponent} from "../../logic/model/message/MessageBody";
import {Typography} from "@mui/material";

export interface AtMessageBlockProps {
    msg: AtMessageComponent;
}

export default function AtMessageBlock(props: AtMessageBlockProps) {
    return (<>
        <Typography color={'navy'}>@{props.msg.target}</Typography>
    </>);
}
