// 2.13.1 구조적 타이핑
const liter = { amount: 1, unit: "liter" };
const circle = liter;
{
    const aObj = {
        name: "zero",
    };
    const bObj = {
        name: "nero",
        age: 32,
    };
    const aToA = aObj;
    const bToA = bObj;
    const aToB = aObj;
    const bTob = bObj;
}
{
    const copyArr = [1, 3, 9];
}
{
    const simpleArr = [1, 2, 3];
}
// 서로 대입하지 못하게 하기
// 1. 서로를 구분하기 위한 속성을 추가해야 한다.
// 즉, 구조적으로 동일하지 않게 만들어야 한다.
{
    const liter = { amount: 1, unit: "liter", _type: "liter" };
    const circle = liter;
}
export {};
