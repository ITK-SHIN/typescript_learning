// 2.29.2. 집합 관련 타입 만들기
// 전체 집합 unknown
// 공집합 never
// 합집합 |
// 교집합 &

//차집합 만들기
type Diff<A, B> = Omit<A & B, keyof B>;
type R1 = Diff<
  { name: string; age: number },
  { name: string; married: boolean }
>;

// Omit 타입 : 특정 객체에서 지정한 속성을 제거하는 타입 (3.2 절에서 구현원리)
/* 
 A & B 는 {name: string , age: number, married: boolean}
 keyof B 는 name | married
 따라서 name과 married 속성을 제거하면 age 속성만 남게된다.
*/

// 대칭 차집합
// 객체에만 적용 가능 ,  유니언 적용X
type SymDiff<A, B> = Omit<A & B, keyof (A | B)>;
type R2 = SymDiff<
  { name: string; age: number },
  { name: string; married: boolean }
>;

type test<A, B> = keyof (A & B);
type testObj = test<
  { name: string; age: number },
  { name: string; married: boolean }
>;

// 유니언 적용 O
type SymDiffUnion<A, B> = Exclude<A | B, A & B>;

type R3 = SymDiffUnion<1 | 2 | 3, 2 | 3 | 4>;
type R4 = SymDiff<1 | 2 | 3, 2 | 3 | 4>;

// Exclude - 3.2절에서 자세히
// 어떤 타입 (A | B) 에서 다른 타입 (A & B) 을 제거하는 타입
{
  type IsSubset<A, B> = A extends B ? true : false;
  type R1 = IsSubset<string, string | number>;
  type R2 = IsSubset<{ name: string; age: number }, { name: string }>;
  type R3 = IsSubset<symbol, unknown>;
}

/* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */
// Equal
// 두 타입이 동일하다는 것 판단하기
// A가 B의 부분집하이고, B도 A의 부분집합이면 -> 집합 A 와 B는 동일하다.
type Equal<A, B> = A extends B ? (B extends A ? true : false) : false;

{
  // true 예상하지만, 그렇지 않은 사례
  type R1 = Equal<boolean, true | false>;
  type R2 = Equal<never, never>;
}

// 이 타입은 any 와 다른 타입을 구별하지는 못한다.
type Equal2<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;
{
  type R3 = Equal2<any, 1>;
  type R4 = Equal2<[any], [number]>;
}

// any와 다른 타입 구별하도록 하기
type Equal3<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

/* 
(<T>()⇒T extends X ? 1:2) 타입을 
(<T>()⇒ T extends Y ? 1:2) 타입에 대입 할 수 있는지 묻는것
*/

{
  type R5 = Equal3<any, 1>;
  type R6 = Equal3<{ x: 1 } & { y: 2 }, { x: 1; y: 2 }>;
  type R7 = Equal3<any, unknown>;
}
/* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */
// NotEqual
// Equal과는 반대로 해당 타입이 아닌지 판단하는 타입
type NotEqual<X, Y> = Equal<X, Y> extends true ? false : true;

{
  type NR1 = NotEqual<any, any>;
  type NR2 = NotEqual<any, 1>;
  type NR3 = NotEqual<string, "s">;
}
