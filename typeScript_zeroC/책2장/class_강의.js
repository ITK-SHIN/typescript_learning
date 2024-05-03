{
    class A {
        constructor(a, b = 123) {
            this.a = a;
            this.b = b;
        }
        method() { }
    }
}
class B {
    constructor() {
        this.a = "123";
        this.b = "world";
    }
}
class C extends B {
}
export {};
