// {} , Object는 모든 타입 ( null 과 undefined 제외)

const x: {} = "hello";
const y: Object = "hi";
const xx: object = "hi";
const yy: object = { hello: "world" }; // object 지양, interface  , type, class 사용하기
const z: unknown = "hi";

// unknonw =  {} | null | undefined
if (z) {
  z;
} else {
  z;
}
