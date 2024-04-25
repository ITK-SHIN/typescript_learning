// 2.13 객체 간에 대입할 수 있는지 확인하는 법을 배우자

// 1. 좁은 타입은 넓은 타입에 대입할 수 있지만,
// 넓은 타입은 좁은 타입에 대입할 수 없다.
// 객체에도 똑같이 적용!
interface A {
  name: string;
}

interface B {
  name: string;
  age: number;
}

const aObj = {
  name: "zero",
};

const bObj = {
  name: "nero",
  age: 32,
};

const aToA: A = aObj;
const bToA: A = bObj;
const aToB: B = aObj;
const bTob: A = bObj;

// 합집합은 교집합보다 넓기 때문에 대입할 수 없다.
{
  interface A {
    name: string;
  }

  interface B {
    age: number;
  }

  function test(): A | B {
    if (Math.random() > 0.5) {
      return {
        age: 28,
      };
    }

    return {
      name: "zero",
    };
  }

  const target1: A & B = test();
  const target2: A = test();
  const target3: B = test();
}

// 튜플은 배열보다 좁은 타입이다.
// 따라서 튜플은 배열에 대입할 수 있으나, 배열은 튜플에 대입할 수 없다.
{
  let a: ["hi", "readonly"] = ["hi", "readonly"];
  let b: string[] = ["hi", "normal"];

  a = b;
  b = a;
}

// readonly 수식어가 붙은 배열이 더 넓은 타입이다.
{
  let a: readonly string[] = ["hi", "readonly"];
  let b: string[] = ["hi", "normal"];

  a = b;
  b = a;
}

// readonly 튜플과 일반 배열 대입해보기
{
  let a: readonly ["hi", "readonly"] = ["hi", "readonly"];
  let b: string[] = ["hi", "normal"];

  a = b;
  b = a;
}

// 두 객체가 있고 속성이 동일할 떄, 속성이 옵셔널인 객체가 옵셔널이지 않은 객체보다
// 더 넓은 타입이다.
// 옵셔널이란 기존 타입에 undefined가 유니언된 것과 같다.
{
  type Optional = {
    a?: string;
    b?: string;
  };

  type Mandatory = {
    a: string;
    b: string;
  };

  const o: Optional = {
    a: "hello",
  };

  const m: Mandatory = {
    a: "hello",
    b: "world",
  };

  const o2: Optional = m;
  const m2: Mandatory = o;
}

// 배열과 다르게 객체에서는 속성에 readonly 가 붙어도 서로 대입할 수있다.
{
  type ReadOnly = {
    readonly a: string;
    readonly b: string;
  };

  type Mandatory = {
    a: string;
    b: string;
  };

  const o: ReadOnly = {
    a: "hi",
    b: "world",
  };

  const m: Mandatory = {
    a: "hello",
    b: "world",
  };

  const o2: ReadOnly = m;
  const m2: Mandatory = o;
}
