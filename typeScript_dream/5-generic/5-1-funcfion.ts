function checkNotBad(arg: number | null): number {
  if (arg === null) {
    throw new Error('not valid number!');
  }
  return arg;
}

function checkNotNullAnyBad(arg: any | null): any {
  if (arg == null) {
    throw new Error('not valid number!');
  }
  return arg;
}
const result = checkNotNullAnyBad(123);

// generic 사용 코드
function checkNotNull<T>(arg: T | null): T {
  if (arg == null) {
    throw new Error('not valid number!');
  }
  return arg;
}

const number = checkNotNull(123);
const bool: boolean = checkNotNull(true);
