// 2.20.1 : 추상클래스
/* implements 보다 조금 더 구체적으로 클래스 모양을 정의하는 방법 */
// 1. abstract 속성이나 메서드를 구현하지 않으면 에러발생
{
    class AbstractPerson {
        constructor(name, age, married) {
            this.married = false;
            this.name = name;
            this.age = age;
            this.married = married;
        }
        sayName() {
            console.log(this.name);
        }
    }
    class RealPerson extends AbstractPerson {
        sayAge() {
            console.log(this.age);
        }
    }
}
// ✅ 올바르게 구현한 코드
class AbstractPerson {
    constructor(name, age, married) {
        this.married = false;
        this.name = name;
        this.age = age;
        this.married = married;
    }
    sayName() {
        console.log(this.name);
    }
}
class RealPerson extends AbstractPerson {
    constructor() {
        super(...arguments);
        this.value = 0;
    }
    sayAge() {
        console.log(this.age);
    }
    sayMarried() {
        console.log(this.married);
    }
}
export {};
