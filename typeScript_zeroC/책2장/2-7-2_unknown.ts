{
  const a: unknown = "hello";
  const b: unknown = "world";

  //'a' is of type 'unknown'.ts(18046)
  // 'b' is of type 'unknown'.ts(18046)
  a + b;

  //'a' is of type 'unknown'.ts(18046)
  a.slice();
}
