//3.7: filter 만들기

const r1 = [1, 2, 3].myFilter((v) => v < 2);
const r2 = [1, 2, 3].myFilter((v, i, a): v is never => false);
const r3 = ["1", 2, "3"].myFilter((v): v is string => typeof v === "string");
const r4 = [{ num: 1 }, { num: 2 }, { num: 3 }].myFilter(function (v) {
  return v.num % 2 === 1;
});

/* interface Array<T> {
  myFilter(callback: (v: T, i: number, a: T[]) => void, thisArg?: any): T[];
}
 */

interface Array<T> {
  myFilter<S extends T>(
    callback: (v: T, i: number, a: T[]) => v is S,
    thisArg?: any
  ): S[];
  myFilter(callback: (v: T, i: number, a: T[]) => boolean, thisArg?: any): T[];
}
