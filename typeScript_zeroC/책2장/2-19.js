/* 2.19 : 공변성과 반공변성을 알아야 함수끼리 대입할 수 있다. */
/*
- 공변성     : A -> B 일 때, T<A> -> T<B> 인 경우
- 반공변성 : A -> B 일 때, T<B> -> T<A> 인 경우

- 이변성     : A -> B일 때 T<A> < -> T<B> 되는 경우
- 무공변성 : A ->B일 때 T<A> <-> T<B>도 안 되는 경우
*/
// 1. 기본적으로 타입스크립트는 공변성을 갖고 있다.
// 2. 기본적으로 함수의 매개변수는 반공변성을 갖고 있다.
// TS Config 메뉴에서 strictFunctionTypes 옵션이 체크되어 있어야 한다.
// strictFunctionTypes 옵션은 strict 옵션에 체크되어 있을 때 자동으로 활성화 된다.
// strict 와 strictFunctionTypes 모두 체크되어 있지 않다면 타입스크립트는 매개변수에 대해 이변성을 갖는다.
// ✅ 공변성
// a -> b
// T<A> -> T<B>
function a(x) {
    return 0;
}
let b = a;
// ✅ 반공변성
// b -> a
{
    function a(x) {
        return 0;
    }
    let b = a;
}
// 매개변수는 strict 옵션에서 반공변성을 가진다고 했다.
// b-> a
// T(A) -> T(B)
{
    function a(x) {
        return 0;
    }
    let b = a;
}
// 반대는 에러가 발생
// a -> b (o)
// T(A) -> T(B) (X)
// 매개변수는 strict 옵션일 때 반공변성,
// strict 옵션이 아닐 때는 이변성
// ✅ 매개변수는 반공변성 또는 이변성이라는 것만 기억하자
{
    function a(x) {
        return 0;
    }
    let b = a;
}
const sayFunc = (a) => "hello";
const MyAddingMethod = {
    say: sayFunc, // 이변성
};
const MyAddingFunction = {
    say: sayFunc, // 반공변성
};
const MyAddingCall = {
    say: sayFunc, // 반공변성
};
export {};
// 함수(매개변수) : 반환값   👉 매개변수가 이변성을 갖는다.
// 함수: (매개변수) => 반환값 👉 반공변성
