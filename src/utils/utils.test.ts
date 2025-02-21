import { expect } from "chai";
import { isEqual, merge } from "./utils.ts";

describe("isEqual", function () {
  it("Должен возвращать true для одинаковых объектов", function () {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { a: 1, b: 2, c: 3 };
    expect(isEqual(obj1, obj2)).to.equal(true);
  });

  it("Должен возвращать false для объектов с разными значениями", function () {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { a: 1, b: 2, c: 4 };
    expect(isEqual(obj1, obj2)).to.equal(false);
  });

  it("Должен возвращать false для объектов с разными ключами", function () {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { a: 1, b: 2, d: 3 };
    expect(isEqual(obj1, obj2)).to.equal(false);
  });

  it("Должен корректно сравнивать вложенные объекты", function () {
    const obj1 = { a: { b: { c: 1 } } };
    const obj2 = { a: { b: { c: 1 } } };
    expect(isEqual(obj1, obj2)).to.equal(true);
  });

  it("Должен возвращать false для различных вложенных объектов", function () {
    const obj1 = { a: { b: { c: 1 } } };
    const obj2 = { a: { b: { c: 2 } } };
    expect(isEqual(obj1, obj2)).to.equal(false);
  });

  it("Должен корректно сравнивать массивы", function () {
    const obj1 = { a: [1, 2, 3] };
    const obj2 = { a: [1, 2, 3] };
    expect(isEqual(obj1, obj2)).to.equal(true);
  });

  it("Должен возвращать false для массивов с разными значениями", function () {
    const obj1 = { a: [1, 2, 3] };
    const obj2 = { a: [1, 2, 4] };
    expect(isEqual(obj1, obj2)).to.equal(false);
  });

  it("Должен возвращать false для объектов разной длины", function () {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1 };
    expect(isEqual(obj1, obj2)).to.equal(false);
  });

  it("Должен возвращать true для пустых объектов", function () {
    expect(isEqual({}, {})).to.equal(true);
  });

  it("Должен корректно сравнивать объекты с разными типами данных", function () {
    const obj1 = { a: 1, b: "2", c: true };
    const obj2 = { a: 1, b: "2", c: true };
    expect(isEqual(obj1, obj2)).to.equal(true);
  });
});

interface Indexed {
  [key: string]: unknown;
}

describe("merge", () => {
  it("Проверка объединения двух плоских объектов", () => {
    const obj1: Indexed = { a: 1, b: 2 };
    const obj2: Indexed = { b: 3, c: 4 };
    const result = merge(obj1, obj2);
    expect(result).to.deep.equal({ a: 1, b: 3, c: 4 });
  });

  it("Проверка объединения двух объектов с вложенными структурами", () => {
    const obj1: Indexed = { a: { x: 1, y: 2 }, b: 3 };
    const obj2: Indexed = { a: { y: 5, z: 6 }, c: 7 };
    const result = merge(obj1, obj2);
    expect(result).to.deep.equal({ a: { x: 1, y: 5, z: 6 }, b: 3, c: 7 });
  });

  it("Проверка объединения если они объект пустой", () => {
    const obj1: Indexed = {};
    const obj2: Indexed = { a: 1, b: 2 };
    const result = merge(obj1, obj2);
    expect(result).to.deep.equal({ a: 1, b: 2 });
  });

  it("Проверка что при слияние сохраняются все свойства", () => {
    const obj1: Indexed = { a: 1, nested: { x: 10 } };
    const obj2: Indexed = { b: 2 };
    const result = merge(obj1, obj2);
    expect(result).to.deep.equal({ a: 1, nested: { x: 10 }, b: 2 });
  });

  it("Проверка что происходит заменя значений при одинаковых ключах", () => {
    const obj1: Indexed = { a: 1 };
    const obj2: Indexed = { a: 2 };
    const result = merge(obj1, obj2);
    expect(result).to.deep.equal({ a: 2 });
  });

  it("Проверка что не мутируется первый объект после слияния", () => {
    const obj1: Indexed = { a: 1 };
    const obj2: Indexed = { b: 2 };
    merge(obj1, obj2);
    expect(obj2).to.deep.equal({ b: 2 });
  });
});
