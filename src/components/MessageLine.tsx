import React from 'react';
import {MessageBody} from "../logic/model/message/MessageBody";
import {MessageEntry} from "../logic/model/MessageListResponse";
import UnifiedMessageLine from "./UnifiedMessageLine";

export interface MessageLineProps {
    msg: MessageEntry;
}

export default function MessageLine(props: MessageLineProps) {
    const {msg} = props;
    const content: MessageBody = JSON.parse(msg.code);

    return <UnifiedMessageLine msg={content} fromId={msg.fromId} targetId={msg.targetId}/>;
}
