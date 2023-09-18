import { countState, inputState } from './Atoms'; // 새로 변경된 코드
import countStateSelector from './Selector'; // 새로 추가된 코드
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
} from 'recoil';

const Counter = () => {
  const [counter, setCounter] = useRecoilState(countState);
  const currentCount = useRecoilValue(countState);

  const counterHandler = useSetRecoilState(countState);
  const resetCounter = useResetRecoilState(countState);

  const plusCount = () => {
    counterHandler((pre) => pre + 1);
  };
  const minusCount = () => {
    counterHandler((pre) => pre - 1);
  };

  const currentInput = useRecoilValue(inputState);
  const inputHandlerState = useSetRecoilState(inputState);
  const resultValue = useRecoilValue(countStateSelector);

  const inputHandler = (e) => {
    let target = e.target.value;
    inputHandlerState(target);
  };
  const submitCount = () => counterHandler((pre) => pre + Number(currentInput));

  return (
    <div>
      <div>
        <div>{currentCount}</div>
      </div>
      <button onClick={plusCount}>+</button>
      <button onClick={minusCount}>-</button>
      <button onClick={resetCounter}>reset</button>
      <div>
        <input type="text" onChange={inputHandler}></input>
        <button onClick={submitCount}>입력값 더하기</button>
        <div>{resultValue}</div>
      </div>
    </div>
  );
};

export default Counter;
