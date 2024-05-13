// 데코레이터는
//새로운 함수를 리턴해줘야 한다. -> 즉, 고차함수이다.
// class 데코레이터는 class를 리턴해줘야 한다.

function startAndEnd(originalMethod: any, context: any) {
  return function replacementMethod(this: any, ...args: any[]) {
    console.log("start");
    const result = originalMethod.call(this, ...args);
    console.log("end");

    return result;
  };
}

function startAndEnd2<This, Args extends any[], Return>(
  originalMethod: (this: This, ...args: Args) => Args,
  context: ClassMethodDecoratorContext<
    This,
    (this: This, ...args: Args) => Args
  >
) {
  return function replacementMethod(this: This, ...args: Args) {
    console.log("start");
    const result = originalMethod.call(this, ...args);
    console.log("end");

    return result;
  };
}

class A {
  @startAndEnd
  eat() {
    console.log("Eat");
  }

  @startAndEnd
  work() {
    console.log("Work");
  }
  @startAndEnd
  sleep() {
    console.log("Sleep");
  }
}
