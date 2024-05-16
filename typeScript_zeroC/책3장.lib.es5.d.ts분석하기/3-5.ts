//3.5 : forEach 만들기

//[1, 2, 3].myForEach(() => {});
[1, 2, 3].myForEach(() => {});
[1, 2, 3].myForEach((v, i, a) => {
  console.log(v, i, a);
});
[1, 2, 3].myForEach((v, i) => console.log(v));
[1, 2, 3].myForEach((v) => 3);
["1", "2", "3"].myForEach((v) => console.log(v.slice(0)));
/* [true,2,'3'].myForEach((v)=> {
  if(typeof v === 'string'){
    v.slice(0);
  } else {
    v.toFixed();
  }
})
 */

[1, 2, 3].myForEach(
  function () {
    console.log(this);
  },
  { a: "b" }
);

interface Array<T> {
  myForEach<K = Window>(
    callback: (this: K, v: T, i: number, a: T[]) => void,
    thisArg?: K
  ): void;
}

/* [1,2,3].forEach(function(){
  console.log(this);
}) */
/* interface Array<T> {
  myForEach(callback:(v:number, i:number, a: number[])=> void): void;
}

 */

/*
✅ lib.es5.d.ts 의 forEach 메서드
interface Array<T>{
  forEach(callbackfn: (value: T ,index: number, array: T[])=> void, thisArg? :any):void
} 
*/
