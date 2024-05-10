//2.29: 배운 것을 바탕으로 타입 만들기

// 2.29.1 : 판단하는 타입 만들기

// never인지 판단하는 타입
type IsNever<T> = [T] extends [never] ? true : false;

// any인지 판단하는 타입
type IsAny<T> = string extends number & T ? true : false;

type test = number | any;

// 배열인지 판단하는 IsArray 타입
type IsArray<T> = IsNever<T> extends true
  ? false
  : T extends readonly unknown[]
  ? IsAny<T> extends true
    ? false
    : true
  : false;
