//타입을 구분해주는 커스텀 함수를 직접 만들 수 있다.
function catOrDog(a) {
    if (a.meow) {
        return false;
    }
    return true;
}
const cat = { meow: 3 };
if (catOrDog(cat)) {
    console.log(cat.meow);
}
if ("meow" in cat) {
    console.log(cat.meow);
}
const isRejected = (input) => input.status === "rejected";
const isFulfilled = (input) => input.status === "fulfilled";
const promises = await Promise.allSettled([
    Promise.resolve("a"),
    Promise.resolve("b"),
]);
const errors = promises.filter(isRejected);
export {};
