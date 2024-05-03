// 2-14. 제네릭으로 타입을 함수처럼 사용하자
// 자바스크립트는 값에 중복이 발생하면 함수를 만들어 중복을 제거하곤 한다.
const Person1 = {
    type: "human",
    race: "yellow",
    name: "zero",
    age: 28,
};
const Person2 = {
    type: "human",
    race: "yellow",
    name: "nero",
    age: 32,
};
{
    const PersonFactory = (name, age) => ({
        type: "human",
        race: "yellow",
        name,
        age,
    });
    const Person1 = PersonFactory("zero", 28);
    const Person2 = PersonFactory("nero", 32);
}
//클래스, 타입 별칭, 함수도 제네릭을 가질 수 있다.
{
    class Person1 {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
    }
}
// 함수에서는 함수 선언문이냐 표현식이냐에 따라 제네릭 표기 위치가 다르므로 주의
const personFactoryE = (name, age) => ({
    type: "human",
    race: "yellow",
    name,
    age,
});
function personFactoryD(name, age) {
    return {
        type: "human",
        race: "yellow",
        name,
        age,
    };
}
// interface와 type 간에 교차 사용도 가능하다.
{
}
// 객체나 클래스의 메서드에 따로 제네릭을 표기할 수도 있다.
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    method(param) { }
}
//ts는 제네릭에 직접 타입을 넣지 않아도 추론을 통해 타입을 알아낼 수 있다.
{
    const personFactoryE = (name, age) => ({
        type: "human",
        race: "yellow",
        name,
        age,
    });
    const zero = personFactoryE("zero", 28);
}
// 타입스크립트 5.0버전에서 상수 타입 매개변수가 추가되었다.
function values(initial) {
    return {
        hasValue(value) {
            return initial.includes(value);
        },
    };
}
const savedValues = values(["a", "b", "c"]);
savedValues.hasValue("x");
// 만약 T를 string 대신 'a' | 'b' | 'c' 와 같은 유니언으로 추론되게 하고 싶으면 어떻게?
{
    function values(initial) {
        return {
            hasValue(value) {
                return initial.includes(value);
            },
        };
    }
    const savedValues = values(["a", "b", "c"]);
    savedValues.hasValue("x");
}
// 5.0 버전에서는 상수 타앱 매개변수가 도입되어 다음과 같이 해도 된다.
{
    function values(initial) {
        return {
            hasValue(value) {
                return initial.includes(value);
            },
        };
    }
    const savedValues = values(["a", "b", "c"]);
    savedValues.hasValue("x");
}
export {};
