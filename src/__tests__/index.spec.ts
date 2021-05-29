import "jest";

import ProbabilityPool from "../index";

describe("ProbabilityPool", () => {
  it("works correctly for numbers only", () => {
    const pool = new ProbabilityPool({
      test1: 50,
      test2: 50,
    });
    const gots = Array(10)
      .fill(undefined)
      .map(() => pool.get());

    expect(
      gots.filter((el: any) => el.value === "test1").length
    ).toBeGreaterThanOrEqual(2);
    expect(
      gots.filter((el: any) => el.value === "test2").length
    ).toBeGreaterThanOrEqual(2);
  });

  it("works correctly for 100%", () => {
    const pool = new ProbabilityPool({
      test1: 100,
      test2: 0,
    });
    const gots = Array(10)
      .fill(undefined)
      .map(() => pool.get());

    expect(gots.filter((el: any) => el.value === "test1").length).toBe(10);
    expect(gots.filter((el: any) => el.value === "test2").length).toBe(0);
  });

  describe("auto", () => {
    it("auto 100%", () => {
      const pool = new ProbabilityPool({
        test1: "auto",
        test2: 0,
      });

      // @ts-ignore
      expect(pool.config.test1).toEqual(100);

      const gots = Array(10)
        .fill(undefined)
        .map(() => pool.get());

      expect(gots.filter((el: any) => el.value === "test1").length).toBe(10);
      expect(gots.filter((el: any) => el.value === "test2").length).toBe(0);
    });
    it("auto 50%", () => {
      const pool = new ProbabilityPool({
        test1: "auto",
        test2: 25,
        test3: 12.5,
        test4: 12.5,
      });

      // @ts-ignore
      expect(pool.config.test1).toEqual(50);

      const gots = Array(10)
        .fill(undefined)
        .map(() => pool.get());

      expect(
        gots.filter((el: any) => el.value === "test1").length
      ).toBeGreaterThanOrEqual(2);
    });
  });

  describe("recursive", () => {
    it("works for recursive entry", () => {
      const pool = new ProbabilityPool({
        test1: {
          probability: 100,
          config: {
            rTest1: {
              probability: 100,
              config: { rrTest1: 50, rrTest2: 50 },
            },
            rTest2: { probability: "auto", config: {} },
          },
        },
        test2: 0,
      });
      const gots = Array(10)
        .fill(undefined)
        .map(() => pool.get());

      expect(
        gots.filter((el: any) => el.value === "rrTest1").length
      ).toBeGreaterThanOrEqual(2);
      expect(
        gots.filter((el: any) => el.value === "rrTest2").length
      ).toBeGreaterThanOrEqual(2);
    });
  });

  it("works for probability <100", () => {
    expect(() => {
      const pool = new ProbabilityPool({
        test1: 100,
        test2: 50,
      });
    }).toThrow();
  });

  it("throws for more than 100%", () => {
    const pool = new ProbabilityPool({
      test1: 10,
      test2: 10,
    });
    const gots = Array(10)
      .fill(undefined)
      .map(() => pool.get());

    expect(
      gots.filter((el: any) => el.value === "test1").length
    ).toBeGreaterThanOrEqual(2);
    expect(
      gots.filter((el: any) => el.value === "test2").length
    ).toBeGreaterThanOrEqual(2);
  });
});
