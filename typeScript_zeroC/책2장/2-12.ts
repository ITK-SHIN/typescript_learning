/* 타입도 상속이 가능하다. */
// 1. extends 예약어를 사용해서 기존 타입을 상속할 수 있다.
interface Animal {
  name: string;
}

interface Dog extends Animal {
  bark(): void;
}

interface Cat extends Animal {
  meow(): void;
}

//2. 타입 별칭에서도 상속처럼 작업할 수 있다.
{
  type Animal = {
    name: string;
  };

  type Dog = Animal & {
    bark(): void;
  };

  type Cat = Animal & {
    meow(): void;
  };

  type Name = Cat["name"];
}

{
  interface Animal {
    name: string;
  }

  type Dog =
    | Animal
    | {
        bark(): void;
      };

  type Cat =
    | Animal
    | {
        meow(): void;
      };

  type Name = Cat["name"];
}

// 타입 별칭이 인터페이스를 상속할 수도 있고,
// 인터페이스가 타입 별칭을 상속할 수도 있다.
{
  type Animal = {
    name: string;
  };

  interface Dog extends Animal {
    bark(): void;
  }

  interface Cat extends Animal {
    meow(): void;
  }

  type Name = Cat["name"];
}

// 한 번에 여러 타입을 상속할 수도 있다.
{
  type Animal = {
    name: string;
  };

  interface Dog extends Animal {
    bark(): void;
  }

  interface Cat extends Animal {
    meow(): void;
  }

  interface DogCat extends Dog, Cat {}
  type meow = DogCat["meow"];
  type bark = DogCat["bark"];
}

// 상속할 때 부모 속성의 타입을 변경할 수도 있다.
{
  interface Merge {
    one: string;
    two: string;
  }

  interface Merge2 extends Merge {
    one: "h" | "w";
    two: "123";
  }
}

// 상속할 때 부모 속성의 타입을 변경할 수도 있다.
// 다만 완전히 다른 타입으로 변경하면 에러 발생
{
  interface Merge {
    one: string;
    two: string;
  }

  /* 
        Interface 'Merge2' incorrectly extends interface 'Merge'.
  Types of property 'two' are incompatible.
    Type 'number' is not assignable to type 'string'.ts(2430)
        */
  interface Merge2 extends Merge {
    one: "h" | "w";
    two: 123;
  }
}
