import axios from "axios";
import {BotListEntry, BotListResponse} from "./model/BotListResponse";
import {extractPayload} from "./model/ServerResponse";
import {GroupListResponse} from "./model/GroupListResponse";
import {FriendListResponse} from "./model/FriendListResponse";
import {UnixTimestamp} from "./model/UnixTimestamp";
import {MessageListResponse} from "./model/MessageListResponse";
import {GroupMemberListResponse} from "./model/GroupMemberListResponse";

const cachedBots: BotListEntry[] = [];

export function getAvatarUrl(x: number | string, size: number = 140) {
    return `http://q1.qlogo.cn/g?b=qq&nk=${x}&s=${size}`;
}

export function getGroupAvatarUrl(x: number | string, size: number = 140) {
    return `http://p.qlogo.cn/gh/${x}/${x}/${size}`;
}

export function getImageUrl(fromId: number, targetId: number, imageId: string, isFlashImage = false) {
    if (imageId[0] === '/') {
        return `http://c2cpicdw.qpic.cn/offpic_new/${fromId}${imageId}/0?term=${isFlashImage ? 2 : 3}`;
    }

    let match = imageId.substring(1, 37).replaceAll("-", "");
    return `https://gchat.qpic.cn/gchatpic_new/${fromId}/${targetId}-0-${match}/0?term=${isFlashImage ? 2 : 3}`;
}

export function getMarketFaceUrl(delegate: {faceId: Array<number>, tabId: number}) {
    let md5 = delegate.faceId.map(x => x < 0 ? 256 + x : x).map(x => x.toString(16).padStart(2, '0')).join('');
    let type = delegate.tabId < 10_0000 ? `200x200.png` : `raw300.gif`;

    return `https://gxh.vip.qq.com/club/item/parcel/item/${md5.substring(0, 2)}/${md5}/${type}`;
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
