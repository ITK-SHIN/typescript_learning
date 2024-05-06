//1. 규격 정의하기
interface Stack {
  readonly size: number;
  push(value: string): void;
  pop(): string;
}

type StackNode = {
  readonly value: string;
  readonly next?: StackNode;
};

// 왜부, 내부 변수이름이 동일한 경우 _ (언더스코어) 사용
class StackImpl implements Stack {
  private _size: number = 0;
  private head?: StackNode;

  constructor(private capacity: number) {}

  get size() {
    return this._size;
  }

  push(value: string) {
    if (this.size === this.capacity) throw new Error('Stack is full');

    const node: StackNode = { value, next: this.head };
    this.head = node;
    this._size++;
  }

  pop(): string {
    if (this.head == null) {
      throw new Error('Stack is Empty!');
    }

    const node = this.head;
    this.head = node.next;
    this._size--;

    return node.value;
  }
}

const stack = new StackImpl(10);
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
