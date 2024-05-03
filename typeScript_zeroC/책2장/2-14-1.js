// 제네릭에 제약 걸기 p103
// 하나의 타입 매개변수가 다른 타입 매개변수의 제약이 될 수도 있다.
{
}
const returnV0 = () => {
    return { value: "test" }; //error
};
// 에러발생2
function onlyBoolean(arg = false) {
    return arg;
}
// onlyBoolean 함수를 유효하게 만들기
// 제네릭 사용X
{
    function onlyBoolean(arg = true) {
        return arg;
    }
}
// returnV0 함수 유효하게 만들기
// 제네릭 사용X
{
    const returnV0 = () => {
        return { value: "test" }; //error
    };
}
export {};
//✅ 강제적으로 제네릭을 쓸 필요는 없다.
//✅ 특히 원시값 타입만 사용한다면 대부분 제약을 걸지 않아도 되는 경우가 많다.
