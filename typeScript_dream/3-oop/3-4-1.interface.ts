{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  /* interface ->  이런 규약을 가지고 있다고 명시해 놓는 계약서 같은 것 */
  /* 규칙 : 1번 or 2번 택1
  1. inferface 이름 앞에 "I를 붙인다." ex) CoffeeMaker -> ICoffeeMaker
  2. class 이름 뒤에 "Impl" (Implementation 구현) 을 붙인다. ex) CoffeeMaker -> CoffeeMakerImpl
   */
  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  interface CommercialCoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
    fillCoffeeBeans(beans: number): void;
    clean(): void;
  }

  class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7; // class level
    private coffeeBeans: number = 0; // 커피콩 변수 instance(object ) level

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }

    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error('value for beans should be greater than 0');
      }

      this.coffeeBeans += beans;
    }

    clean() {
      console.log(`cleaning the machine...🚿`);
    }

    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);
      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAM_PER_SHOT) {
        throw new Error('Not enough coffee beans! ');
      }
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
    }

    private preheat(): void {
      console.log('heating up ... 🔥');
    }

    private extract(shots: number): CoffeeCup {
      console.log(`Pulling ${shots} shots... ☕`);

      return {
        shots,
        hasMilk: false,
      };
    }
    //커피만드는 함수
    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots); // 커피콩 갈기
      this.preheat(); // 커피 기계 데우기
      return this.extract(shots); // 커피 추출하기
    }
  }

  class AmateurUser {
    constructor(private machine: CoffeeMaker) {}

    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
    }
  }
  class ProBarista {
    constructor(private machine: CommercialCoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
      this.machine.fillCoffeeBeans(45);
      this.machine.clean();
    }
  }

  const maker: CoffeeMachine = CoffeeMachine.makeMachine(32);
  const amateur = new AmateurUser(maker);
  const pro = new ProBarista(maker);
  amateur.makeCoffee();
  console.log('ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ');
  pro.makeCoffee();
}
