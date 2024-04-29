// 2.15 조건문과 비슷한 컨디셔널 타입이 있다.

// 컨디셔널 타입
// 조건에 따라 다른 타입이되는 타입

//특정 타입 extends 다른 타입 ? 참일 때 타입 : 거짓일 때 타입
type A1 = string;
type B1 = A1 extends string ? number : boolean;

type A2 = number;
type B2 = A2 extends string ? number : boolean;

// 명시적으로 extends 해야만 참이 되는 것이 아니다.
interface X {
  x: number;
}

interface XY {
  x: number;
  y: number;
}

interface YX extends X {
  y: number;
}

type A = XY extends X ? string : number;
type B = YX extends X ? string : number;

// 컨디셔널 타입은 타입 검사를 위해서도 많이 사용한다.
type Result = "hi" extends string ? true : false; // type Result = true
type Result2 = [1] extends [string] ? true : false; // type Result2 = false

// 컨디셔널 타입은 never와 함께 사용할 때도 많다.
// 타입이 string | number 이면 배열로 만들고,
// 그게 아니면 never로 만드는 코드
type Start = string | number;
type New = Start extends string | number ? Start[] : never;
let n: New = ["hi"];
n = [123];

// 단순한 상황에서는 never와 함께 쓸 이유 없다.
// 보통은 제네릭과 더불어 쓸 때만 never가 의미가 있다.
{
  type ChooseArray<A> = A extends string ? string[] : never;
  type StringArray = ChooseArray<string>;
  type Never = ChooseArray<number>;
}

// never는 모든 타입에 대입할 수 있기에 모든 타입을 extends 할 수 있다.
{
  type Result = never extends string ? true : false; // type Result = true
}

// 매핑된 객체 타입에서 키가 never이면 해당속성은 제거된다.
{
  type OmitByType<O, T> = {
    [K in keyof O as O[K] extends T ? never : K]: O[K];
  };

  /* 
  type Result = {
    name: string;
    age: number;
}
  */
  type Result = OmitByType<
    {
      name: string;
      age: number;
      married: boolean;
      rich: boolean;
    },
    boolean
  >;
}

// 컨디셔널 타입을 자바스크립트의 삼항연산자처럼 중첩해서 만들수도 있다.
{
  type ChooseArray<A> = A extends string
    ? string[]
    : A extends boolean
    ? boolean[]
    : never;

  type StringArray = ChooseArray<string>; // type StringArray = string[]
  type BooleanArray = ChooseArray<boolean>; // type BooleanArray = boolean[]
  type Never = ChooseArray<number>; // type Never = never
}

// 인덱스 접근 타입으로 컨디셔널 타입을 표현할 수도 있다.
{
  type A1 = string;
  type B1 = A1 extends string ? number : boolean; // type B1 = number
  type B2 = {
    t: number;
    f: boolean;
  }[A1 extends string ? "t" : "f"]; // type B2 = number
}
