// 2.28: 원시 자료형에도 브랜딩 기법을 사용할 수 있다.

// 이 기법 사용시 string, number 같은 원시 자료형 타입도 더 세밀하게 구분할 수 있다.
{
  function kmToMile(km: number) {
    return km * 0.62;
  }

  const mile = kmToMile(3);
}

// 브랜딩 기법을 사용해서 더 구체적으로 타입 정하기
type Brand<T, B> = T & { _brand: B };
type KM = Brand<number, "km">;
type Mile = Brand<number, "mile">;

function kmToMile(km: KM) {
  return (km * 0.62) as Mile;
}

const km = 3 as KM;
const mile = kmToMile(km);

const mile2 = 5 as Mile;
kmToMile(mile2);

// 타입을 더 정밀하게 활용할수록 안정성도 올라간다.
