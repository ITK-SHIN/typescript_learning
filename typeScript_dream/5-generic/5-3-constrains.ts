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

// 세부적인 타입을 인자로 받아서 정말 추상적인 타입으로 다시 리턴하는 함수는 💩💩
function payBad(employee: Employee): Employee {
  employee.pay();
  return employee;
}

// generic 으로 구현하기
function pay<E extends Employee>(Employee: E): E {
  Employee.pay();
  return Employee;
}

const Sangwoo = new FullTimeEmployee();
const bob = new PartTimeEmployee();
Sangwoo.workFullTime();
bob.workPartTime();

//const SangwooAfterPay = payBad(Sangwoo); // const SangwooAfterPay: Employee
const SangwooAfterPay = pay(Sangwoo);
const bobAfterPay = pay(bob);
SangwooAfterPay.workFullTime();

const obj = {
  name: 'sangwoo',
  age: 25,
};

const obj2 = {
  animal: '🦄',
};
/* 
 나의 코드
function getValue<T>(object: T, key: keyof T): T[keyof T] {
  return object[key];
} */

function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

console.log(getValue(obj, 'name')); // sangwoo
console.log(getValue(obj, 'age')); // 20
console.log(getValue(obj2, 'animal')); // 🦄
