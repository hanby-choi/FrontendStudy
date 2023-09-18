# Redux-toolkit

## Redux

- 어플리케이션의 state 관리를 위한 오픈 소스 JS 상태 관리 라이브러리

### Redux 형제들

- Redux: react랑 무관, createStore/Subscribe/getState/dispatch
- React Redux: React와 Redux 통합, Connect/useDispatch/useSelector
- Redux toolkit: 더 편하게 사용, configureStore/createSlice/createAsyncThunk

### 순수 Redux 개념 복습

- Action - Action Creator - Dispatch - Store - Reducer - Subscribe
- Action: 상태에 변화를 주기 위한 **객체**
    - 반드시 type 필드를 가짐 / 그 외 필드는 자유
- Action Creator(액션 함수): **액션을 만들어주는 함수**
    - State가 변할 때마다 액션 객체를 만드는 것은 번거로움 → 함수로 관리
- Dispatch: **리듀서를 실행**시키는 스토어 내장 함수 - 액션 발생
    - **인자로 액션 객체**를 받아 호출
    - Dispatch → 리듀서 함수 실행 → 새로운 상태 반환
- Reducer: 상태에 변화를 일으키는 함수 (**액션을 통해 새로운 상태를 반환**하는 함수)
    - (현재 상태, 액션 객체) ⇒ 새로운 상태
- Store: state가 관리되는 단 하나의 공간
    - 앱 내에 하나의 store만 존재
    - 현재 state, 리듀서, 내장 함수 등을 관리
- Subscribe: 스토어의 상태 값을 반환
    - state가 변화됐을 때 바로 가져와 사용
    - 보통 Connect 또는 useSelector Hook을 대신 사용

### React-Redux의 불편함

- 번거로운 설정, 미들웨어 설치(비동기 작업을 위해), 반복되는 코드, 불변성 유지 어려움

→ RTK 등장 

### 카운터 만들기 실습 - Redux

- 리듀서 함수 생성 - 초기값 설정 - Store 만들기 - Provider로 store 전역적으로 뿌리기 - useSelector로 state 조회 - dispatch로 액션 발생시키기 - 리듀서 수정 (불변성 유지 중요)

### 실습 코드

```jsx
import React from 'react';
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

function reducer(state, action){ // 리듀서 함수 
	if (action.type === 'up'){
		return {...state, value: state.value + action.step} // 불변성 유지를 위해 스프레드 연산자 사용, 새 상태 반환
	}
	return state;
}

const initialState = { value: 0 }; // state 초기값 설정

const store = createStore(reducer, initialState); // 스토어 생성(리듀서, 초기 상태)

function Counter(){ // 렌더링할 Counter 컴포넌트 
	const dispatch = useDispatch(); // 리듀서를 실행할 디스패치 함수
	const count = useSelector((state) => state.value); // store에서 state 구독
	
	return (
		<div>
			<button 
				onClick={() => {
					dispatch({type: 'up', step: 2});
				}}
			>
				+
			</button>{' '}
			{count}
		</div>
	);
}

function App(){
	return (
		<Provider store={store}>
			<Counter/>
		</Provider>
	);
}

export default App;
```

## Redux-toolkit (RTK)

- 설치 명령어 `npm install @reduxjs/toolkit`

### RTK 구조

- 작은 스토어(슬라이스)를 모아 하나의 큰 스토어로 알아서 합쳐줌    
- **createSlice**: name, initialState, reducers를 포함하는 객체를 인수로 받아 **slice 생성**
    - name: slice 이름 / initialState: 초기값 / reducers: 액션 타입별 상태 변화 정의
    - 불변성 신경쓰지 않아도 알아서 처리해줌
- **configureStore**: reducer를 포함하는 객체를 인수로 받아 **스토어 생성**
    - reducer: 각 슬라이스들의 리듀서를 하나로 묶어줌
- **useSelector**: state 조회
- **dispatch**: 액션 타입을 “**슬라이스 이름/타입 이름**”으로 하여 액션 보내기
    - 해당 슬라이스에 속한 리듀서에서 타입명과 일치하는 함수 실행
- **action** **creator**: reducer 함수를 참고해 자동으로 액션을 만들어주는 함수
    - 슬라이스 이름.actions.타입 이름(인자) 형태로 dispatch 인수로서 사용
    - payload에 action 필드를 담아 전달

### 카운터 만들기 실습 - RTK 개선 코드

### 실습 코드

- counterSlice.js
    
    ```jsx
    import { createSlice } from '@reduxjs/toolkit';
    const counterSlice = createSlice({
    	name: 'counterSlice',
    	initialState: {value: 0},
    	reducers: {
    		up: (state, action) => {
    			state.value = state.value + action.payload;
    		},
    	},
    });
    export default counterSlice;
    ```
    
- store.js
    
    ```jsx
    import { configureStore } from '@reduxjs/toolkit';
    import counterSlice from './counterSlice';
    
    const store = configureStore({
    	reducer: {
    		counter: counterSlice.reducer, // counterSlice의 여러 리듀서를 자동으로 하나의 리듀서로 합침
    	},
    });
    export default store
    ```
    
- App.js
    
    ```jsx
    import React from 'react';
    import { Provider, useSelector, useDispatch } from 'react-redux';
    import store from './store';
    import counterSlice from './counterSlice';
    
    const store = createStore(reducer, initialState); // 스토어 생성(리듀서, 초기 상태)
    
    function Counter(){ // 렌더링할 Counter 컴포넌트 
    	const dispatch = useDispatch(); // 리듀서를 실행할 디스패치 함수
    	const count = useSelector((state) => state.counter.value); // counter라는 리듀서에서 value 조회
    	
    	return (
    		<div>
    			<button 
    				onClick={() => {
    					dispatch(counterSlice.actions.up(2));
    				}}
    			>
    				+
    			</button>{' '}
    			{count}
    		</div>
    	);
    }
    
    function App(){
    	return (
    		<Provider store={store}>
    			<Counter/>
    		</Provider>
    	);
    }
    
    export default App;
    ```
    

# Redux-thunk

## Redux-thunk란?
- Redux에서 비동기 작업을 처리할 때 사용하는 **미들웨어**
    - 액션 객체가 아닌 함수를 디스패치 할 수 있음
- 미들웨어: 리듀서가 **액션을 처리하기 전에 실행되는 함수** - 액션과 리듀서 사이 중간자
- 리덕스 미들웨어 라이브러리: redux-thunk, redux-saga, redux-observable, redux-promise-middleware 등 존재

## 비동기 작업을 추가하여 카운터 예제 수정하기

- 다른 서버에서 data를 가져와 count state에 반영하기
- 서버의 비동기 로직 상태를 나타내는 status state 추가하기 (initialState 수정)
- set 리듀서를 추가하여 count value를 payload로 변경
- 비동기 작업 처리를 위해 asyncUpFetch 함수 만들어 이벤트 핸들러로 사용

### CreateAsyncThunk

- **createAsyncThunk**: **비동기 작업 처리하는 액션**을 생성
    - 첫 번째 인자: 액션의 타입 문자열
    - 두 번째 인자: 비동기 로직 (프로미스 반환하는 **비동기 함수**)
    - Pending(시작)/Fulfilled(끝)/Rejected(요청 실패)의 3가지 상태를 가짐
        
        → 3가지 상태 별로 리듀서가 필요 - 각각 작성해서 **extraReducers** 안에 넣기
        
- reducers vs extraReducers
    - reducers: 동기적 작업 - action creater를 RTK가 자동으로 만들어줌
    - extraReducers: 비동기적 작업

### 수정한 실습 코드

- counterSlice.js
    
    ```jsx
    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
    
    export const asyncUpFetch = createAsyncThunk(
      'counterSlice/asyncUpFetch',
      async () => {
        const resp = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await resp.json();
        return data.length;
      }
    );
    
    const counterSlice = createSlice({
      name: 'counter',
      initialState: { value: 0, status: 'Welcome' }, // status state 추가 
      reducers: {
        up: (state, action) => {
          state.value = state.value + action.payload;
        },
        set: (state, action) => { // set reducer 추가
          state.value = action.payload;
        },
      },
      extraReducers: (builder) => { // 비동기 작업 처리하는 리듀서 
        builder.addCase(asyncUpFetch.pending, (state, action) => {
          state.status = 'Loading';
        });
        builder.addCase(asyncUpFetch.fulfilled, (state, action) => {
          state.value = action.payload;
          state.status = 'complete';
        });
        builder.addCase(asyncUpFetch.rejected, (state, action) => {
          state.status = 'fail';
        });
      },
    });
    
    export default counterSlice;
    ```
    
- store.js
    
    ```jsx
    import { configureStore } from '@reduxjs/toolkit';
    import counterSlice from './counterSlice';
    
    const store = configureStore({
    	reducer: {
    		counter: counterSlice.reducer, // counterSlice의 여러 리듀서를 자동으로 하나의 리듀서로 합침
    	},
    });
    export default store
    ```
    
- App.js
    
    ```jsx
    import React from 'react';
    import { Provider, useSelector, useDispatch } from 'react-redux';
    import store from './store';
    import counterSlice from './counterSlice';
    import { asyncUpFetch } from './counterSlice';
    
    function Counter(){ // 렌더링할 Counter 컴포넌트 
    	const dispatch = useDispatch(); // 리듀서를 실행할 디스패치 함수
    	const count = useSelector((state) => state.counter.value); // counter라는 리듀서에서 value 조회
    	const status = useSelctor((state) => {
    		return state.counter.status;
    	});
    	return (
    		<div>
    			<button 
    				onClick={() => {
    					dispatch(counterSlice.actions.up(2));
    				}}
    			>
    				+
    			</button>
    			<button 
    				onClick={() => {
    					dispatch(asyncUpFetch());
    				}}
    			>
    				+ async fetch
    			</button>
    			<div>
    				{count} | {status}
    			</div>
    		</div>
    	);
    }
    
    function App(){
    	return (
    		<Provider store={store}>
    			<Counter/>
    		</Provider>
    	);
    }
    
    export default App;
    ```
    

# Redux-persist

- 새로고침 시 state 유지 불가 - localstorage 또는 session에 상태를 간편하게 저장하고 싶음
    
    → Redux-persist 사용
    

## Redux-persist

- 설치 명령어: `npm install redux-persist`
- **combineReducers**: 여러 개의 리듀서가 있는 경우 하나의 루트 리듀서로 결합하는 함수
- **persistConfig**: state를 어떻게 저장할 것인지 지정하는 객체
    - 다음과 같은 속성을 가짐
        - **key**: 상태가 로컬에 저장될 때 사용되는 키 - 보통 ‘root’
        - **storage**: 상태가 저장될 스토리지 엔진 지정 (로컬 스토리지 vs 세션 스토리지)
        - **whitelist**: 상태를 저장할(유지할) 슬라이스 지정
        - blacklist: 제외할 슬라이스
- **persistReducer**: redux persist를 적용한 새로운 루트 리듀서 **persistedReducer** 생성
- **configureStore**: 최종적으로 완성된 스토어 설정
    - reducer 옵션에 persistedReducer를 전달하여 redux persist가 적용된 스토어 생성

→ RTK의 createSlice-configureStore에 combineReducers, persistReducer가 추가됨 

## Redux-persist를 사용하여 카운터 예제 수정하기

- **store.js**: storage 가져오기 - 여러 슬라이스의 리듀서 묶기(combineReducers) - persistedReducer 만들기
- **App.js**: 최종 store 생성 - PersistGate를 이용해 스토어 전역으로 뿌리기
    - PersistGate의 loading 속성: redux 상태가 로드되기 전 보여줄 UI
- 개발자 도구 - Application - local storage에서 저장된 모습 확인 가능

### 수정한 실습 코드

- counterSlice.js
    
    ```jsx
    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
    
    export const asyncUpFetch = createAsyncThunk(
      'counterSlice/asyncUpFetch',
      async () => {
        const resp = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await resp.json();
        return data.length;
      }
    );
    
    const counterSlice = createSlice({
      name: 'counter',
      initialState: { value: 0, status: 'Welcome' }, // status state 추가 
      reducers: {
        up: (state, action) => {
          state.value = state.value + action.payload;
        },
        set: (state, action) => { // set reducer 추가
          state.value = action.payload;
        },
      },
      extraReducers: (builder) => { // 비동기 작업 처리하는 리듀서 
        builder.addCase(asyncUpFetch.pending, (state, action) => {
          state.status = 'Loading';
        });
        builder.addCase(asyncUpFetch.fulfilled, (state, action) => {
          state.value = action.payload;
          state.status = 'complete';
        });
        builder.addCase(asyncUpFetch.rejected, (state, action) => {
          state.status = 'fail';
        });
      },
    });
    
    export default counterSlice;
    ```
    
- store.js
    
    ```jsx
    import { combineReducers, configureStore } from '@reduxjs/toolkit';
    import counterSlice from './counterSlice';
    
    import { persistReducer } from 'redux-persist';
    import storage from 'redux-persist/lib/storage';
    
    const reducers = combineReducers({
      counter: counterSlice.reducer,
    });
    
    const persistConfig = {
      key: 'root',
      storage,
      whitelist: ['counter'],
      // blacklist: []
    };
    
    const persistedReducer = persistReducer(persistConfig, reducers);
    
    const store = configureStore({
      reducer: persistedReducer,
    });
    
    export default store;
    ```
    
- App.js
    
    ```jsx
    import React from 'react';
    import { Provider, useSelector, useDispatch } from 'react-redux';
    import store from './store';
    import counterSlice from './counterSlice';
    import { asyncUpFetch } from './counterSlice';
    import { PersistGate } from 'redux-persist/integration/react';
    import { persistStore } from 'redux-persist';
    
    let persistor = persistStore(store);
    
    function Counter(){ // 렌더링할 Counter 컴포넌트 
    	const dispatch = useDispatch(); // 리듀서를 실행할 디스패치 함수
    	const count = useSelector((state) => state.counter.value); // counter라는 리듀서에서 value 조회
    	const status = useSelctor((state) => {
    		return state.counter.status;
    	});
    	return (
    		<div>
    			<button 
    				onClick={() => {
    					dispatch(counterSlice.actions.up(2));
    				}}
    			>
    				+
    			</button>
    			<button 
    				onClick={() => {
    					dispatch(asyncUpFetch());
    				}}
    			>
    				+ async fetch
    			</button>
    			<div>
    				{count} | {status}
    			</div>
    		</div>
    	);
    }
    
    function App(){
    	return (
    		<Provider store={store}>
    			<PersistGate loading={null} persistor={persistor}>
    				<Counter/>
    			<PersistGate>
    		</Provider>
    	);
    }
    
    export default App;
    ```
