// 2.22 : infer로 타입스크립트의 추론을 직접 활용하자

// 배열이 있을 때 배열의 요소 타입을 얻어내고 싶은 상황
//1. ts에 추론을 맡기고 싶은 부분을 'infer 타입_변수' 로 표시하면 된다.
type El<T> = T extends (infer E)[] ? E : never;
type Str = El<string[]>;
type NumOrBool = El<(number | boolean)[]>;

// 2. 컨디셔널 타입에서 타입 변수는 참 부분에서만 쓸 수 있다.
// 거짓부분에서 사용하려고 하면 에러 발생
{
  type El<T> = T extends (infer E)[] ? never : E;
}

// 3. ts는 많은 부분을 스스로 추론할 수 있다. 추론하려는 부분을  infer로 만들면 된다.

// 3-1. 매개변수 추론
type MyParameters<T> = T extends (...args: infer P) => any ? P : never;

type P = MyParameters<(a: string, b: number) => string>;

// 3-2. 생성자 매개변수 추론
type MyConstructorParameters<T> = T extends abstract new (
  ...args: infer P
) => any
  ? P
  : never;

type CP = MyConstructorParameters<new (a: string, b: number) => {}>;

// 3-3. 반환값 추론
type MyReturnType<T> = T extends (...args: any) => infer R ? R : any;

type R = MyReturnType<(a: string, b: number) => string>;

// 3-4. 인스턴스 타입 추론
type MyInstanceType<T> = T extends abstract new (...args: any) => infer R
  ? R
  : any;

type I = MyInstanceType<new (a: string, b: number) => {}>;

/* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/

// 4. 서로 다른 타입 변수를 여러 개 동시에 사용할 수도 있다.
type MyPAndR<T> = T extends (...args: infer P) => infer R ? [P, R] : never;

type PR = MyPAndR<(a: string, b: number) => string>;

/* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */

//5. 같은 타입 변수를 여러 곳에 사용할 수도 있다.
type Union<T> = T extends { a: infer U; b: infer U } ? U : never;
type Result1 = Union<{ a: 1 | 2; b: 2 | 3 }>; //type Result1 = 1 | 2 | 3 -> 같은 이름의 타입변수는 서로 유니언이 된다.

type Intersection<T> = T extends {
  a: (pa: infer U) => void;
  b: (pb: infer U) => void;
}
  ? U
  : never;

type Result2 = Intersection<{ a(pa: 1 | 2): void; b(pb: 2 | 3): void }>; // type Result2 = 2 -> 매개변수는 반공변성이므로 인터섹션이 된다.

// 같은 타입 변수 중 하나가 매개변수고, 하나가 반환값이면?
type ReturnAndParam<T> = T extends {
  a: () => infer U;
  b: (pb: infer U) => void;
}
  ? U
  : never;

// 반환값의 타입이 매개변수의 타입의 부분집합인 경우에만 그 둘의 교집합이 된다.
// 그 외는 모두 never가 된다.
type Result3 = ReturnAndParam<{ a: () => 1 | 2; b(pb: 1 | 2 | 3): void }>; // type Result3 = 1 | 2

type REsult4 = ReturnAndParam<{ a: () => 1; b(pb: 2 | 3): void }>; // type REsult4 = never

// 매개변수에 같은 타입 변수를 선언하면 인터섹션이 된다는 사실을 바탕으로 유니언을 인터섹션으로 만드는 타입을 작성할 수 있다.
type UnionToIntersection<U> = (U extends any ? (p: U) => void : never) extends (
  p: infer I
) => void
  ? I
  : never;

type Result5 = UnionToIntersection<{ a: number } | { b: string }>;
type Result6 = UnionToIntersection<boolean | true>;
