// 2.15.1 컨디셔널 타입 분배법칙 p109

type Start = string | number;
type Result = Start extends string ? Start[] : never; // type Result = string[]

// 검사하려는 타입이 제네릭이면서 유니언이면 분배법칙이 실행된다.
// Result<string | number> 는 Result<string> | Result<number> 가 된다.
{
  type Start = string | number;
  type Result<Key> = Key extends string ? Key[] : never;
  let n: Result<Start> = ["hi"]; // let n: string[]
}

//boolean에 분배법칙이 적용될 때는 조심해야 한다.
// boolean 을 true | false 로 인식하기 떄문
{
  type Start = string | number | boolean;
  type Result<Key> = Key extends string | boolean ? Key[] : never;
  let n: Result<Start> = ["hi"]; // let n: string[] | false[] | true[]
  n = [true];
}

/* 분배법칙이 일어나는 것을 막고싶을때 */
{
  type IsString<T> = T extends string ? true : false;
  type Result = IsString<"hi" | 3>; // type Result = boolean
}

{
  // 배열로 제네릭을 감싸면 분배법칙이 일어나지 않는다.
  type IsString<T> = [T] extends [string] ? true : false;
  type Result = IsString<"hi" | 3>; // type Result = false
}

/*  never도 분배법칙의 대상이 된다. */
// never가 유니언으로 보이지는 않지만, 유니언이라고 생각하는 것이 좋다.
{
  type R<T> = T extends string ? true : false;
  type RR = R<never>; // type RR = never
}

// 간단하게 컨디셔널 타입에서 제네릭과 never가 만나면 never가 된다고 생각하면 된다.
// 따라서 never를 타입 인수로 사용하려면 분배법칙이 일어나는 것을 막아야 한다.
{
  type IsNever<T> = [T] extends [never] ? true : false;
  type T = IsNever<never>;
  type F = IsNever<"never">;
}

// 위와 같은 이유로 제네릭과 컨디셔널 타입을 같이 사용할 때는 다음 사항을 조심해야 한다.

{
  function test<T>(a: T) {
    type R<T> = T extends string ? T : T;
    const b: R<T> = a; // Type 'T' is not assignable to type 'R<T>'.
  }
  // 여기서 문제는 R<T> 타입이 T가 될거라고 생각하는 것
  // 타입스크립트는 제네릭이 들어 있는 컨디셔널 타입을 판단할 때 값의 판단을 뒤로 미룬다.
  // 즉, 변수 b에 매개변수 A를 대입할 때까지도 타입스크립트는 R<T>가 T라는 것을 알지 못한다.
  // 그래서 T를 R<T>에 대입할 수 없다는 에러가 발생하는 것이다.
}

// 따라서 이떄도 타입스크립트가 판단을 뒤로 미루지 못하도록 배열로 제네릭을 감싸면 된다.
{
  function test<T extends [T] extends [string] ? string : never>(a: T) {
    type R<T> = [T] extends [string] ? T : T;
    const b: R<T> = a;
  }
  // 타입 매개변수를 선언할 때 바로 <[T] extends [string]> 하는것이 불가능하므로
  // 한 번 더 컨디셔널 타입으로 묶어 선언한 것
}
