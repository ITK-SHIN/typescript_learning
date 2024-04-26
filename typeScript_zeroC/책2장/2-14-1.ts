// 제네릭에 제약 걸기 p103

// 특정 타입 매개변수에 제약이 걸리면 제약에 어긋나는 타입은 입력할 수 없지만,
// 제약보다 더 구체적인 타입은 입력할 수 있다.

// 이러한 점에서 제약은 기본값과 다르다.
// 기본값으로 지정한 타입은 완전히 다른 타입을 제공할 수 있지만, 제약에 어긋나는 타입은 제공할 수 없다.

// 타입 매개변수에 사용하는 extends는 제약을 의미함을 기억하기
interface Example<A extends number, B = string> {
  a: A;
  b: B;
}

type Usecase1 = Example<string, boolean>;
type Usecase2 = Example<1, boolean>;
type Usecase3 = Example<number>;

// 하나의 타입 매개변수가 다른 타입 매개변수의 제약이 될 수도 있다.
{
  interface Example<A, B extends A> {
    a: A;
    b: B;
  }

  type Usecase1 = Example<string, number>;
  type Usecase2 = Example<string, "hello">;
  type Usecase3 = Example<number, 123>;
}

/* <T extends object> // 모든 객체
<T extends any[]> // 모든 배열
<T extends (...args: any) => any> // 모든 함수
<T extends abstract new (...args: any) => any> // 생성자 타입
<T extends keyof any> // string | number | symbol */

/* 제네릭 사용시 흔히하는 실수 */
// 1.  타입 매개변수와 제약을 동일하게 생각하는 것
interface V0 {
  value: any;
}

const returnV0 = <T extends V0>(): T => {
  return { value: "test" }; //error
};

// 에러발생2
function onlyBoolean<T extends boolean>(arg: T = false): T {
  return arg;
}

// onlyBoolean 함수를 유효하게 만들기
// 제네릭 사용X
{
  function onlyBoolean(arg: true | false = true): true | false {
    return arg;
  }
}

// returnV0 함수 유효하게 만들기
// 제네릭 사용X
{
  interface V0 {
    value: any;
  }

  const returnV0 = () => {
    return { value: "test" }; //error
  };
}

//✅ 강제적으로 제네릭을 쓸 필요는 없다.
//✅ 특히 원시값 타입만 사용한다면 대부분 제약을 걸지 않아도 되는 경우가 많다.
