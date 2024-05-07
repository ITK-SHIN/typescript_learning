// 2.21 : enum 은 자바스크립트에서도 사용할 수 있다.
//js에는 없는 타입이지만, js의 값으로 사용할 수 있는 특이한 타입
// 여러 상수를 나열하는 목적으로 쓰인다.
//1. NOVICE 처럼 enum 내부에 존재하는 이름을 멤버(member) 라고 부름
//2. enum은 사라지지 않고 자바스크립트 코드로 남는다.
/* enum Level {
  NOVICE,
  INTERMEDIATE,
  ADVANCED,
  MASTER,
} */
// 3. Level enum은 다음과 같은 js 코드가 된다.
/*
"use strict";
var Level;
(function (Level) {
    Level[Level["NOVICE"] = 0] = "NOVICE";
    Level[Level["INTERMEDIATE"] = 1] = "INTERMEDIATE";
    Level[Level["ADVANCED"] = 2] = "ADVANCED";
    Level[Level["MASTER"] = 3] = "MASTER";
})(Level || (Level = {}));
*/
/*
var Level ={
        0: "NOVICE",
        1: "INTERMEDIATE",
        2: "ADVANCED",
        3: "MASTER",
        NOVICE: 0,
        INTERMEDIATE:1,
        MASTER:2,
        MASTER:3,
}
*/
//3. 문자열도 할당 가능
//    단, 한 멤버를 문자열로 할당시 그 다음부터는 전부 직접 값 할당해야함
/* enum LevelS {
  NOVICE,
  INTERMEDIATE = "hello",
  ADVANCED = "oh",
  MASTER,
}
 */
// 4. enum 타입의 속성은 값으로도 활용 가능
var LevelV;
(function (LevelV) {
  LevelV[(LevelV["NOVICE"] = 0)] = "NOVICE";
  LevelV[(LevelV["INTERMEDIATE"] = 1)] = "INTERMEDIATE";
  LevelV[(LevelV["ADVANCED"] = 2)] = "ADVANCED";
  LevelV[(LevelV["MASTER"] = 3)] = "MASTER";
})(LevelV || (LevelV = {}));
const a = LevelV.NOVICE; // 0
const b = LevelV[LevelV.NOVICE]; // NOVICE
console.log(a);
console.log(b);
// 5. enum은 값보다 타입으로 사용하는 경우가 더 많다.
function whatsYourLevel(level) {
  console.log(LevelV[level]);
}
const myLevel = LevelV.ADVANCED;
whatsYourLevel(myLevel);
