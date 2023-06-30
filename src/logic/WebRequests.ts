import axios from "axios";
import {BotListResponse} from "./model/BotListResponse";
import {extractPayload} from "./model/ServerResponse";
import {GroupListResponse} from "./model/GroupListResponse";
import {FriendListResponse} from "./model/FriendListResponse";

export function getAvatarUrl(x: number | string) {
    return `http://q1.qlogo.cn/g?b=qq&nk=${x}&s=640`;
}

export function getGroupAvatarUrl(x: number | string) {
    return `http://p.qlogo.cn/gh/${x}/${x}/640`;
}

async function getUrl<T>(url: string, params?: Record<string, string | number>) {
    let result = await axios.get<T>(url, { params: params });
    return result.data;
}

export async function fetchBotList() {
    let result = await getUrl<BotListResponse>("/archive/bot");
    return extractPayload(result);
}

export async function fetchGroupList(bot: number | string) {
    let result = await getUrl<GroupListResponse>('/archive/group', {bot: bot});
    return extractPayload(result);
}

export async function fetchFriendList(bot: number | string) {
    let result = await getUrl<FriendListResponse>('/archive/friend', {bot: bot});
    return extractPayload(result);
}
