import { SHAPES, COLORS } from "../constants";
import {
  validateFieldN1,
  validateFieldN2,
  validateFieldN3,
  validateFieldN4,
  validateFieldN5,
  validateFieldN6,
  validateFieldN7,
  validateFieldN8,
  validateFieldN9,
  validateFieldN10,
} from "./validators";

describe("Validators", () => {
  const defaultArgs = {
    [SHAPES.STAR]: COLORS.WHITE,
    [SHAPES.SQUARE]: COLORS.WHITE,
    [SHAPES.CIRCLE]: COLORS.WHITE,
    [SHAPES.TRIANGLE]: COLORS.WHITE,
  };

  describe("validateFieldN1", () => {
    it("Красная звезда, зеленый квадрат, все остальные белые", () => {
      const args = {
        [SHAPES.STAR]: COLORS.RED,
        [SHAPES.SQUARE]: COLORS.GREEN,
        [SHAPES.CIRCLE]: COLORS.WHITE,
        [SHAPES.TRIANGLE]: COLORS.WHITE,
      };

      expect(validateFieldN1(args)).toBeTruthy();
    });
  });

  describe("validateFieldN2", () => {
    it("Как минимум две фигуры зеленые.", () => {
      const args = {
        ...defaultArgs,
        [SHAPES.SQUARE]: COLORS.GREEN,
        [SHAPES.CIRCLE]: COLORS.GREEN,
      };

      expect(validateFieldN2(args)).toBeTruthy();
    });
  });

  describe("validateFieldN3", () => {
    it("Количество красных фигур равно кол-ву синих.", () => {
      const args = {
        ...defaultArgs,
        [SHAPES.SQUARE]: COLORS.RED,
        [SHAPES.CIRCLE]: COLORS.BLUE,
      };

      expect(validateFieldN3(args)).toBeTruthy();
    });
  });

  describe("validateFieldN4", () => {
    it("Синий круг, красная звезда, оранжевый квадрат", () => {
      const args = {
        ...defaultArgs,
        [SHAPES.CIRCLE]: COLORS.BLUE,
        [SHAPES.STAR]: COLORS.RED,
        [SHAPES.SQUARE]: COLORS.ORANGE,
      };

      expect(validateFieldN4(args)).toBeTruthy();
    });
  });

  describe("validateFieldN5", () => {
    it("Три фигуры одного любого цвета кроме белого.", () => {
      const args = {
        ...defaultArgs,
        [SHAPES.CIRCLE]: COLORS.BLUE,
        [SHAPES.STAR]: COLORS.BLUE,
        [SHAPES.SQUARE]: COLORS.BLUE,
      };

      expect(validateFieldN5(args)).toBeTruthy();
    });

    it("Четыре фигуры одного цвета – это тоже true", () => {
      const args = {
        [SHAPES.TRIANGLE]: COLORS.BLUE,
        [SHAPES.CIRCLE]: COLORS.BLUE,
        [SHAPES.STAR]: COLORS.BLUE,
        [SHAPES.SQUARE]: COLORS.BLUE,
      };

      expect(validateFieldN5(args)).toBeTruthy();
    });
  });

  describe("validateFieldN6", () => {
    it("Две зеленые фигуры (одна из них треугольник), еще одна любая красная", () => {
      const args = {
        ...defaultArgs,
        [SHAPES.TRIANGLE]: COLORS.GREEN,
        [SHAPES.CIRCLE]: COLORS.GREEN,
        [SHAPES.STAR]: COLORS.RED,
      };

      expect(validateFieldN6(args)).toBeTruthy();
    });
  });

  describe("validateFieldN7", () => {
    it("Все фигуры оранжевые.", () => {
      const args = {
        [SHAPES.STAR]: COLORS.ORANGE,
        [SHAPES.SQUARE]: COLORS.ORANGE,
        [SHAPES.CIRCLE]: COLORS.ORANGE,
        [SHAPES.TRIANGLE]: COLORS.ORANGE,
      };

      expect(validateFieldN7(args)).toBeTruthy();
    });
  });

  describe("validateFieldN8", () => {
    it("Не красная и не белая звезда.", () => {
      const args = {
        ...defaultArgs,
        [SHAPES.STAR]: COLORS.ORANGE,
      };

      expect(validateFieldN8(args)).toBeTruthy();
    });

    it("Не красная звезда", () => {
      const args = {
        ...defaultArgs,
        [SHAPES.STAR]: COLORS.RED,
      };

      expect(validateFieldN8(args)).toBeFalsy();
    });

    it("Не белая звезда", () => {
      const args = {
        ...defaultArgs,
        [SHAPES.STAR]: COLORS.WHITE,
      };

      expect(validateFieldN8(args)).toBeFalsy();
    });
  });

  describe("validateFieldN9", () => {
    it("Все фигуры зеленые.", () => {
      const args = {
        [SHAPES.STAR]: COLORS.GREEN,
        [SHAPES.SQUARE]: COLORS.GREEN,
        [SHAPES.CIRCLE]: COLORS.GREEN,
        [SHAPES.TRIANGLE]: COLORS.GREEN,
      };

      expect(validateFieldN9(args)).toBeTruthy();
    });
  });

  describe("validateFieldN10", () => {
    it("Треугольник и квадрат одного цвета", () => {
      const args = {
        ...defaultArgs,
        [SHAPES.SQUARE]: COLORS.GREEN,
        [SHAPES.TRIANGLE]: COLORS.GREEN,
      };

      expect(validateFieldN10(args)).toBeTruthy();
    });

    it("Треугольник и квадрат не белого цвета", () => {
      const args = {
        ...defaultArgs,
        [SHAPES.SQUARE]: COLORS.WHITE,
        [SHAPES.TRIANGLE]: COLORS.WHITE,
      };

      expect(validateFieldN10(args)).toBeFalsy();
    });
  });
});
