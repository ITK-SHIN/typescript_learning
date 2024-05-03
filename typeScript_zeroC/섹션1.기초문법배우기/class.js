{
    class A {
        constructor(a, b = 123) {
            this.a = a;
            this.b = b;
        }
        method() { }
    }
    const a = new A("123");
    const a = new A("123");
}
{
    class B {
        constructor() {
            this.a = "123";
            this.b = "world";
        }
    }
    class C extends B {
    }
}
export {};
/*
                         public    protected   private
클래스 내부        O               O                O
인스턴스             O               X               X
상속클래스         O               O                X
*/
