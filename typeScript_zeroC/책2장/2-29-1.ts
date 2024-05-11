//2.29: 배운 것을 바탕으로 타입 만들기

// 2.29.1 : 판단하는 타입 만들기

// never인지 판단하는 타입
type IsNever<T> = [T] extends [never] ? true : false;

// any인지 판단하는 타입

type IsAny<T> = string extends number & T ? true : false;
{
  //예시코드
  type TestAny = IsAny<any>; // true
  type TestString = IsAny<string>; // false
  type TestNumber = IsAny<number>; // false
  type TestBoolean = IsAny<boolean>; // false
  type TestUndefined = IsAny<undefined>; // false
  type TestNull = IsAny<null>; // false
  type TestObject = IsAny<object>; // false
  type TestNever = IsAny<never>; // false

  type Test = number & any;
}

// 배열인지 판단하는 IsArray 타입
type IsArray<T> = IsNever<T> extends true
  ? false
  : T extends readonly unknown[]
  ? IsAny<T> extends true
    ? false
    : true
  : false;

// 1. never일 경우 false 반환 후 종료
// 2. readonly unknown[]일 경우 false 반환 후 종료
// 3. 1,2 둘 다 아니면서 any<T> 가 true일 경우 true 반환

// 예시 사용
type TestArray = IsArray<number[]>; // true
type TestReadonlyArray = IsArray<readonly number[]>; // true
type TestNotArray = IsArray<number>; // false
type TestString = IsArray<string>; // false
type TestAny = IsArray<any>; // false
type TestNever = IsArray<never>; // false
type TestObject = IsArray<object>; // false

// 배열 중에서 튜플만 판단하기
// 튜플이 아닌 배열은 false
type IsTuple<T> = IsNever<T> extends true
  ? false
  : T extends readonly unknown[]
  ? number extends T["length"]
    ? false
    : true
  : false;

// 1. never일 경우, false 반환
// 2. (읽기전용 포함) 배열이 아닐 경우 false 반환
// 3. (읽기전용 포함) 배열이면서, length 프로퍼티가 number일 경우 false 반환

// any는 number extends T['length']에서 걸러진다.
// any['length'] 는 any 이므로 number extends any는 true가 된다.

// 유니언인지 판단하는 타입
type IsUnion<T, U = T> = IsNever<T> extends true
  ? false
  : T extends T
  ? [U] extends [T]
    ? false
    : true
  : false;

// 1. never일 경우, true 반환
// 2.

// 사용 예시
type UnionTest1 = IsUnion<string | number>;
type UnionTest2 = IsUnion<string>;
