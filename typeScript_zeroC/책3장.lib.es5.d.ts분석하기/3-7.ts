//3.7: filter 만들기

const r1 = [1, 2, 3].myFilter((v) => v < 2);
const r2 = [1, 2, 3].myFilter((v, i, a) => {});
const r3 = ["1", 2, "3"].myFilter((v) => typeof v === "string");
const r4 = [{ num: 1 }, { num: 2 }, { num: 3 }].myFilter(function (v) {
  return v.num % 2;
});

interface Array<T> {
  myFilter(callback: (v: T, i: number, a: T[]) => void, thisArg?: any): T[];
}
