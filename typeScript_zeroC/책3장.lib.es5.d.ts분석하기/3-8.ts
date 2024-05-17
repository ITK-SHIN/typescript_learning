//3.8: reduce 분석
const r1 = [1, 2, 3].myReduce((a, c) => a + c);
const r2 = [1, 2, 3].myReduce((a, c, i, arr) => a + c, 10);
const r3 = [{ num: 1 }, { num: 2 }, { num: 3 }].myReduce(function (a, c) {
  return { ...a, [c.num]: "hi" };
}, {});

const r4 = [{ num: 1 }, { num: 2 }, { num: 3 }].myReduce(function (a, c) {
  return a + c.num;
}, "");

interface Array<T> {
  myReduce(callback: (a: T, c: T, i: number, arr: T[]) => T, iV?: T): T;
  myReduce<S>(callback: (a: S, c: T, i: number, arr: T[]) => S, iV: S): S;
}
