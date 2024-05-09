/* 
제어 흐름 분석 (Control Flow Analysis)
ts가 코드를 파악해서 타입을 추론하는 것을 말한다.
*/

function strOrNum(param: string | number) {
  if (typeof param === "string") {
    param;
  } else if (typeof param === "number") {
    param;
  } else {
    param; // (parameter) param: never
  }
}

//2.  null 과 undefined 구분하기

// else if 문에서 string이 걸러지지 않는다. -> 빈 문자열('')이 있으므로 else문에서도  param이 string일 수 있다.
// js에서 typeof null이 object 이다 (js의 유명한 버그)

//😰 bad code
function strOrNullOrUndefined(param: string | null | undefined) {
  if (typeof param === "undefined") {
    param;
  } else if (param) {
    param;
  } else {
    param;
  }
}

//🥰 good code
// 타입좁히기에 꼭 typeof를 쓸 필요가 없다.
function strOrNullOrUndefined2(param: string | null | undefined) {
  if (param === undefined) {
    param;
  } else if (param === null) {
    param;
  } else {
    param;
  }
}

//boolean -> true/false 로 구분
function trueOrFalse(param: boolean) {
  if (param) {
    param;
  } else {
    param;
  }
}

// 배열 구분하기
function strOrNumArr(param: string | number[]) {
  if (Array.isArray(param)) {
    param;
  } else {
    param;
  }
}

// class 구분하기
// - instanceof 연산자를 이용해서 구분할 수 있다.
// - 함수도 instanceof Function으로 구분할 수 있다.
class A {}
class B {}
function classAorB(param: A | B) {
  if (param instanceof A) {
    param;
  } else {
    param;
  }
}

// 두 객체 구분하기
interface X {
  width: number;
  height: number;
}

interface Y {
  length: number;
  center: number;
}

// 타입 좁히기는 js 문법을 사용해서 진행해야 한다.
// js 에서도 실행할 수있는 코드여야 하기 때문이다.
function objXorY(param: X | Y) {
  if (param instanceof X) {
    //'X' only refers to a type, but is being used as a value here.ts(2693)
    param;
  } else {
    param;
  }
}

function objXorY2(param: X | Y) {
  if (param.width) {
    param;
  } else {
    param;
  }
}

function objXorY3(param: X | Y) {
  if ("width" in param) {
    param;
  } else {
    param;
  }
}

// 브랜드 속성 사용시 객체 구분이 쉬워진다.
interface Money {
  _type: "money";
  amount: number;
  unit: string;
}

interface Liter {
  _type: "liter";
  amount: number;
  unit: string;
}

// 공통 속성이 있으므로 in 연산자 대신 바로 속성에 접근할 수 있다.
function moneyOrLiter(param: Money | Liter) {
  if (param._type === "money") {
    param;
  } else {
    param;
  }
}

// 직접 타입 좁히기 함수 만들기
function isMoney(param: Money | Liter): param is Liter {
  if (param._type === "money") {
    return true;
  } else {
    return false;
  }
}

/* function isMoney(param: Money | Liter) {
  if (param._type === "money") {
    return true;
  } else {
    return false;
  }
}
 */
function moneyOrLiter2(param: Money | Liter) {
  if (isMoney(param)) {
    param;
  } else {
    param;
  }
}
