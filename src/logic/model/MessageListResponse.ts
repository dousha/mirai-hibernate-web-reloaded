import {ServerResponse} from "./ServerResponse";
import {UnixTimestamp} from "./UnixTimestamp";
import {MessageKind} from "./message/MessageKind";

export interface MessageEntry {
    id: number;
    bot: number;
    fromId: number;
    targetId: number;
    ids: string;
    internalIds: string;
    time: UnixTimestamp;
    kind: MessageKind;
    code: string;
    recalled?: number;
}

export interface MessageListResponse extends ServerResponse<Array<MessageEntry>> {
}
