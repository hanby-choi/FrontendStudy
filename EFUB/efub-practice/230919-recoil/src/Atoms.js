// Atoms.js
import { atom } from 'recoil';

const countState = atom({
  key: 'counter',
  default: 0,
});

const inputState = atom({
  // 기존에서 추가된 아톰
  key: 'input',
  default: 0,
});

export { countState, inputState };
