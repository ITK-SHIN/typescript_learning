//타입 좁히기 (타입가드)
function numOrStr(a: number | string) {
  if (typeof a === "string") {
    a.split(",");
  } else {
    a.toFixed(1);
  }
}

numOrStr("123");
numOrStr(1);

function numOrNumArr(a: number | number[]) {
  if (Array.isArray(a)) {
    a.slice(1);
  } else {
    a.toFixed(1);
  }
}

class A {
  aaa() {}
}

class B {
  bbb() {}
}

function aOrB(param: A | B) {
  if (param instanceof A) {
    param.aaa();
  }
}
