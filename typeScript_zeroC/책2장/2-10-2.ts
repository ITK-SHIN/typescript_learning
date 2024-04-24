{
  //An index signature parameter type cannot be a literal type or generic type. Consider using a mapped object type instead.ts(1337)
  //인덱스 서명 매개변수 유형은 리터럴 유형이나 일반 유형일 수 없습니다.
  //대신 매핑된 개체 유형을 사용해 보세요.ts(1337)
  type HelloAndHi = {
    [key: "hello" | "hi"]: string;
  };
}

/* 매핑된 객체 타입 */
// 기존의 다른 타입으로부터 새로운 객체 속성을 만들어내는 타입을 의미
// 인터페이스에서는 쓰지 못하고, 타입 별칭에서만 사용할 수 있다.
{
  type HelloAndHi = {
    [key in "hello" | "hi"]: string;
  };
}

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

{
  type Tuple = [1, 2, 3];
  type CopyTuple = {
    [Key in keyof Tuple]: Tuple[Key];
  };

  const copyTuple: CopyTuple = [1, 2, 3];
}

{
  type Arr = number[];
  type CopyArr = {
    [key in keyof Arr]: Arr[key];
  };

  const copyArr: CopyArr = [1, 3, 9];
}

// 속성 이름 바꾸기
// Capitalize 는 타입스크립트에서 제공하는 타입으로 문자열의 첫 번째 자리를 대문자화한다.
// as 예약어를 통해 속성 이름을 어떻게 바꿀지 정할 수 있다.
{
  interface Original {
    name: string;
    age: number;
    married: boolean;
  }

  type Copy = {
    [key in keyof Original as Capitalize<key>]: Original[key];
  };

  /* 
        type Copy = {
    Name: string;
    Age: number;
    Married: boolean;
}
        */
}
