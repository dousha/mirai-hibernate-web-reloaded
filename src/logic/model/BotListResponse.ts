import {ServerResponse} from "./ServerResponse";
import {UnixTimestamp} from "./UnixTimestamp";

export interface BotListEntry {
    bot: number;
    name: string;
    init: UnixTimestamp;
    latest: UnixTimestamp;
}

export interface BotListResponse extends ServerResponse<Array<BotListEntry>> {
}
