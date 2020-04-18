import { COLORS, SHAPES } from "../constants";
import {
  allPass,
  filter,
  values,
  length,
  pipe,
  equals,
  lte,
  invert,
  countBy,
  identity,
  whereEq,
  omit,
  indexOf,
  any,
  has,
  all,
  and,
  not,
  compose,
  anyPass,
} from "ramda";

function allSameColor(color) {
  const isColor = equals(color);

  return pipe(values, all(isColor));
}

/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = (shapes) => {
  const standard = {
    [SHAPES.STAR]: COLORS.RED,
    [SHAPES.SQUARE]: COLORS.GREEN,
    [SHAPES.TRIANGLE]: COLORS.WHITE,
    [SHAPES.CIRCLE]: COLORS.WHITE,
  };

  const isStandardShapes = equals(standard);

  return isStandardShapes(shapes);
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (shapes) => {
  const isGreenColors = filter(equals(COLORS.GREEN));
  const isMinTwoGreenShapes = pipe(values, isGreenColors, length, lte(2));

  return isMinTwoGreenShapes(shapes);
};

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (shapes) => {
  const isRedEqualsBlue = ({ red, blue }) => red === blue;
  const isEqualRedShapesAndBlueShapes = pipe(
    values,
    countBy(identity),
    isRedEqualsBlue
  );

  return isEqualRedShapesAndBlueShapes(shapes);
};

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = (shapes) => {
  const standard = {
    [SHAPES.CIRCLE]: COLORS.BLUE,
    [SHAPES.STAR]: COLORS.RED,
    [SHAPES.SQUARE]: COLORS.ORANGE,
  };

  const isStandardShapes = whereEq(standard);

  return isStandardShapes(shapes);
};

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (shapes) => {
  const gteThree = (v) => v >= 3;

  return pipe(
    values,
    countBy(identity),
    omit([COLORS.WHITE]),
    values,
    any(gteThree)
  )(shapes);
};

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = (shapes) => {
  const colors = invert(shapes);
  const hasTriangleGreenShapes = (colors) =>
    indexOf(SHAPES.TRIANGLE, colors[COLORS.GREEN]) === 1;
  const hasGreenShapes = has(COLORS.GREEN);
  const hasRedShapes = has(COLORS.RED);

  return allPass([hasGreenShapes, hasTriangleGreenShapes, hasRedShapes])(
    colors
  );
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (shapes) => {
  const allSameColorOrange = allSameColor(COLORS.ORANGE);

  return allSameColorOrange(shapes);
};

// 8. Не красная и не белая звезда.
export const validateFieldN8 = ({ star }) => {
  const isWhite = equals(COLORS.WHITE);
  const isRed = equals(COLORS.RED);

  return compose(not, anyPass([isWhite, isRed]))(star);
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = (shapes) => {
  const allSameColorGreen = allSameColor(COLORS.GREEN);

  return allSameColorGreen(shapes);
};

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = ({ triangle, square }) => {
  const isNotWhite = compose(not, equals(COLORS.WHITE));
  const isNotWhiteAll = all(isNotWhite)([triangle, square]);
  const isEquals = equals(triangle, square);

  return and(isNotWhiteAll, isEquals);
};
