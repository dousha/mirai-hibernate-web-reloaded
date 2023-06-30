import {ServerResponse} from "./ServerResponse";

export interface FriendListEntry {
    uuid: string; // in the strange format of `${this.botId}.${friendId}`
    remark: string; // friend name
    category: string; // friend category
    added: number; // usually 0
    deleted: number; // usually 0x7fff_ffff_ffff_ffff
}

export interface FriendListResponse extends ServerResponse<Array<FriendListEntry>> {
}

export function extractFriendId(s: string | FriendListEntry): string {
    if (typeof s === 'string') {
        return s.split('.').pop() || '';
    } else {
        return extractFriendId(s.uuid);
    }
}
