/**
 * @file Домашка по FP ч. 2
 * 
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 * 
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 * 
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from '../tools/api';
import {
    pipe,
    tap,
    allPass,
    length,
    lt,
    ifElse,
    gt,
    equals,
    not,
    partial,
    test,
    prop,
    mathMod,
    curry,
    flip
} from 'ramda';

const api = new Api();

const processSequence = ({value, writeLog, handleSuccess, handleError}) => {
    const isValidValue = allPass([
        pipe(length, gt(10)),
        pipe(length, lt(2)),
        pipe(Math.sign, equals(-1), not),
        test(/^\d+(?:[\.]\d+)?$/i),
    ]);

    const parseNumber = pipe(Number, Math.round);
    const setParams = number => ({from: 10, to: 2, number});

    const transformFromApi = pipe(
        setParams,
        api.get('https://api.tech/numbers/base'),
    );
    
    const catchP = f => p => p.catch(f);
    const then = curry((f, p) => p.then(f))
    const squaredPow = curry(flip(Math.pow))(2);
    const mathModFlip = flip(mathMod);

    const getAnimalFromApi = id => api.get(`https://animals.tech/${id}`, {});

    pipe(
        tap(writeLog),
        ifElse(
            isValidValue,
            pipe(
                parseNumber,
                tap(writeLog),
                transformFromApi,
                then(prop('result')),
                then(tap(writeLog)),
                then(length),
                then(tap(writeLog)),
                then(squaredPow),
                then(tap(writeLog)),
                then(mathModFlip(3)),
                then(tap(writeLog)),
                then(getAnimalFromApi),
                then(pipe(prop('result'), handleSuccess)),
                catchP(handleError),
            ),
            partial(handleError, ['ValidationError']),
        ),
    )(value);
}

export default processSequence;
