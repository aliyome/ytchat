import { create } from './core';

describe('create', () => {
  describe('valid videoId', () => {
    const chat = create('uIx8l2xlYVY', {});
    it('chat is alive', () => {
      expect(chat.isAlive).toBeTruthy();
    });
  });
});
