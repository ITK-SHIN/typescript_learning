// 구현부 만들기 싫을 떄, -> declare 붙이기

declare function forEach(arr: number[], callback: (el: number) => void): void;
// declare function forEach<T>(arr: T[], callback: (el: T) => void): void;
let target: number[] = [];
forEach([1, 2, 3], (el) => target.push(el));

interface A {
  talk: () => void;
}
const a: A = {
  talk() {
    return 3;
  },
};

const b: unknown = a.talk();
(b as A).talk();

/*  unknown 과 any */
// any 쓸 바에는 unknown을 쓰자.
// any의 문제점은 타입스크립트가 타입 검사를 포기한다.  -> 타입스크립트 쓰는 의미가 사라짐
// unknown 도 되도록 안쓰는게 좋지만, 지금 타입을 모르겠을때 사용하는 것이다.

try {
} catch (error) {
  (error as Error).message;
}
