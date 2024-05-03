{
  class A {
    a: string;
    b: number;
    constructor(a: string, b: number = 123) {
      this.a = a;
      this.b = b;
    }

    method() {}
  }
}
/* implements */
interface A {
  readonly a: string;
  b: string;
}

// class 모양을 interface로 통제할 수 있다.
class B implements A {
  a: string = "123";
  b: string = "world";
}

class C extends B {}
