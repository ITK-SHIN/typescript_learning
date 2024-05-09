//함수 선언문은 throw를 하더라도 반환값의 타입이 void이다.
function neverFunc1() {
  throw new Error("에러");
}

// void 타입은 never에 대입할 수 없으므로 error!
const result1: never = neverFunc1();

// 함수 표현식은 throw를 하면 반환값의 타입이 never가 된다.
const neverFunc2 = () => {
  throw new Error("에러");
};

const result2: never = neverFunc2();

// 무한반복문의 경우도, 함수가 값을 반환하지 않는 경우
//표현식 -> never
// 선언문 -> void 반환
function infinite1() {
  while (true) {
    console.log("void반환");
  }
}

const infinite = () => {
  while (true) {
    console.log("무한반복");
  }
};

function strOrNum(param: string | number) {
  if (typeof param === "string") {
  } else if (typeof param === "number") {
  } else {
    param;
  }
}
