{
  /* Array */
  const foods: string[] = ["🍕,🍔"];
  //const scores: number[] = [1, 3, 4];
  const scores: Array<number> = [1, 3, 4]; // 제네릭

  //readonly 작성시 읽을 수만 있다.
  function printArray(fruits: readonly string[]) {}

  /* Tuple */
  // Tuple 사용 권장 X  ->  interface, type alias, class 로 사용 권장
  // 1. 데이터 인덱스로 접근시 가독성 떨어진다.

  let student: [string, number];
  student = ["name", 123];
  student[0]; // name
  student[1]; // 123

  // object destructuring 사용하기
  // const [name, age] = student;
}
