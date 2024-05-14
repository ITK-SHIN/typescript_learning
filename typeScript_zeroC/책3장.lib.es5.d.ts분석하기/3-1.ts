// 기존 객체의 속성을 전부 옵셔널로 만드는 Partial 함수

// 1. My를 붙이지 않으면 lib.es5.d.ts의 선언과 중복되기 때문에 붙임

// ✅ Partial : 기존 객체의 속성을 전부 옵셔널로 만드는 함수
type MyPartial<T> = {
  [P in keyof T]?: T[P];
};

type Result = MyPartial<{ a: string; b: number }>;

//✅ Required : 모든 속성을 옵셔널이 아니게 만드는 함수
type MyRequired<T> = {
  [P in keyof T]-?: T[P];
};

type Result2 = MyRequired<{ a?: string; b?: number }>;

// ✅ Readonly : 모든 속성을 readonly로 만들기
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Result3 = MyReadonly<{ a: string; b: number }>;

// ✅ NotReadonly : 모든 속성을 readonly 가 아니게 만들기
type NotReadonly<T> = {
  -readonly [P in keyof T]: T[P];
};

type Result4 = NotReadonly<{ readonly a: string; b: number }>;

//✅ Pick : 객체에서 지정한 속성만 추리기
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type Result5 = MyPick<{ a: string; b: number; c: number }, "a" | "c">;
// type Result5_1 = MyPick<{ a: string; b: number; c: number }, "a" | "c" | "d">; // error

// ✅ 'a' | 'c' | 'd' 중에서 'd' 처럼 객체의 속성이 아닌 경우는 무시하고, 나머지 'a' |'c' 속성만 추리기
type MyPick2<T, K> = {
  [P in K extends keyof T ? K : never]: T[P];
};

type Result6 = MyPick2<{ a: string; b: number; c: number }, "a" | "c" | "d">;
type Result6_1 = MyPick2<{ a: string; b: number; c: number }, "d">;
const result6: Result6_1 = { a: "이게되네?", b: true };

// ✅ Record : 모든 속성의 타입이 동일한 객체 타입
type MyRecord<K extends keyof any, T> = {
  [P in K]: T;
};

type Result7 = MyRecord<"a" | "b", string>;
