{
  /**
   * Print Loading State
   */

  // 4.12 아쉽게 실패 -> return 말고 의도는 console.log 하라는 거였음
  type LoadingState = {
    state: "loading";
  };

  type SuccessState = {
    state: "success";
    response: {
      body: string;
    };
  };

  type FailState = {
    state: "fail";
    reason: string;
  };

  type ResourceLoadState = LoadingState | SuccessState | FailState;

  const printLoginState = (state: ResourceLoadState) => {
    switch (state.state) {
      case "loading":
        return "👀 loading...";
      case "success":
        return "😃 loaded";
      case "fail":
        return " 😱 no network";
    }
  };

  printLoginState({ state: "loading" }); // 👀 loading...
  printLoginState({ state: "success", response: { body: "loaded" } }); // 😃 loaded
  printLoginState({ state: "fail", reason: "no network" }); // 😱 no network
}
