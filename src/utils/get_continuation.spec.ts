import { getContinuation, _enc, _build, _header, _times } from './get_continuation';

xit('continuation', () => {
  console.log(_times(10));
  console.log(getContinuation('ABC_EFG_IJK', 10, true));
  fail();
});

it('_header', () => {
  expect(_header('ABC_EFG_IJK')).toBe('Cg8KDQoLQUJDX0VGR19JSksgAQ==');
});

it('_build', () => {
  const ts1 = 1546268400;
  const t = new Array(5).fill(0).map(() => ts1 * 1000000);
  const actual = _build('01234567890', t[0], t[1], t[2], t[3], t[4], false);
  const expected =
    '0ofMyAN1GhxDZzhLRFFvTE1ERXlNelExTmpjNE9UQWdBUT09KIC41tWqyt8CMAA4AEABShsIABAAGAAgADoAQABKAFCAuNbVqsrfAlgDeABQgLjW1arK3wJYgLjW1arK3wJoAYIBAggBiAEAmgECCACgAYC41tWqyt8C';
  expect(actual).toBe(expected);
});

describe('enc', () => {
  it('vn', () => {
    expect(_enc.vn(127)).toEqual([127]);
    expect(_enc.vn(128)).toEqual([128, 1]);
    expect(_enc.vn(129)).toEqual([129, 1]);
    expect(_enc.vn(256)).toEqual([128, 2]);
    expect(_enc.vn(257)).toEqual([129, 2]);
    expect(_enc.vn((1 << 3) | 1)).toEqual([9]);
    expect(_enc.vn((2 << 3) | 1)).toEqual([17]);
    expect(_enc.vn(1546268400000000)).toEqual([128, 184, 214, 213, 170, 202, 223, 2]);
  });
  it('tp', () => {
    expect(_enc.tp(1, 1, [127])).toEqual([9, 127]);
  });
  it('rs', () => {
    expect(_enc.rs(1, [127])).toEqual([10, 1, 127]);
    expect(_enc.rs(1, '')).toEqual([10, 0]);
    expect(_enc.rs(1, 'a')).toEqual([10, 1, 97]);
  });
  it('nm', () => {
    expect(_enc.nm(1, 1)).toEqual([8, 1]);
    expect(_enc.nm(2, 1)).toEqual([16, 1]);
    expect(_enc.nm(2, 2)).toEqual([16, 2]);
    expect(_enc.nm(10, 1546268400000000)).toEqual([80, 128, 184, 214, 213, 170, 202, 223, 2]);
  });
});
