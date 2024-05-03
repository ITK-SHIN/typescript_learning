function add(x, y) {
    return x + y;
}
add(1, 2); // 3
add("1", "2"); // '12'
add(1, "2"); // '12'
add("1", 2); // '12'
// 제네릭 사용하기
// 1. 같은 타입은 하나의 문자로 표기
function add2(x, y) {
    return x + y;
}
add2(1, 2);
add2(1, 2);
add2("1", "2");
add2("1", "2");
add2(1, "2"); //error
add2(true, false); //error
export {};
// <T extends {...}> // 특정 객체
// <T extends any[]> // 모든 배열
// <T extends (...args: any) => any> // 모든 함수
// <T extends abstract new (...args: any) => any> // 생성자 타입
// <T extends keyof any> // string | number | symbol
