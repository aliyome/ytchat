import { Buffer } from 'buffer';
import { ValueError } from './exception';

const ALL_CHAT = 1;
const TOP_CHAT_ONLY = 4;

export const _header = (videoId: string): string => {
  return Buffer.from(rs(1, rs(1, rs(1, videoId))).concat(nm(4, 1))).toString('base64');
};

export const _build = (
  videoId: string,
  ts1: number,
  ts2: number,
  ts3: number,
  ts4: number,
  ts5: number,
  topChatOnly: boolean,
): string => {
  const chatType = topChatOnly ? TOP_CHAT_ONLY : ALL_CHAT;

  const b1 = nm(1, 0);
  const b2 = nm(2, 0);
  const b3 = nm(3, 0);
  const b4 = nm(4, 0);
  const b7 = rs(7, '');
  const b8 = nm(8, 0);
  const b9 = rs(9, '');
  const timestamp2 = nm(10, ts2);
  const b11 = nm(11, 3);
  const b15 = nm(15, 0);

  const header = rs(3, _header(videoId));
  const timestamp1 = nm(5, ts1);
  const s6 = nm(6, 0);
  const s7 = nm(7, 0);
  const s8 = nm(8, 1);
  const body = rs(
    9,
    b1
      .concat(b2)
      .concat(b3)
      .concat(b4)
      .concat(b7)
      .concat(b8)
      .concat(b9)
      .concat(timestamp2)
      .concat(b11)
      .concat(b15),
  );
  const timestamp3 = nm(10, ts3);
  const timestamp4 = nm(11, ts4);
  const s13 = nm(13, chatType);
  const ch = rs(16, nm(1, chatType));
  const s17 = nm(17, 0);
  const str19 = rs(19, nm(1, 0));
  const timestamp5 = nm(20, ts5);
  const entity = header
    .concat(timestamp1)
    .concat(s6)
    .concat(s7)
    .concat(s8)
    .concat(body)
    .concat(timestamp3)
    .concat(timestamp4)
    .concat(s13)
    .concat(ch)
    .concat(s17)
    .concat(str19)
    .concat(timestamp5);
  const continuation = rs(119693434, entity);
  return `${Buffer.from(continuation).toString('base64')}`;
};

const getRandom = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const _times = (past_sec: number) => {
  const n = Math.floor(Date.now() / 1000);
  const _ts1 = n - getRandom(0, 1 * 3);
  const _ts2 = n - getRandom(0.01, 0.99);
  const _ts3 = n - past_sec + getRandom(0, 1);
  const _ts4 = n - getRandom(10 * 60, 60 * 60);
  const _ts5 = n - getRandom(0.01, 0.99);
  return [_ts1, _ts2, _ts3, _ts4, _ts5].map((x) => Math.floor(x * 1000000));
};

export const getContinuation = (videoId: string, pastSec: number, topChatOnly: boolean): string => {
  const [t1, t2, t3, t4, t5] = _times(pastSec);
  return _build(videoId, t1, t2, t3, t4, t5, topChatOnly);
};

const vn = (val: number): number[] => {
  if (val < 0) {
    throw new ValueError();
  }
  let big = BigInt(val);
  const buf = [];
  while (big >> 7n) {
    const m = (big & 0xffn) | 0x80n;
    buf.push(Number(m));
    big >>= 7n;
  }
  buf.push(Number(big));
  return buf;
};

const tp = (a: number, b: number, ary: number[]) => {
  return vn((b << 3) | a).concat(ary);
};

const rs = (a: number, ary: number[] | string) => {
  if (typeof ary === 'string') {
    ary = Array.from(Buffer.from(ary).values());
  }
  return tp(2, a, vn(ary.length).concat(ary));
};

const nm = (a: number, b: number) => {
  return tp(0, a, vn(b));
};

export const _enc = { vn, tp, rs, nm };
