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
// 멤버의 타입은 생략할 수있다. (ts가 생성자 함수를 통해 알아서 추론.)

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
      this.married = married;
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
// ✅ type으로 사용할 때, 클래스의 이름은 클래스 자체의 타입이 아니라 인스턴스의 타입이 된다.
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
    this.age = age; // Cannot assign to 'age' because it is a read-only property.ts(2540)
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
    console.log(this.value); // Property 'value' is private and only accessible within class 'Parent'.ts(2341)
  }
}

const child = new Child("zero", 28, false);
child.name;
child.married; // Property 'married' is protected and only accessible within class 'Parent' and its subclasses.ts(2445)
child.value; // Property 'value' is private and only accessible within class 'Parent'.ts(2341)

/* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */

/* JS의 private field(#)  과  TS의 private 차이점 */
class PrivateMember {
  private priv: string = "priv";
}

//error: ChildPrivateMember' 클래스가 기본 클래스 'PrivateMember'를 잘못 확장합니다.
// 유형에는 개인 속성 'priv'에 대한 별도의 선언이 있습니다.ts(2415)
class ChildPrivateMember extends PrivateMember {
  private priv: string = "priv";
}

class PrivateField {
  #priv: string = "priv";
  sayPriv() {
    console.log(this.#priv);
  }
}

class ChildPrivateField extends PrivateField {
  #priv: string = "priv";
}

{
  interface Human {
    name: string;
    age: number;
    married: boolean;
  }

  class Person implements Human {
    name;
    protected age;
    married;

    constructor(name: string, age: number, married: boolean) {
      this.name = name;
      this.age = age;
      this.married = married;
    }
  }
}

/* // class 메서드에 override 수식어가 있는데, 이 수식어를 활용하려면
// TS Config 메뉴에서 noImplicitOverride 옵션이 체크되어 있어야 한다. */
class Human {
  eat() {
    console.log("냠냠");
  }

  sleep() {
    console.log("쿨쿨");
  }
}

class Employee extends Human {
  work() {
    console.log("끙차");
  }

  // This member must have an 'override' modifier because it overrides a member in the base class 'Human'.ts(4114)
  /*   sleep() {
    console.log("에고고");
  } */

  override sleap() {
    console.log("에고고");
  }
}

/* 오버로딩 overloading */
{
  class Person {
    name?: string;
    age?: number;
    married?: boolean;

    constructor();
    constructor(name: string, married: boolean);
    constructor(name: string, age: number, married: boolean);
    constructor(name?: string, age?: boolean | number, married?: boolean) {
      if (name) {
        this.name = name;
      }

      if (typeof age === "boolean") {
        this.married = age;
      } else {
        this.age = age;
      }

      if (married) {
        this.married = married;
      }
    }
  }

  const person1 = new Person();
  const person2 = new Person("nero", true);
  const person3 = new Person("zero", 28, false);
  console.log(person1);
}

/* 클래스의 속성에도 인덱스 시그니처를 사용할 수 있다. */
/* static 속성에도 인덱스 시그니처가 가능하여 속성을 자유롭게 추가할 수 있다. */
class Signature {
  [propName: string]: string | number | undefined;
  static [propName: string]: boolean;
}

const sig = new Signature();
sig.hello = "world";
Signature.isGood = true;

/* 클래스나 인터페이스의 메서드에서는 this를 타입으로 사용할 수 있다. */
{
  class Person {
    age: number;
    married: boolean;

    constructor(age: number, married: boolean) {
      this.age = age;
      this.married = married;
    }

    sayAge() {
      console.log(this.age);
    }

    sayMarried(this: Person) {
      console.log(this.married);
    }

    sayCallback(callback: (this: this) => void) {
      callback.call(this);
    }
  }
}

{
  class A {
    callbackWithThis(cb: (this: this) => void) {
      cb.call(this);
    }

    callbackWithoutThis(cb: () => void) {
      cb();
    }
  }

  new A().callbackWithThis(function () {
    this;
  });

  new A().callbackWithoutThis(function () {
    this;
  });
}

/* 인터페이스로 클래스 생성자를 타이핑할 수도 있다. */
{
  interface PersonConstructor {
    new (name: string, age: number): {
      name: string;
      age: number;
    };
  }

  class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
  }

  function createPerson(ctor: PersonConstructor, name: string, age: number) {
    return new ctor(name, age);
  }

  createPerson(Person, "zero", 28);
}

// 이를 활용해 타입스크립트에서도 생성자 함수를 사용할 수있다.
//클래스가 있으니 이런식으로 코딩할 필요없음
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

  type PersonType = typeof Person & {
    new (name: string, age: number, married: boolean): PersonInterface;
  };

  new (Person as PersonType)("zero", 28, false);
}
