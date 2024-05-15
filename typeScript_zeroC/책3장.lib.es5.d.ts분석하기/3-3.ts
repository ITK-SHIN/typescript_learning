// 3.3: Parameters, ConstructorParameters, ReturnType, InstanceType
// infer를 활용한 타입들

// new (...args: any) => any
//  모든 생성자 함수를 의미하는 타입 (클래스 포함, 추상클래스는 X)

// 추상 클래스까지 포함
// abstract new (...args: any) => any

// ✅ MyParameters : 주어진 함수의 매개변수 타입들을 튜플 형태로 추출하는 유틸리티 타입.
type MyParameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

type Func = (name: string, age: number, single: boolean) => void;
type ParameterOfFunc = MyParameters<Func>;

const test: ParameterOfFunc = ["sangwoo", 30, true];

//✅ MyInstanceType : 특정 추상 클래스 또는 생성자의 생성자 매개변수 타입을 튜플로 추출하는 유틸리티 타입
type MYConstructorParameters<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: infer P) => any ? P : never;

abstract class Person {
  constructor(public name: string, public age: number) {}
}

type ConstructorParams = MYConstructorParameters<typeof Person>;
const personParams: ConstructorParams = ["Alice", 30]; // [string, number] 타입

//✅ MyReturnType : 함수의 반환 타입을 추출하는 유틸리티 타입
type MyReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;

type ExampleFunction = (a: number, b: number) => number;
type ReturnTypeOfExample = MyReturnType<ExampleFunction>;

const example: ReturnTypeOfExample = 123; // number 타입

// ✅ MyInstanceType: 클래스의 인스턴스 타입을 추출하는 유틸리티 타입
type MyInstanceType<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: any) => infer R ? R : any;

abstract class Base {
  abstract makeSound(): void;
}

class Dog extends Base {
  makeSound() {
    console.log("Woof!");
  }
}

type DogInstance = MyInstanceType<typeof Dog>;

const myDog: DogInstance = new Dog(); // Dog 클래스의 인스턴스
myDog.makeSound(); // "Woof!" 출력
