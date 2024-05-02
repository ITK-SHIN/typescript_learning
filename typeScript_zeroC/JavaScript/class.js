// 1. class 선언

// 클래스의 본문(body)은 strict mode에서 실행된다. 성능 향상을 위해 더 엄격한 문법이 적용된다.

class Person {
  height = 180; // 인스턴스 변수

  // constructor는 이름을 바꿀 수 없다.
  constructor(name, age) {
    // this는 클래스가 생성할 인스턴스를 가리킨다.
    this.name = name;
    this.age = age;
  }
}

let person1 = new Person("john", 23);
console.log(person1);
console.log(person1.name); // john
console.log(person1.age); // 23
console.log(person1.height); // 180
{
  const methodName = "introduce"; // 클래스 메소드 이름

  class Person {
    constructor({ name, age }) {
      this.name = name;
      this.age = age;
    }

    // 아래 메소드의 이름은 `introduce`가 됩니다.
    [methodName]() {
      return `안녕하세요, 제 이름은 ${this.name}입니다.`;
    }
  }

  console.log(new Person({ name: "윤아준", age: 19 }).introduce()); // 안녕하세요, 제 이름은 윤아준입니다.
}

class Square {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  } // 정적 메서드
  static area(width, height) {
    console.log(width);
    console.log(this.width);
    return width * height;
  }
}

console.log(Square.area(10, 10)); // 100
