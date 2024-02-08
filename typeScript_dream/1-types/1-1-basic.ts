{
  // JavaScript
  // old: var  -> 절대 사용 하지 말기💣
  var age = 5;
  age = 1;

  // let es6
  let name = "hello";
  name = "hi";
  // const
  const key = 5;
  // key = 5; // error
}

/*
 ***✅  JavaScript
 * Primitive: number, string, boolean, bigInt, symbol, null, undefined
 * Object: function, array, ...
 */
{
  // number
  const num: number = 1;

  // string
  const str: string = "hello";

  // boolean
  const boal: boolean = true;

  // undefined
  let name: undefined; // 💣 이렇게 사용은 안함
  let age: number | undefined; // 숫자 또는 udefined 할당 가능
  age = undefined;
  age = 1;

  // null
  let person: null; //💣 이렇게 사용은 안함
  let persen2: string | null; //

  // unknown  💣
  let notSure: unknown = 0;
  notSure = "he";
  notSure = true;

  // any 💣
  let anything: any = 0;
  anything = "hello";

  // void
  function print(): void {
    console.log("hello");
    return;
  }

  let unusable: void = undefined; // 💣

  //never
  function throwError(message: string): never {
    //message -> sever (log)
    throw new Error(message);
    while (true) {}
  }
  let newverEnding: never; // 💣

  //object
  let obj: object; // 💣
  function acceptSomeObject(obj: object) {}
  acceptSomeObject({ name: "ellie" });
  acceptSomeObject({ animal: "dog" });
}
