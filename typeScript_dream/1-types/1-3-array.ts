{
  // Array
  const foods: string[] = ["🍕,🍔"];
  const scores: Array<number> = [1, 3, 4];

  //readonly 작성시 읽을 수만 있다.
  function printArray(fruits: readonly string[]) {}

  //Tuple
  // Tuple 사용 권장 X  👉 interface, type alias, class 로 사용 권장
  let student: [string, number];
  student = ["name", 123];
  student[0]; // name
  student[1]; // 123

  // const [name, age] = student;
}
