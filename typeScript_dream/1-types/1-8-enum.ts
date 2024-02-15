{
  /*
   * Enum
   */
  // JavaScript
  const MAX_NUM = 6;
  const MAX_STUDENT_PER_CLASS = 10;
  //연관된 상수 정의
  const MONDAY = 0;
  const TUESDAY = 1;
  const WEDNESDAY = 2;

  // JS에서 Enum에 가깝게 정의하기
  const DAYS_ENUM = Object.freeze({ MONDAY: 0, TUESDAY: 1, WEDNEDAY: 2 });
  const dayOfToday = DAYS_ENUM.MONDAY;

  // TypeScript
  type DaysOfWeek = "Monday" | "Tuesday" | " Wednesday";
  enum Days {
    Monday = "monday",
    Tuesday = "tuesday",
    Wednesday = "wednesday",
    Thursday = "thu",
    Friday = "fri",
    Satarday = "sat",
    Sunday = "sun",
  }

  console.log(Days.Monday); // 0
  let day: Days = Days.Satarday;
  day = Days.Tuesday;
  day = 10;
  console.log(day); // 5

  let DaysOfWeek: DaysOfWeek = "Monday";
  DaysOfWeek = "Tuesday";
}
