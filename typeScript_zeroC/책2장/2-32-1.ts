// 2.32 : 앰비언트 선언도 선언 병합이 된다.

// ts에서 남의 라이브러리 사용시 그 라이브러리가 js일 경우, 직접 타이핑해야 하는 경우가 생긴다.
// 이럴 경우 사용하는 것이 엠비언트 선언(ambient declaration) 이다.

/* 🚩 declare 예약어 */
// 엠비언트 선언을 위해서 사용

declare namespace NS {
  const v: string;
}

declare enum Enum {
  ADMIN = 1,
}

declare function func(param: number): string;
declare const variable: number;
declare class C {
  constructor(p1: string, p2: string);
}

new C(func(variable), NS.v);

// 코드 구현부가 없다.
// 외부 파일에 실제 값이 존재한다고 믿기 때문
// 외부 파일에 값이 없으면 코드 실행시 런타임 에러 발생!
// 따라서 declare로 앰비언트 선언시 반드시 해당값이 실제로 존재함을 확인해야 한다.

//namespace를 declare로 선언하면 내부 멤버의 구현부를 생략할 수 있다.
//enum을 declare로 선언시, js로 변활할 때 실제 코드가 생성되지 않는다.
// declare를 쓰는 경우, 이미 다른 곳에 실제 값이 있다고 생각하기 때문

//✅ 인터페이스와 타입 별칭도 declare로 선언할 수 있다.
declare interface Int {}
declare type T = number;
// 하지만, interface와 타입별칭은 declare로 선언하지 않아도 동일하게 작동하므로 굳이 declare로 선언할 필요 X

// 다음의 경우 선언 병합을 활용하면 좋다.
// 1️⃣
declare class A {
  constructor(name: string);
}
function A(name: string) {
  return new A(name);
}

A("sangwoo");

// 2️⃣ 함수의 속성이 별도로 있다는 것을 알리고 싶다면, 함수와 동일한 이름의 namespace를 추가하면 된다.
function Ex() {
  return "hello";
}
namespace Ex {
  export const a = "world";
  export type B = number;
}

Ex();
Ex.a;
const b: Ex.B = 123;
