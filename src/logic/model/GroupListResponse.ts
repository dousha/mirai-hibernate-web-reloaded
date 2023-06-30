import {ServerResponse} from "./ServerResponse";

export interface GroupListEntry {
    group: number;
    name: string;
    owner: number;
}

export interface GroupListResponse extends ServerResponse<Array<GroupListEntry>> {
}
