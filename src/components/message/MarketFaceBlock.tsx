import React from 'react';
import {MarketFaceComponent} from "../../logic/model/message/MessageBody";
import {getMarketFaceUrl} from "../../logic/WebRequests";
import {Box} from "@mui/material";

export interface MarketFaceBlockProps {
    msg: MarketFaceComponent;
}

export default function MarketFaceBlock(props: MarketFaceBlockProps) {
    const url = getMarketFaceUrl(props.msg.delegate);
    const height = props.msg.delegate.imageHeight;
    const width = props.msg.delegate.imageWidth;

    return (<>
        <Box sx={{width: width, height: height}}>
            <img src={url}
                 alt={'MarketFace'}
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
