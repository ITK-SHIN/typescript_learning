// 2-14. 제네릭으로 타입을 함수처럼 사용하자

// 자바스크립트는 값에 중복이 발생하면 함수를 만들어 중복을 제거하곤 한다.
const Person1 = {
  type: "human",
  race: "yellow",
  name: "zero",
  age: 28,
};

const Person2 = {
  type: "human",
  race: "yellow",
  name: "nero",
  age: 32,
};

{
  const PersonFactory = (name, age) => ({
    type: "human",
    race: "yellow",
    name,
    age,
  });

  const Person1 = PersonFactory("zero", 28);
  const Person2 = PersonFactory("nero", 32);
}

// 타입스크립트도 타입 간에 중복이 발생할 수 있다.
// 이럴 경우, 제네릭(generic)을 사용해서 중복을 제거할 수 있다.
interface Zero {
  type: "human";
  race: "yellow";
  name: "zero";
  age: 28;
}

interface Nero {
  type: "human";
  race: "yellow";
  name: "nero";
  age: 32;
}

interface Person<N, A> {
  type: "human";
  race: "yellow";
  name: N;
  age: A;
}

interface Zero extends Person<"zero", 28> {}
interface Nero extends Person<"nero", 32> {}

// Array도 제네릭 타입이기 때문에 <> 부분이 있는 것
interface Array<T> {
  [key: number]: T;
  length: number;
  //기타 속성들
}

/* 제네릭이 없다면 */
interface StringArray {
  [key: number]: String;
  length: number;
}

interface BooleanArray {
  [key: number]: BooleanArray;
  length: number;
}
//제네릭 덕분이 타입 간에 중복되는 부분을 없애고 타입을 여러 방법으로 재사용할 수 있게 되었다.

//타입 매개변수의 개수와 타입 인수의 개수가 일치하지 않으면 에러가 발생한다.
interface Person<N, A> {
  type: "human";
  race: "yellow";
  name: N;
  age: A;
}

interface Zero extends Person<"zero"> {} // Generic type 'Person<N, A>' requires 2 type argument(s).ts(2314)

interface Zero extends Person<"zero", 28> {}
interface Zero extends Person<"zero", 28, boolean> {} // Generic type 'Person<N, A>' requires 2 type argument(s).ts(2314)

//클래스, 타입 별칭, 함수도 제네릭을 가질 수 있다.
{
  type Person<N, A> = {
    type: "human";
    race: "yellow";
    name: N;
    age: A;
  };

  type Zero = Person<"zero", 28>;
  type Nero = Person<"nero", 32>;

  class Person1<N, A> {
    name: N;
    age: A;
    constructor(name: N, age: A) {
      this.name = name;
      this.age = age;
    }
  }
}

// 함수에서는 함수 선언문이냐 표현식이냐에 따라 제네릭 표기 위치가 다르므로 주의
const personFactoryE = <N, A>(name: N, age: A) => ({
  type: "human",
  race: "yellow",
  name,
  age,
});

function personFactoryD<N, A>(name: N, age: A) {
  return {
    type: "human",
    race: "yellow",
    name,
    age,
  };
}

// interface와 type 간에 교차 사용도 가능하다.
{
  interface IPerson<N, A> {
    type: "human";
    race: "yaellow";
    name: N;
    age: A;
  }

  type TPerson<N, A> = {
    type: "human";
    race: "yellow";
    name: N;
    age: A;
  };

  type Zero = IPerson<"zero", 28>;
  interface Nero extends TPerson<"nero", 32> {}
}

// 객체나 클래스의 메서드에 따로 제네릭을 표기할 수도 있다.
class Person<N, A> {
  name: N;
  age: A;
  constructor(name: N, age: A) {
    this.name = name;
    this.age = age;
  }
  method<B>(param: B) {}
}

interface IPerson<N, A> {
  type: "human";
  race: "yellow";
  name: N;
  age: A;
  method: <B>(param: B) => void;
}

//타입 매개변수에는 기본값(default)을 사용할 수 있다.
interface Person<N = string, A = number> {
  type: "human";
  reac: "yellow";
  name: N;
  age: A;
}

type Person1 = Person;
type Person2 = Person<number>;
type Person3 = Person<number, boolean>;

//ts는 제네릭에 직접 타입을 넣지 않아도 추론을 통해 타입을 알아낼 수 있다.
{
  interface Person<N, A> {
    type: "human";
    race: "yellow";
    name: N;
    age: A;
  }

  const personFactoryE = <N, A = unknown>(name: N, age: A): Person<N, A> => ({
    type: "human",
    race: "yellow",
    name,
    age,
  });

  const zero = personFactoryE("zero", 28);
}

// 타입스크립트 5.0버전에서 상수 타입 매개변수가 추가되었다.
function values<T>(initial: T[]) {
  return {
    hasValue(value: T) {
      return initial.includes(value);
    },
  };
}

const savedValues = values(["a", "b", "c"]);
savedValues.hasValue("x");

// 만약 T를 string 대신 'a' | 'b' | 'c' 와 같은 유니언으로 추론되게 하고 싶으면 어떻게?
{
  function values<T>(initial: readonly T[]) {
    return {
      hasValue(value: T) {
        return initial.includes(value);
      },
    };
  }

  const savedValues = values(["a", "b", "c"] as const);
  savedValues.hasValue("x");
}

// 5.0 버전에서는 상수 타앱 매개변수가 도입되어 다음과 같이 해도 된다.
{
  function values<const T>(initial: T[]) {
    return {
      hasValue(value: T) {
        return initial.includes(value);
      },
    };
  }

  const savedValues = values(["a", "b", "c"]);
  savedValues.hasValue("x");
}
