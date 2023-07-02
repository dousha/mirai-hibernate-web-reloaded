import React from 'react';
import {MarketFaceComponent} from "../../logic/model/message/MessageBody";
import {getMarketFaceUrl} from "../../logic/WebRequests";

export interface MarketFaceBlockProps {
    msg: MarketFaceComponent;
}

export default function MarketFaceBlock(props: MarketFaceBlockProps) {
    const url = getMarketFaceUrl(props.msg.delegate);

    return (<>
        <img src={url}
             alt={'MarketFace'}
             referrerPolicy={'no-referrer'}
             width={props.msg.delegate.imageWidth}
             onClick={() => {
                 window.open(url, '_blank', 'noreferrer');
             }}
        />
    </>);
}
