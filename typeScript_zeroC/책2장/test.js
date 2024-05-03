{
    class Person {
        constructor(name, age, married) {
            if (name) {
                this.name = name;
            }
            if (typeof age === "boolean") {
                this.married = age;
            }
            else {
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
export {};
