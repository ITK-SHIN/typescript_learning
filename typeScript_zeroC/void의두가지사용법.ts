{
  // 1. 잉여 속성 검사
  interface A {
    a: string;
  }
  const obj = { a: "hello", b: "world" };
  const obj1: A = obj;

  function a(): void {
    return undefined;
  }

  interface Human {
    talk: () => void;
  }

  const human: Human = {
    talk() {
      return "abc";
    },
  };
}
