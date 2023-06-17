export const V1_API_BASE = 'https://v1.toshort.video';

export const UPLOAD_API = `${V1_API_BASE}/editor/upload`;
export const REQUEST_ENCODE_API = `${V1_API_BASE}/editor/enqueue`;
export const ENCOING_STATUS_API = `${V1_API_BASE}/export`;

export const fetcher = (...args) => fetch(...args).then(res => res.json())