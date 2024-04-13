{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // public : 기본값
  // private: 외부에서 볼 수 없고, 접근 X
  // protected: 외부접근 x , 자식 클래스에서만 접근 o
  class CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7; // class level
    private coffeeBeans: number = 0; // 커피콩 변수 instance(object ) level

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }

    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error("value for beans should be greater than 0");
      }

      this.coffeeBeans += beans;
    }

    //커피만드는 함수
    makeCoffee(shots: number): CoffeeCup {
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAM_PER_SHOT) {
        throw new Error("Not enough coffee beans! ");
      }

      this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAM_PER_SHOT;
      return {
        shots,
        hasMilk: false,
      };
    }
  }

  console.log(CoffeeMaker);

  const maker = CoffeeMaker.makeMachine(32);
  maker.fillCoffeeBeans(32);

  console.log(maker);
}
