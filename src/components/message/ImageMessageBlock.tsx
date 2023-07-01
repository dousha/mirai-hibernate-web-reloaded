import React from 'react';
import {ImageMessageComponent} from "../../logic/model/message/MessageBody";
import {getImageUrl} from "../../logic/WebRequests";

export interface ImageMessageBlockProps {
    msg: ImageMessageComponent;
    fromId: number;
    targetId: number;
}

export default function ImageMessageBlock(props: ImageMessageBlockProps) {
    const url = getImageUrl(props.fromId, props.targetId, props.msg.imageId);

    return (<>
        <img src={url}
             alt={props.msg.imageId}
             referrerPolicy={'no-referrer'}
             width={Math.min(props.msg.width, props.msg.isEmoji ? 128 : 512)}
             onClick={() => {
                 window.open(url, '_blank', 'noreferrer');
             }}
        />
    </>);
}
