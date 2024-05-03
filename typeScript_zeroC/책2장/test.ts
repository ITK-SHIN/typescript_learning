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

  console.log(person3);
}
