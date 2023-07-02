import {ServerResponse} from "./ServerResponse";

export interface GroupMemberEntry {
    uuid: string;
    name: string;
    title: string;
    joined: number;
    last: number;
    active: number;
    exited: number;
}

export interface GroupMemberListResponse extends ServerResponse<Array<GroupMemberEntry>> {
}
