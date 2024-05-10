// 2.25: 정교한 문자열 조작을 위해 템플릿 리터럴 타입 사용

// 1. ts 에서는 값 대신 타입을 만들기 위해 사용한다.
{
  type Literal = "literal";
  type Template = `template ${Literal}`;
  const str: Template = "template literal";
}

// 2. 조금 더 타입 넓혀보기
// 템플릿 리터럴 사용시 문자열 변수를 엄격하게 관리할 수 있다.
type Template = `template ${string}`;
let str: Template = "template ";
str = "template hello";
str = "template 123";
str = "template"; // Type '"template"' is not assignable to type '`template ${string}`'.ts(2322)

type City = "seoul" | "suwon" | "busan";
type Vehicle = "car" | "bike" | "walk";
type ID = `${City}:${Vehicle}`;
const id: ID = "seoul:walk";

//3. 좌우 공백이 있는 문자열 타입에서 공백 제거하기
// 'xxtestxx' -> 'test'
{
  type RemoveX<Str> = Str extends `x${infer Rest}`
    ? RemoveX<Rest>
    : Str extends `${infer Rest}x`
    ? RemoveX<Rest>
    : Str;

  type Removed = RemoveX<"xxtestxx">; // type Removed = "test"
}
//양쪽 공백을 지우는 함수 (RemoveX 응용)
type RemoveEmpty<Str> = Str extends ` ${infer Rest}`
  ? RemoveEmpty<Rest>
  : Str extends `${infer Rest} `
  ? RemoveEmpty<Rest>
  : Str;

type Removed = RemoveEmpty<" test ">;
