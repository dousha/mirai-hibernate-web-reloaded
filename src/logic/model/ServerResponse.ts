export interface SimpleServerResponse {
    code: number;
    msg: string;
}

export interface ServerResponse<T extends object> extends SimpleServerResponse {
    data: T;
}

export function extractPayload<T extends object>(x: ServerResponse<T>): T {
    if (x.code !== 0) {
        throw new Error(`cannot extract payload, error code was ${x.code} with message ${x.msg}`);
    }

    return x.data;
}
