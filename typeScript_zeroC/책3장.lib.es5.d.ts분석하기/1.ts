// 기존 객체의 속성을 전부 옵셔널로 만드는 Partial 함수

// 1. My를 붙이지 않으면 lib.es5.d.ts의 선언과 중복되기 때문에 붙임

type MyPartial<T> = {
  [P in keyof T]?: T[P];
};

type Result = MyPartial<{ a: string; b: number }>;
