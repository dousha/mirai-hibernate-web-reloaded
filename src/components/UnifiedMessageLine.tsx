import React from 'react';
import {
    AtMessageComponent, ForwardedMessageComponent,
    ImageMessageComponent,
    MessageBody, MessageOriginComponent,
    PlainTextMessageComponent,
    ReplyMessageComponent,
    UnsupportedMessageComponent
} from "../logic/model/message/MessageBody";
import {MessageType} from "../logic/model/message/MessageType";
import UnknownMessageBlock from "./message/UnknownMessageBlock";
import PlainTextMessageBlock from "./message/PlainTextMessageBlock";
import AtMessageBlock from "./message/AtMessageBlock";
import ImageMessageBlock from "./message/ImageMessageBlock";
import QuotedMessageBlock from "./message/QuotedMessageBlock";
import ForwardedMessageXmlBlock from "./message/ForwardedMessageXmlBlock";
import ForwardedMessageBlock from "./message/ForwardedMessageBlock";

export interface MessageLineProps {
    msg: MessageBody;
    fromId: number;
    targetId: number;
}

export default function UnifiedMessageLine(props: MessageLineProps) {
    const {msg} = props;

    const components = msg.map((it, index) => {
        switch (it.type) {
            case MessageType.PlainText:
                return (<PlainTextMessageBlock key={index} msg={it as PlainTextMessageComponent}/>);
            case MessageType.At:
                return (<AtMessageBlock key={index} msg={it as AtMessageComponent}/>);
            case MessageType.Image:
                return (
                    <ImageMessageBlock msg={it as ImageMessageComponent} fromId={props.fromId}
                                       targetId={props.targetId}/>);
            case MessageType.QuoteReply:
                return (<QuotedMessageBlock msg={it as ReplyMessageComponent}/>);
            case MessageType.ForwardedMessageCard:
                return (<ForwardedMessageXmlBlock msg={it as MessageOriginComponent}/>);
            case MessageType.ForwardedMessage:
                return (<ForwardedMessageBlock msg={it as ForwardedMessageComponent}/>);
            case MessageType.Unknown:
            default:
                return (<UnknownMessageBlock key={index} msg={it as UnsupportedMessageComponent}/>);
        }
    });

    return (<>
        {components}
    </>);
}
