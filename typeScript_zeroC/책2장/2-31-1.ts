// 2.31: 함수에 기능을 추가하는 데코레이터 함수가 있다. [5.0 추가]

// 데코레이터 : 클래스의 기능을 증강하는 함수
// 여러 함수에서 공통으로 수행되는 부분을 데코레이터로 만들어 두면 좋다.

class A {
  eat() {
    console.log("start");
    console.log("Eat");
    console.log("End");
  }

  work() {
    console.log("start");
    console.log("Work");
    console.log("End");
  }

  sleep() {
    console.log("start");
    console.log("Sleep");
    console.log("End");
  }
}

// class A에서 eat과 end를 출력하는 console.log가 중복된다.
// 중복이 있는 경우, 다음과 같이 데코레이터를 사용하여 중복을 제거할 수 있다.

// originalMethod 매개변수가 eat, work, sleep 같은 기존 메서드이다.
//                           이 메서드가 대체 메서드(replacementMethod)로 바뀐다고 생각
//                            replacementMethod에 따라 기존 메서드의 호출 전후로 start와 end가 로깅된다.
function startAndEnd(originalMethod: any, context: any) {
  function replacementMethod(this: any, ...args: any[]) {
    console.log("start");
    const result = originalMethod.call(this, ...args);
    console.log("end");

    return result;
  }

  return replacementMethod;
}

class B {
  @startAndEnd
  eat() {
    console.log("Eat");
  }

  @startAndEnd
  work() {
    console.log("work");
  }

  @startAndEnd
  sleep() {
    console.log("sleep");
  }
}

//startAndEnd 의경우 데코레이터가 any로 타이핑되어 있는데, 제대로 타이핑하면 다음과 같다.
function startAndEnd2<This, Args extends any[], Return>(
  originalMethod: (this: This, ...args: Args) => Return,
  context: ClassAccessorDecoratorContext<
    This,
    (this: This, ...args: Args) => Return
  >
) {
  function replacementMethod(this: This, ...args: Args): Return {
    console.log("start");
    const result = originalMethod.call(this, ...args);
    console.log("end");
    return result;
  }
  return replacementMethod;
}

// context 객체의 타입
/* 
kind : 데코레이터의 유형
name: 장식 대상의 이름
access : has, get, set 등의 접근자를 모아둔 객체
private : private 여부
static: static 여부

addInitializer 메서드 : 초기화할 떄 실행되는 메서드

데코레이터의 유형에 따라 속성이 존재하지 않는 경우도 있다.
*/
type Context = {
  kind: string;
  name: string | symbol;
  access: {
    get?(): unknown;
    set?(value: unknown): void;
    has?(value: unknown): boolean;
  };
  private?: boolean;
  static?: boolean;
  addInitializer?(initializer: () => void): void;
};

// 데코레이터 자체도 함수이므로 매개변수를 가질 수 있다.
// 단, 고차함수를 활용해야 한다.
function startAndEnd3(start = "start", end = "end") {
  return function RealDecorator<This, Args extends any[], Return>(
    originalMethod: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<
      This,
      (this: This, ...args: Args) => Return
    >
  ) {
    function replacementMethod(this: This, ...args: Args): Return {
      console.log(context.name, start);
      const result = originalMethod.call(this, ...args);
      console.log(context.name, end);
      return result;
    }

    return replacementMethod;
  };
}

class C {
  @startAndEnd3()
  eat() {
    console.log("Eat");
  }

  @startAndEnd3()
  work() {
    console.log("work");
  }

  @startAndEnd3("시작", "끝")
  sleep() {
    console.log("sleep");
  }
}

function log<Input extends new (...args: any[]) => any>(
  value: Input,
  context: ClassDecoratorContext
) {
  if (context.kind === "class") {
    return class extends value {
      constructor(...args: any[]) {
        super(args);
      }
      log(msg: string): void {
        console.log(msg);
      }
    };
  }
  //class 가 아닌 경우
  return value;
}

function bound(
  originalMethod: unknown,
  context: ClassMethodDecoratorContext<any>
) {
  const methodName = context.name;
  if (context.kind === "method") {
    context.addInitializer(function () {
      this[methodName] = this[methodName].bind(this);
    });
  }
}

@log
export class D {
  @bound
  @startAndEnd3()
  eat() {
    console.log("Eat");
  }

  @bound @startAndEnd3() work() {
    console.log("work");
  }

  @startAndEnd3("시작", "끝")
  sleep() {
    console.log("Sleep");
  }
}
