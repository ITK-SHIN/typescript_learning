//2.27: 타입스크립트는 건망증이 심하다.

try {
} catch (error) {
  if (error as Error) {
    error.message;
  }
}

/* 타입 주장은 변수에 적용해야만 타입이 유지된다.  */
try {
} catch (error) {
  const err = error as Error;
  if (err) {
    err.message;
  }
}

/* 클래스의 인스턴스인 경우만 가능 */
try {
} catch (error) {
  if (error instanceof Error) {
    error.message;
  }
}
