{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean; // ?: 는 옵션
  };

  /* interface ->  이런 규약을 가지고 있다고 명시해 놓는 계약서 같은 것 */
  /* 규칙 : 1번 or 2번 택1
  1. inferface 이름 앞에 "I를 붙인다." ex) CoffeeMaker -> ICoffeeMaker
  2. class 이름 뒤에 "Impl" (Implementation 구현) 을 붙인다. ex) CoffeeMaker -> CoffeeMakerImpl
   */
  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7; // class level
    private coffeeBeans: number = 0; // 커피콩 변수 instance(object ) level

    constructor(coffeeBeans: number) {
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

  interface MilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup;
  }

  interface SugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup;
  }

  // 싸구려 우유 거품기
  class CheapMilkSteamer implements MilkFrother {
    private steamMilk(): void {
      console.log(`Steaming some milk ... 🥛`);
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  class FancyMilkSteamer implements MilkFrother {
    private steamMilk(): void {
      console.log(`Fansy Steaming some milk ... 🥛`);
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  class ColdMilkSteamer implements MilkFrother {
    private steamMilk(): void {
      console.log(`Cold Steaming some milk ... 🥛`);
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  // 설탕 제조기
  class CandySugarMixer implements SugarProvider {
    private getSugar() {
      console.log('Getting some sugar from Candy 🍯 ');
      return true;
    }

    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSugar();
      return {
        ...cup,
        hasSugar: sugar,
      };
    }
  }

  class SugarMixer implements SugarProvider {
    private getSugar() {
      console.log('Getting some sugar from jar!!!! 🍯 ');
      return true;
    }

    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSugar();
      return {
        ...cup,
        hasSugar: sugar,
      };
    }
  }

  class CaffeLatteMachine extends CoffeeMachine {
    constructor(
      beans: number,
      public readonly serialNumber: string,
      private milkFrother: MilkFrother,
    ) {
      super(beans);
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);

      return this.milkFrother.makeMilk(coffee);
    }
  }

  // coffee cup에 설탕 추가하는 class
  class SweetCoffeeMaker extends CoffeeMachine {
    constructor(
      private beans: number,
      private sugar: SugarProvider,
    ) {
      super(beans);
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);

      return this.sugar.addSugar(coffee);
    }
  }

  class SweetCaffeLatteMachine extends CoffeeMachine {
    constructor(
      private beans: number,
      private milk: MilkFrother,
      private sugar: SugarProvider,
    ) {
      super(beans);
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      const sugarAdded = this.sugar.addSugar(coffee);
      return this.milk.makeMilk(sugarAdded);
    }
  }

  // Milk
  const cheapMilkMaker = new CheapMilkSteamer();
  const fancyMilkMaker = new FancyMilkSteamer();
  const coldMilkMaker = new ColdMilkSteamer();

  // Sugar
  const candySugar = new CandySugarMixer();
  const sugar = new SugarMixer();

  const sweetCandyMachine = new SweetCoffeeMaker(12, candySugar);
  const sweetMachine = new SweetCoffeeMaker(12, sugar);

  const latteMachine = new CaffeLatteMachine(12, 'SS', cheapMilkMaker);
  const clodLatteMachine = new CaffeLatteMachine(12, 'SS', coldMilkMaker);
  const sweetLatteMachine = new SweetCaffeLatteMachine(
    12,
    cheapMilkMaker,
    candySugar,
  );
}
