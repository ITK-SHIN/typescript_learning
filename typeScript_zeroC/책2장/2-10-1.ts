// 특정 속성의 타입을 별도 타입으로 만들고 싶다면?  p74~

// 다음 코드의 name 속성의 타입을 별도 타입으로 만들기
type Animal = {
  name: string; // 여기를 변경하면
};

type N = string; // 여기도 변경해야 한다.

//위와같이 하면 나중에 name 속성 타입을 변경할때, N 타입도 따로 변경해야 한다.

{
  // 특정한 속성에 연동되게 타입을 만들고 싶다면 다음과 같이 작성
  type Animal = {
    name: string;
  };

  // 객체 속성의 타입에 접근하는 방식을 인덱스 접근 타입(Indexed Access Type) 이라고 부른다.
  type N1 = Animal["name"];
  type N2 = Animal["name"];
  type N3 = Animal.name;
}

{
  const obj = {
    hello: "world",
    name: "zero",
    age: 28,
  };
}

{
  const obj = {
    hello: "world",
    name: "zero",
    age: 28,
  };
  type Keys = keyof typeof obj;
  type Values = (typeof obj)[Keys];
}

{
  // 배열에 keyof 를 적용하면 'number | 배열속성이름유니언 | 배열 인덱스 문자열 유니언' 이 된다.
  // 배열 속성 이름은 배열에 공통적으로 존재하는 length, forEach, lastIndesOf 등을 의미
  // 배열 인덱스 문자열은 [1,2,3]의 인덱스인 '0' | '1' | '2' 를 의미
  type Keys = keyof any;
  type ArrayKeys = keyof [1, 2, 3];
  let a: ArrayKeys = "lastIndexOf";
  a = "length";
  a = "2";
  a = "3";
  a = 3;
  a = 4;
}

{
  type Arr = [1, 3, 5];
  type First = Arr[0];
  type Length = Arr["length"];

  type Arr2 = (string | boolean)[];
  type El = Arr2[number];
}

{
  const obj = {
    hello: "world",
    name: "zero",
    age: 28,
  };

  type Values = (typeof obj)["hello" | "name"];
}

// 객체의 메서드 선언시 세 가지 방식으로 할 수있다.
{
  //1.
  interface Example {
    a(): void;
    b: () => void;
    c: {
      (): void;
    };
  }

  // 매서드(매개변수) : 반환값
  // 메서드: (매개변수) => 반환값
  // {(매개변수) : 반환값}
}
