//1. 규격 정의하기
interface Stack<T> {
  readonly size: number;
  push(value: T): void;
  pop(): T;
}

type StackNode<T> = {
  readonly value: T;
  readonly next?: StackNode<T>;
};

// 왜부, 내부 변수이름이 동일한 경우 _ (언더스코어) 사용
class StackImpl<T> implements Stack<T> {
  private _size: number = 0;
  private head?: StackNode<T>;

  constructor(private capacity: number) {}

  get size() {
    return this._size;
  }

  push(value: T) {
    if (this.size === this.capacity) throw new Error('Stack is full');

    const node = { value, next: this.head };
    this.head = node;
    this._size++;
  }

  pop(): T {
    if (this.head == null) {
      throw new Error('Stack is Empty!');
    }

    const node = this.head;
    this.head = node.next;
    this._size--;

    return node.value;
  }
}

const stack = new StackImpl<string>(10);
stack.push('sangwoo 1');
//console.log(stack);
/* 
StackImpl {
  capacity: 10,
  _size: 1,
  head: { value: 'sangwoo 1', next: undefined }
}
*/
stack.push('bob 2');
console.log(stack);
stack.push('steve 3');

while (stack.size !== 0) {
  console.log(stack.pop());
}

const stack2 = new StackImpl<number>(10);
stack2.push(123);
stack2.push(456);
console.log(stack2);
stack2.push(789);

while (stack2.size !== 0) {
  console.log(stack2.pop());
}
