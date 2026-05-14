import { absoluteNum } from "./num-lib.js";

describe("Absolute Number", () => {
  it("tests for Positive number", () => {
    const negativeCase = absoluteNum(5);
    expect(negativeCase).toBe(5);
  });

  it("tests for Negative number ", () => {
    const negativeCase = absoluteNum(-5);
    expect(negativeCase).toBe(5);
  });

   it("tests for  number ", () => {
    const negativeCase = absoluteNum(0);
    expect(negativeCase).toBe(0);
  });
});
