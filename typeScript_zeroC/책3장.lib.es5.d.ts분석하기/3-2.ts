// 3.2 : Exclude, Extract, Omit, NonNullable

//👉 모두 분배법칙을 활용하는 타입들

// ✅ Exclude : 어떠한 타입에서 지정한 타입을 제거하는 타입
type MyExclude<T, U> = T extends U ? never : T;
type Result = MyExclude<1 | "2" | 3, string>; // type Result = 1 | 3

// ✅ Extract : 어떠한 타입에서 지정한 타입만 추출하는 타입
type MyExtract<T, U> = T extends U ? T : never;
type Result2 = MyExtract<1 | "2" | 3, string>; // type Result2 = "2"

/* //✅ Pick : 객체에서 지정한 속성만 추리기
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
 */

// ✅ Omit : 특정 객체에서 지정한 속성을 제거하는 타입
type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
type Result3 = MyOmit<{ a: "1"; b: 2; c: true }, "a" | "c">;

// ✅ NonNullable : 타입에서 null , undefined를 제거하는 타입
// 예전버전
type MyNonNullable_v0<T> = T extends null | undefined ? never : T;
type Result4 = MyNonNullable<string | number | null | undefined>;

// 최근 버전
type MyNonNullable<T> = T & {};
type Result5 = MyNonNullable<string | number | null | undefined>;

//✅ Optional 타입 : 일부 속성만 옵셔널로 만드는 타입 (lib.es5.d.ts 에 있는 타입 아님)
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type Result6 = Optional<{ a: "hi"; b: 123 }, "a">;

const test6: Result6 = { a: "hi", b: 123 };
