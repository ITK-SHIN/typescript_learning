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

  const a = new A("123");

  type AA = A;
  const a: A = new A("123");
}

{
  interface A {
    readonly a: string;
    b: string;
  }

  class B implements A {
    a: string = "123";
    b: string = "world";
  }

  class C extends B {}
}

/* 
                         public    protected   private
클래스 내부        O               O                O
인스턴스             O               X               X
상속클래스         O               O                X
*/
