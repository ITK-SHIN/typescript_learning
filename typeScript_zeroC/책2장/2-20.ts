// 2.20 : 클래스는 값이면서 타입이다.

// js
{
  class Person {
    constructor(name, age, married) {
      this.name = name;
      this.age = age;
      this.married = married;
    }
  }
}

// ts
// js와 주요한 차이점은, 타입스크립트는 name, age, married 같은 멤버를 클래스 내부에 한 번 적어야 한다는 것
// 멤버의 타입은 생략할 수있다. (ts가 생성자 함수를 통해 알아서 추론한다.)

class Person {
  name: string;
  age: number;
  married: boolean;
  constructor(name: string, age: number, married: boolean) {
    this.name = name;
    this.age = age;
    this.married = married;
  }
}

// 클래스 표현식
{
  const Person = class {
    name;
    age;
    married;
    constructor(name: string, age: number, married: boolean) {
      this.name = name;
      this.age = age;
      this.married = married;
    }
  };
}

// 멤버는 함상 constructor 내부와 짝이 맞아야 한다.
{
  class Person {
    name: string;
    married: boolean;
    constructor(name: string, age: number, married: boolean) {
      this.name = name;
      this.age = age;
    }
  }
}

// 엄격하게 클래스의 멤버가 제대로 들어 있는지 검사할 수 있다.
// interface + implements 예약어를 사용하면 된다.
{
  interface Human {
    name: string;
    age: number;
    married: boolean;
    sayName(): void;
  }

  //'Person' 클래스가 'Human' 인터페이스를 잘못 구현했습니다. 'Person' 유형에는 'sayName' 속성이 없지만 'Human' 유형에는 필수입니다.
  class Person implements Human {
    name;
    age;
    married;

    constructor(name: string, age: number, married: boolean) {
      this.name = name;
      this.age = age;
      this.married = married;
    }
  }
}

// ts는 생성자 함수 방식으로 객체를 만드는 것을 지원하지 않는다.
//✅ 따라서 클래스가 new 를 붙여 호출할 수 있는 유일한 객체라고 볼 수 있다.
{
  interface PersonInterface {
    name: string;
    age: number;
    married: boolean;
  }

  function Person(
    this: PersonInterface,
    name: string,
    age: number,
    married: boolean
  ) {
    this.name = name;
    this.age = age;
    this.married = married;
  }

  //대상에 구문 서명이 없는 new' 표현식에는 암시적으로 'any' 유형이 있습니다.
  new Person("zero", 28, false);
}

// 클래스는 ts에서 값으로 쓰이면서 타입이 되기도 한다.
// type으로 사용할 때, 클래스의 이름은 클래스 자체의 타입이 아니라 인스턴스의 타입이 된다.
// 클래스 자체의 타입이 필요하다면 'typeof 클래스이름' 으로 타이핑해야 한다.

const person1: Person = new Person("zero", 28, false);
const P: typeof Person = Person;
const person2 = new P("nero", 32, true);

// 클래스 멤버로 옵셔널이나 readonly 뿐만 아니라 public, protected, private 수식어가 추가되었다.
class Parent {
  name?: string;
  readonly age: number;
  protected married: boolean;
  private value: number;
  constructor(name: string, age: number, married: boolean) {
    this.name = name;
    this.age = age;
    this.married = married;
    this.value = 0;
  }

  changeAge(age: number) {
    this.age = age;
  }
}

class Child extends Parent {
  constructor(name: string, age: number, married: boolean) {
    super(name, age, married);
  }
  sayName() {
    console.log("this.name");
  }

  sayMarried() {
    console.log(this.married);
  }
  sayValue() {
    console.log(this.value);
  }
}

const child = new Child("zero", 28, false);
child.name;
child.married;
child.value;
