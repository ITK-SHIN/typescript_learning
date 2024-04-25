// 2.13.1 구조적 타이핑

// 타입스크립트에서는 모든 속성이 동일하면 객체 타입의 이름이 다르더라도 동일한 타입으로 취급

// 객체를 어떻게 만들었든 간에 구조가 같으면 같은 객체로 인식하는 것을 구조적 타이핑(structure typing) 이라고 부른다.
interface Money {
  amount: number;
  unit: string;
}

interface Liter {
  amount: number;
  unit: string;
}
const liter: Liter = { amount: 1, unit: "liter" };
const circle: Money = liter;

{
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
  const bTob: B = bObj;
}

{
  type Arr = number[];
  type CopyArr = {
    [Key in keyof Arr]: Arr[Key];
  };

  const copyArr: CopyArr = [1, 3, 9];
}

{
  type SimpleArr = { [key: number]: number; length: number };
  const simpleArr: SimpleArr = [1, 2, 3];
}

// 서로 대입하지 못하게 하기
// 1. 서로를 구분하기 위한 속성을 추가해야 한다.
// 즉, 구조적으로 동일하지 않게 만들어야 한다.

{
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

  const liter: Liter = { amount: 1, unit: "liter", _type: "liter" };
  const circle: Money = liter;
}
