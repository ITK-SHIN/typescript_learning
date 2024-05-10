//2.26: 추가적인 타입 검사에는 satisfies 연산자를 사용하자

// satisfies 연산자
// - 타입 추론을 그대로 활용하면서 추가로 타입 검사를 하고 싶을 때 사용

// sirius 대신 sriius 로 오타낸 상황
{
  const universe = {
    sun: "star",
    sriius: "star",
    earth: { type: "planet", parent: "sun" },
  };
}

// 인덱스 시그니처를 사용해 타이핑 하기
// earth 타입이 객체라는 것을 제대로 잡아내지 못한다.
// 속성 값의 타입을 객체와 문자열의 유니언으로 표기해놨기에 earth가 문자열일 수도 있다고 생각하는 것
{
  const universe: {
    [key in "sun" | "sirius" | "earth"]:
      | { type: string; parent: string }
      | string;
  } = {
    sun: "star",
    sriius: "star",
    earth: { type: "planet", parent: "sun" },
  };

  universe.earth;
}

// satisfies 타입 사용하기
// 객체 리터럴 뒤에 'satisfies 타입' 을 표기하면 된다.
// 이러면 universe 타입은 타입 추론된 것을 그대로 사용하면서, 각각의 속성들은 satisfies에 적은 타입으로 다시 한번 검사한다.
const universe = {
  sun: "star",
  sriius: "star",
  earth: { type: "planet", parent: "sun" },
} satisfies {
  [key in "sun" | "sirius" | "earth"]:
    | { type: string; parent: string }
    | string;
};
