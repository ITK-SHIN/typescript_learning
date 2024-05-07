function zip(
  x: number,
  y: string,
  z: boolean
): { x: number; y: string; z: boolean } {
  return { x, y, z };
}

// T extends (...args:any) => any -> T는 무조건 함수여야 된다는 것 의미
//  T extends (...args: infer A) => any? A : never; =>
type P<T extends (...args: any) => any> = T extends (...args: infer A) => any
  ? A
  : never;

type R<T extends (...args: any) => any> = T extends (...args: any) => infer A
  ? A
  : never;

type params = P<typeof zip>;
type Ret = R<typeof zip>;
