// Union type   ' l ' -> 합집합
// intersection 연산자 '&' -> 교집합
// never -> 공집합
// unknown -> 전체집합
type nev = string & number;

type A = string | boolean;
type B = boolean | number;
type C = A & B;

// null / undefined 를 제외한 원시 자료형과 비어 있지 않은 객체를 & 연산할 떄는 never가 되지 않는다.
// 객체 타입과 원시값은 겹치는 부분이 없으면 never가 되는 게 원칙
// 아래는 예외사항 ( 브랜딩 기법)
type H = { a: "b" } & number;

type I = null & { a: "b" }; // type I = never

// 표시 자체는   type J = {} & string 이렇게 되지만,
// {} 와 string의 교집합은 string이다
type J = {} & string; // type J = {} & string
