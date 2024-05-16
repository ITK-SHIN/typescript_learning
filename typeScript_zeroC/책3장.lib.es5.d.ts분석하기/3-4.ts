// 3.4 : ThisType
// 메서드들에 this를 한 방에 주입하는 타입

{
  const obj = {
    data: {
      money: 0,
    },

    methods: {
      addMoney(amount: number) {
        this.money += amount;
      },

      useMoney(amount: number) {
        this.money -= amount;
      },
    },
  };
}

{
  type Data = { money: number };
  type Methods = {
    addMoney(this: Data & Methods, amount: number): void;
    useMoney(this: Data & Methods, amount: number): void;
  };

  type Obj = {
    data: Data;
    methods: Methods;
  };
}

const obj: Obj = {
  data: {
    money: 0,
  },

  methods: {
    addMoney(amount: number) {
      this.money += amount;
    },

    useMoney(amount: number) {
      this.money -= amount;
    },
  },
};

// (this. Data & Methods) 중복 발생
// ThisType 타입 사용시 중복 제거 가능

type Data = { money: number };

type Methods = {
  addMoney(amount: number): void;
  useMoney(amount: number): void;
};

type Obj = {
  data: Data;
  methods: Methods & ThisType<Data & Methods>;
};
