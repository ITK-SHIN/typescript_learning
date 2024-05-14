// 3.2 : Exclude, Extract, Omit, NonNullable

//👉 모두 분배법칙을 활용하는 타입들

// ✅ Exclude : 어떠한 타입에서 지정한 타입을 제거하는 타입
type MyExclude<T, U> = T extends U ? never : T;
type Result = MyExclude<1 | "2" | 3, string>; // type Result = 1 | 3

// ✅ Extract : 어떠한 타입에서 지정한 타입만 추출하는 타입
type MyExtract<T, U> = T extends U ? T : never;
type Result2 = MyExtract<1 | "2" | 3, string>; // type Result2 = "2"

// ✅ Omit : 특정 객체에서 지정한 속성을 제거하는 타입
type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
type Result3 = MyOmit<{ a: "1"; b: 2; c: true }>;

// ✅ NonNullable : 타입에서 null , undefined를 제거하는 타입
