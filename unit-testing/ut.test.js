import { absoluteNum } from "./num-lib.js";

test("AbsoluteNumber tests", () => {
  const negativeCase = absoluteNum(-5);
  expect(negativeCase).toBe(5);
});
