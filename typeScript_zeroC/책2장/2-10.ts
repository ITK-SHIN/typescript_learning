interface Example {
  hello: string;
}
//1. 객체를 타이핑할 때 선언하지 않은 속성에 대해서는 에러가 발생한다.

// 객체 리터럴을 대입했냐, 변수를 대입했냐에 따라 타입 검사 방식이 달라진다.
const example: Example = {
  hello: "hi",
  why: "나만 에러야",
};

const obj = {
  hello: "hi",
  why: "나는 에러 아니야",
};

const example2: Example = obj;

{
  interface Money {
    amount: number;
    unit: string;
  }

  const money = { amount: 1000, unit: "won", error: "에러아님" };

  function addMoney(money1: Money, money2: Money): Money {
    return {
      amount: money1.amount + money2.amount,
      unit: "won",
    };
  }

  addMoney(money, { amount: 3000, unit: "money", error: "에러" });
  //Object literal may only specify known properties, and 'error' does not exist in type 'Money'.ts(2353)
  //개체 리터럴은 알려진 속성만 지정할 수 있으며 'error'는 'Money' 유형에 존재하지 않습니다.ts(2353)
}

{
  const {
    prop: { nested, ...rest },
  } = { prop: { nested: "hi", a: 1, b: true } };

  const spread = { a: "hi", b: 123 };
  const obj = { ...spread };
}

{
  // 자주하는 실수
  // nested 의 타입을 string으로 표기한 것이 아니라, nested 속성 값을 string이라는 변수 이름에 대입한 것
  const {
    prop: { nested: string },
  } = {
    prop: { nested: "hi" },
  };

  console.log(nested);
  console.log(string);
}

{
  const {
    prop: { nested },
  }: { prop: { nested: string } } = {
    prop: { nested: "hi" },
  };

  console.log(nested);
}

//✅ - 수식어 : 수식어가 제거된 채로 속성을 가져온다.
{
  interface Original {
    readonly name?: string;
    readonly age?: number;
    readonly married?: boolean;
  }

  type Copy = {
    -readonly [key in keyof Original]-?: Original[key];
  };
}
