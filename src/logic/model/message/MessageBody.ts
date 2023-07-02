import {MessageType} from "./MessageType";
import {MessageKind} from "./MessageKind";
import {UnixTimestamp} from "../UnixTimestamp";

export interface MessageComponent {
    type: MessageType;
}

export interface PlainTextMessageComponent extends MessageComponent {
    type: MessageType.PlainText;
    content: string;
}

export interface ImageMessageComponent extends MessageComponent {
    type: MessageType.Image;
    imageId: string;
    size: number;
    imageType: string;
    width: number;
    height: number;
    isEmoji: boolean;
}

export interface QuotedMessage {
    kind: MessageKind;
    botId: number;
    ids: Array<number>;
    internalIds: Array<number>;
    time: UnixTimestamp;
    fromId: number;
    targetId: number;
    originalMessage: MessageBody;
}

export interface AtMessageComponent extends MessageComponent {
    type: MessageType.At;
    target: number;
}

export interface ReplyMessageComponent extends MessageComponent {
    type: MessageType.QuoteReply;
    source: QuotedMessage;
}

export interface XmlCardComponent {
    type: string;
    serviceId: number;
    content: string;
}

export interface MessageOriginComponent extends MessageComponent {
    type: MessageType.ForwardedMessageCard;
    origin: XmlCardComponent;
    resourceId: string;
}

export interface ForwardedMessageItem {
    time: UnixTimestamp;
    senderName: string;
    senderId: number;
    messageChain: Array<MessageComponent>;
}

export interface ForwardedMessageComponent extends MessageComponent {
    type: MessageType.ForwardedMessage;
    title: string;
    summary: string;
    source: string;
    preview: Array<string>;
    nodeList: Array<ForwardedMessageItem>;
}

export interface FileMessageComponent extends MessageComponent {
    type: MessageType.File;
    id: string;
    internalId: number;
    name: string;
    size: number;
}

export interface MarketFaceDelegate {
    faceName: Array<number>;
    itemType: number;
    faceInfo: number;
    faceId: Array<number>;
    tabId: number;
    subType: number;
    key: Array<number>;
    imageWidth: number;
    imageHeight: number;
    pbReserve: Array<number>;
}

export interface MarketFaceComponent extends MessageComponent {
    type: MessageType.MarketFace;
    delegate: MarketFaceDelegate;
}

export interface UnsupportedMessageComponent extends MessageComponent {
    type: MessageType.Unknown;
}

export type MessageBody = MessageComponent[];
