class Person {
  name = "class field";
  tall;
  getName = function () {
    return this.tall;
  };

  constructor(name, age) {
    console.log(this.name);

    this.name = name;
    this.age = age;
    this.tall = true;
  }
}

const me = new Person("sangwoo", 27);
console.log(me);
console.log(me.getName());
