import moment from "moment";

export type UnixTimestamp = number;

export function toDateTime(x: UnixTimestamp) {
    return new Date(x * 1e3);
}

export function toMoment(x: UnixTimestamp) {
    return moment(x * 1e3);
}

export function nowUnix() {
    return Math.floor((new Date()).getTime() / 1e3);
}
