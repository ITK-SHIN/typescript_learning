//2.16. 함수와 메서드를 타이핑하자

//1. 매개변수 a 는 필수로 제공
//2. 매개변수 b는 옵셔널
//3. 기본값이 제공된 c는 자동으로 옵셔널
function example(a: string, b?: number, c = false) {}

example("hi", 123, true);
example("hi", 123);
example("hi");

// 나머지 매개변수 문법을 사용하는 매개변수는 항상 배열이나 튜플 타입이어야 한다.
function example1(a: string, ...b: number[]) {}
example1("hi", 123, 4, 56);
function example2(...a: string[], b: number) {} // A rest parameter must be last in a parameter list.ts(1014)

// 매개변수 자리에 전개 문법을 사용할 수도 있다.
function example3(...args: [number, string, boolean]) {}
example3(1, "2", false);

function example4(...args: [a: number, b: string, c: boolean]) {}
example4(1, "1", true);

// 매개변수에 구조분해 할당을 적용할 때는 타이핑이 헷갈릴 수 있으니 조심해야 한다.
function destructuring({ prop: { nested } }) {}
destructuring({ prop: { nested: "hi" } });

{
  // 이 문법은 nested 속성을 string 타입으로 표기한 것이 아니라 nexted 속성을 string 변수로 이름을 바꾼 것
  function destructuring({ prop: { nested: string } }) {}
  destructuring({ prop: { nested: "hi" } });
}

{
  function destructuring({ prop: { nested } }: { prop: { nested: string } }) {}
  destructuring({ prop: { nested: "hi" } });
}

// 함수 내부에서 this를 사용하는 경우에는 명시적으로 표기해야 한다.
// 표기하지않으면 any로 추론 + 에러발생
{
  function example1() {
    console.log(this);
  }

  function example2(this: Window) {
    console.log(this);
  }

  function example3(this: Document, a: string, b: "this") {}
  example3("hello", "this");

  example3.call(document, "hello", "this");
}

// 메서드에서도 this를 사용할 수 있다.
// 일반적으로는 this를 명시적으로 타이핑할 필요 없다.
// this가 바뀔 수 있을 때는 명시적으로 타이핑해야 한다.
type Animal = {
  age: number;
  type: "dog";
};

const person = {
  name: "zero",
  age: 28,
  sayName() {
    this;
    this.name;
  },

  sayAge(this: Animal) {
    this;
    this.type;
  },
};

person.sayAge.bind({ age: 3, type: "dog" });

// js 에서는 함수를 생성자로 사용할 수 있다.
// ts 에서는 기본적으로 함수를 생성자로 사용할 수 없다. 대신 class를 써야 한다.
//다만, 다음과 같이 억지로 만들 수는 있다.
type Person = {
  name: string;
  age: number;
  married: boolean;
};

interface PersonConstructor {
  new (name: string, age: number, married: boolean): Person;
}

const Person = function (
  this: Person,
  name: string,
  age: number,
  married: boolean
) {
  this.name = name;
  this.age = age;
  this.married = married;
} as unknown as PersonConstructor;

Person.prototype.sayName = function (this: Person) {
  console.log(this.name);
};

const zero = new Person("zero", 28, false);

// 1. 생성자의 타입은 메서드 앞에 new를 붙이면 된다.
// 그려면 new Person과 같이 호출할 수 있다.
// 단, function을 생성자 함수로 만들려면 생성자 타입(PersonConstructor)과 인스턴스의 타입(Person)을 따로 만들고,
// 생성자 함수도 as unknown as PersonConstructor로 강제로 타입을 지정해야 한다.
// 클래스 사용을 더권장

// 클래스를 사용한 코드
{
  class Person {
    name: string;
    age: number;
    married: boolean;
  }

  constructor(name: string, age: number, married: boolean){
    this.name = name;
    this.age = age;
    this.married = married;
  } 

  sayName(){
    console.log(this.name);
  }

  const zero = new Person('zero', 28, false)
}
 