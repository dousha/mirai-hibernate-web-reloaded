import React from 'react';
import {ImageMessageComponent} from "../../logic/model/message/MessageBody";
import {getImageUrl} from "../../logic/WebRequests";
import {Box} from "@mui/material";

export interface ImageMessageBlockProps {
    msg: ImageMessageComponent;
    fromId: number;
    targetId: number;
}

export default function ImageMessageBlock(props: ImageMessageBlockProps) {
    const url = getImageUrl(props.fromId, props.targetId, props.msg.imageId);
    const width = Math.min(props.msg.width, props.msg.isEmoji ? 128 : 512);
    const scale = width / props.msg.width;
    const height = props.msg.height * scale;

    return (<>
        <Box sx={{width: width, height: height}}>
            <img src={url}
                 alt={props.msg.imageId}
                 referrerPolicy={'no-referrer'}
                 width={width}
                 height={height}
                 onClick={() => {
                     window.open(url, '_blank', 'noreferrer');
                 }}
            />
        </Box>
    </>);
}
