import { expect } from "chai";
import { isEqual } from "./utils.ts";

describe("isEqual", function () {
  it("должен возвращать true для одинаковых объектов", function () {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { a: 1, b: 2, c: 3 };
    expect(isEqual(obj1, obj2)).to.equal(true);
  });

  it("должен возвращать false для объектов с разными значениями", function () {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { a: 1, b: 2, c: 4 };
    expect(isEqual(obj1, obj2)).to.equal(false);
  });

  it("должен возвращать false для объектов с разными ключами", function () {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { a: 1, b: 2, d: 3 };
    expect(isEqual(obj1, obj2)).to.equal(false);
  });

  it("должен корректно сравнивать вложенные объекты", function () {
    const obj1 = { a: { b: { c: 1 } } };
    const obj2 = { a: { b: { c: 1 } } };
    expect(isEqual(obj1, obj2)).to.equal(true);
  });

  it("должен возвращать false для различных вложенных объектов", function () {
    const obj1 = { a: { b: { c: 1 } } };
    const obj2 = { a: { b: { c: 2 } } };
    expect(isEqual(obj1, obj2)).to.equal(false);
  });

  it("должен корректно сравнивать массивы", function () {
    const obj1 = { a: [1, 2, 3] };
    const obj2 = { a: [1, 2, 3] };
    expect(isEqual(obj1, obj2)).to.equal(true);
  });

  it("должен возвращать false для массивов с разными значениями", function () {
    const obj1 = { a: [1, 2, 3] };
    const obj2 = { a: [1, 2, 4] };
    expect(isEqual(obj1, obj2)).to.equal(false);
  });

  it("должен возвращать false для объектов разной длины", function () {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1 };
    expect(isEqual(obj1, obj2)).to.equal(false);
  });

  it("должен возвращать true для пустых объектов", function () {
    expect(isEqual({}, {})).to.equal(true);
  });

  it("должен корректно сравнивать объекты с разными типами данных", function () {
    const obj1 = { a: 1, b: "2", c: true };
    const obj2 = { a: 1, b: "2", c: true };
    expect(isEqual(obj1, obj2)).to.equal(true);
  });
});
