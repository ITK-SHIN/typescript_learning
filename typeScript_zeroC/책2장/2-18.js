/*  2.18 : 콜백 함수의 매개변수는 생략 가능하다. */
// 문맥적 추론(Contextual Typing)
function example(callback) { }
example((e, r) => { });
example(() => { });
example(() => true);
[1, 2, 3].forEach((item, index, array) => {
    console.log(item, index, array);
});
[1, 2, 3].forEach((item, index) => { });
[1, 2, 3].forEach((item) => item);
export {};
// 타입스크립트에서는 콜백함수의 매개변수는 따로 적지 않아도 옵셔널이다
