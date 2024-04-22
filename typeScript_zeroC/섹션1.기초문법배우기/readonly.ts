{
  // 1. readonly
  interface A {
    readonly a: string;
    b: string;
  }

  const aaaa: A = { a: "hello", b: "world" };

  //2. 인덱스 시그니처
  type B = { [key: string]: number };
  const bbbb: B = { a: 3, b: 5, c: 5, d: 123 };

  //3. 맵드 타입스
  type C = "Human" | "Mammal" | "Animal";
  type D = { [key in C]: number };
  const dddd: D = { Human: 123, Mammal: 5, Animal: 7 };
}
