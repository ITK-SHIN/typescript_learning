//2-7-3 : void
// 1. 함수의 반환값이 없는 경우 반환값이 void 타입으로 추론된다.
function noReturn() { }
//2. void는 함수의 반환값을 무시하도록 하는 특수한 타입이다.
// void 타입을 통해서 사용자가 이 함수의 반환값을 사용하지 못하도록 막을 수 있다.
const func = () => 3;
const value = func(); // const value: void
const func2 = () => 3;
const func3 = () => 3;
// 조심해야 할 점
// func2 처럼 반환값의 타입만 따로 표기하는 경우에는 반환값을 무시하지 않는다.
// func 처럼 함수 전체의 타입을 표기해야 적용된다.
// 즉, () => void만  반환값을 무시하고, () => void | undefined처럼 다른 타입인 경우는 무시하지 않는다.
// void를 활용하여 반환값을 무시하는 특성은 콜백 함수에 주로 사용된다.
[1, 2, 3].forEach((v) => v);
[1, 2, 3].forEach((v) => console.log(v));
// 배열의 forEach 메서드는 콜백 함수를 인수로 받는다.
// 첫 번째 콜백 함수는 숫자 반환, 두 번쨰 콜백함수는 undefined를 반환(console.log의 반환값이 undefined)
// 콜백 함수의 타입은 (v: number | undefined) 일까?
// 누군가 다음과 같이 사용한다면 어떻게 해야할까?
[1, 2, 3].forEach((v) => v.toString());
//위와같이 forEach의 콜백 함수는 미리 타이핑하기 곤란함
// 사용자가 그때그때 반환값을 다르게 정할 수 있기때문
// 이런 이유로, 콜백 함수의 타이핑을 미리 해두기 곤란하므로 어떠한 반환값이든 다 받을 수 있는 void 타입 등장
// (v:number) => void로 타이핑 하면 모든 문제가 해결됨!!
// 3. void의 두 가지 목적
// - 사용자가 함수의 반환값을 사용하지 못하도록 제한
// - 반환값을 사용하지 않는 콜백 함수를 타이핑할 때 사용
/* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */
// 1. () => void 형식  -> 리턴값이 있어도 사용하지 않겠다
// 2. : void 형식 -> 리턴값이 없어야 한다
{
    function a() {
        return;
    }
    const b = a();
}
{
    const human = {
        talk() {
            return "abc";
        },
    };
}
let target = [];
forEach([1, 2, 3], (el) => target.push(el));
forEach([1, 2, 3], (el) => {
    target.push(el);
});
{
    const a = {
        talk: () => {
            return 3;
        },
    };
    const b = a.talk();
}
export {};
