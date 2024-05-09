// 2.24: 자기 자신을 타입으로 사용하는 재귀 타입이 있다.

// 피보나치 수열을 계산하는 재귀함수
//javascript
function fibonacci(num: number): number {
  if (num <= 1) return 1;

  return fibonacci(num - 1) + fibonacci(num - 2);
}

// typescript
// 자기 자신을 타입으로 다시 사용하는 타입을 재귀 타입이라고 부른다.
type Recursive = {
  name: string;
  children: Recursive[];
};

const recur1: Recursive = {
  name: "test",
  children: [],
};

const recur3: Recursive = {
  name: "test",
  children: [
    { name: "test2", children: [] },
    { name: "test3", children: [] },
  ],
};

// 컨디셔널 타입에서도 사용할 수 있다.
type ElementType<T> = T extends any[] ? ElementType<T[number]> : T;

// 타입 인수로 사용하는 것은 불가능하다.
type T = number | string | Record<string, T>;

// 타입 인수를 쓰지 않는 방식으로 수정해야 한다.
type A = number | string | { [key: string]: A };

// 재귀 타입을 선언할 떄 에러가 발생하기보다는 재귀 타입을 사용할 때 에러가 발생한다.
type InfiniteRecur<T> = { item: InfiniteRecur<T> };
type Unwrap<T> = T extends { item: infer U } ? Unwrap<U> : T;
type Result = Unwrap<InfiniteRecur<any>>;

// JSON 타입 만들어보기
type JSONType =
  | string
  | boolean
  | number
  | null
  | JSONType[]
  | { [key: string]: JSONType };

const a: JSONType = "string";
const b: JSONType = [1, false, { hi: "json" }];
const c: JSONType = {
  prop: null,
  arr: [{}],
};

// [1,2,3] -> [3,2,1] 로 만들기
type Reverse<T> = T extends [...infer L, infer R] ? [R, ...Reverse<L>] : [];

// Reverse 타입으로 함수의 매개변수 순서를 바꾸는 타입 만들기
type FlipArguments<T> = T extends (...args: infer A) => infer R
  ? (...args: Reverse<A>) => R
  : never;

type Flipped = FlipArguments<(a: string, b: number, c: boolean) => string>;
