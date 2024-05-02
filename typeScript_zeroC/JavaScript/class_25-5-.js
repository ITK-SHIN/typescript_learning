class Person {
  #name;

  constructor(name, age) {
    this.#name = name;
    this.age = age;
  }

  get name() {
    return this.#name;
  }
}

const me = new Person("woo", 25);
console.log(me);
console.log(me.name);
