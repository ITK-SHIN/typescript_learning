// 2.20.1 : 추상클래스

/* implements 보다 조금 더 구체적으로 클래스 모양을 정의하는 방법 */

// 1. abstract 속성이나 메서드를 구현하지 않으면 에러발생
{
  abstract class AbstractPerson {
    name: string;
    age: number;
    married: boolean = false;
    abstract value: number;

    constructor(name: string, age: number, married: boolean) {
      this.name = name;
      this.age = age;
      this.married = married;
    }

    sayName() {
      console.log(this.name);
    }

    abstract sayAge(): void;
    abstract sayMarried(): void;
  }

  class RealPerson extends AbstractPerson {
    sayAge() {
      console.log(this.age);
    }
  }
}

// ✅ 올바르게 구현한 코드
abstract class AbstractPerson {
  name: string;
  age: number;
  married: boolean = false;
  abstract value: number;

  constructor(name: string, age: number, married: boolean) {
    this.name = name;
    this.age = age;
    this.married = married;
  }

  sayName() {
    console.log(this.name);
  }

  abstract sayAge(): void;
  abstract sayMarried(): void;
}

class RealPerson extends AbstractPerson {
  value: number = 0;

  sayAge() {
    console.log(this.age);
  }

  sayMarried() {
    console.log(this.married);
  }
}
