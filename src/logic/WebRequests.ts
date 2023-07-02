import axios from "axios";
import {BotListEntry, BotListResponse} from "./model/BotListResponse";
import {extractPayload} from "./model/ServerResponse";
import {GroupListResponse} from "./model/GroupListResponse";
import {FriendListResponse} from "./model/FriendListResponse";
import {UnixTimestamp} from "./model/UnixTimestamp";
import {MessageListResponse} from "./model/MessageListResponse";
import {GroupMemberListResponse} from "./model/GroupMemberListResponse";

const cachedBots: BotListEntry[] = [];

export function getAvatarUrl(x: number | string) {
    return `http://q1.qlogo.cn/g?b=qq&nk=${x}&s=640`;
}

export function getGroupAvatarUrl(x: number | string) {
    return `http://p.qlogo.cn/gh/${x}/${x}/640`;
}

export function getImageUrl(fromId: number, targetId: number, imageId: string, isFlashImage = false) {
    let match = imageId.substring(1, 37).replaceAll("-", "");
    return `https://gchat.qpic.cn/gchatpic_new/${fromId}/${targetId}-0-${match}/0?term=${isFlashImage ? 2 : 3}`;
}

async function getUrl<T>(url: string, params?: Record<string, string | number>) {
    let result = await axios.get<T>(url, {params: params});
    return result.data;
}

export async function fetchBotList() {
    let result = await getUrl<BotListResponse>("/archive/bot");
    let payload = extractPayload(result);
    cachedBots.splice(0, cachedBots.length);
    payload.forEach(it => cachedBots.push(it));
    return payload;
}

export function getCachedBotList() {
    return cachedBots;
}

export async function fetchGroupList(bot: number | string) {
    let result = await getUrl<GroupListResponse>('/archive/group', {bot: bot});
    return extractPayload(result);
}

export async function fetchFriendList(bot: number | string) {
    let result = await getUrl<FriendListResponse>('/archive/friend', {bot: bot});
    return extractPayload(result);
}

export async function fetchGroupMessage(bot: number | string, group: number | string, from: UnixTimestamp, to: UnixTimestamp) {
    let result = await getUrl<MessageListResponse>('/message/group', {bot: bot, group: group, start: from, end: to});
    return extractPayload(result);
}

export async function fetchFriendMessage(bot: number | string, friend: number | string, from: UnixTimestamp, to: UnixTimestamp) {
    let result = await getUrl<MessageListResponse>('/message/friend', {bot: bot, friend: friend, start: from, end: to});
    return extractPayload(result);
}

export async function fetchGroupMembers(group: number | string) {
    let result = await getUrl<GroupMemberListResponse>('/archive/member', {group: group});
    return extractPayload(result);
}
