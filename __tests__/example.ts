import { create } from '../src';

describe('fetch chat data', () => {
  it('chat is alive', () => {
    const chat = create('uIx8l2xlYVY');
    expect(chat.isAlive()).toBeTruthy();
  });
});
