interface Employee {
  pay(): void;
}

class FullTimeEmployee implements Employee {
  pay() {
    console.log('full time!');
  }

  workFullTime() {}
}

class PartTimeEmployee implements Employee {
  pay() {
    console.log(`part time!!`);
  }

  workPartTime() {}
}

// 세부적인 타입을 인자로 받아서 정말 추상적인 타입으로 다시 리턴하는 함수는 💩
function payBad(Employee: Employee): Employee {
  Employee.pay();
  return Employee;
}

function pay<E extends Employee>(Employee: E): E {
  Employee.pay();
  return Employee;
}

const Sangwoo = new FullTimeEmployee();
const bob = new PartTimeEmployee();
Sangwoo.workFullTime();
bob.workPartTime();

const SangwooAfterPay = pay(Sangwoo);
const bobAfterPay = pay(bob);
SangwooAfterPay.workFullTime();
