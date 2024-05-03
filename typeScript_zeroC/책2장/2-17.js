// 2.17 : 같은 이름의 함수를 여러 번 선언할 수 있다.
// 1. 타입스크립트에서는 매개변수에 어떤 타입과 값이 들어올지 미리 타입 선언해야 한다.
function add(x, y) {
    return x + y;
}
// 원하는 것은 (1,2) 나 ('1', '2') 와 같이 같은 타입만 되도록 하는거였음
add(1, 2);
add("1", "2");
add(1, "2");
add("1", 2);
// 1-1. 이럴때 필요한 기법이 오버로딩 (overloading)
// 호출할 수 있는 함수의 타입을 미리 여러 개 타이핑해두는 기법
{
    function add(x, y) {
        return x + y;
    }
    add(1, 2);
    add("1", "2");
    add(1, "2");
    add("1", 2);
}
function example(param) {
    if (param) {
        return "string";
    }
    else {
        return 123;
    }
}
// 여러 오버로딩에 동시에 해당될 수 있는 경우는 제일 먼저 선언된 오버로딩에 해당된다.
const result = example("what"); // const result: string
// 1-2-1. 오버로딩 순서 바꿔보기
{
    function example(param) {
        if (param) {
            return "string";
        }
        else {
            return 123;
        }
    }
    const result = example("what"); // const result: number
}
// 1-3. 오버로딩의 순서는 좁은 타입에서 넓은 타입순으로 오게 해야 문제가 없다.
// 2. 인터페이스로도 오버로딩을 표현할 수 있다.
{
    const add = (x, y) => x + y;
    add(1, 2);
    add("1", "2");
    add(1, "2");
    add("1", 2);
}
//3. 오버로딩할 때 주의점 : 너무 지나치게 오버로딩을 활용하면 안된다.
//3-1. 오버로딩 할 필요가 없는데 오버로딩했다가 문제가 되는 경우
{
    function a(param) { }
    function errorA(param) {
        a(param);
    }
    function b(p1, p2) { }
    function errorB(p1, p2) {
        b(p1, p2);
    }
}
// 3-2. 오버로딩 제거시 에러 메시지가 사라진다.
{
    function a(param) { }
    function errorA(param) {
        a(param);
    }
    function b(p1, p2) { }
    function errorB(p1, p2) {
        b(p1, p2);
    }
}
export {};
// 유니언이나 옵셔널 매개변수를 활용할 수 있는 경우는 오버로딩을 쓰지 않는 게 좋다.
