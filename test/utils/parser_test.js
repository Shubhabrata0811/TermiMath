import { test, describe, it } from "node:test";
import parseModule from "../../src/utils/parser.js";
import assert from "node:assert";

describe("isNumeric", () => {
  it("testing with numeric (int) value", () => {
    assert.strictEqual(parseModule.isNumeric("1"), true);
  });

  it("testing with numeric (float) value", () => {
    assert.strictEqual(parseModule.isNumeric("1.02"), true);
  });

  it("testing with empty str", () => {
    assert.strictEqual(parseModule.isNumeric(""), false);
  });

  it("testing with empty space", () => {
    assert.strictEqual(parseModule.isNumeric("  "), false);
  });

  it("testing with non-numeric str", () => {
    assert.strictEqual(parseModule.isNumeric("abd"), false);
  });

  it("testing with mixed str", () => {
    assert.strictEqual(parseModule.isNumeric("17abd"), false);
  });
});

describe("parse", () => {
  it("testing with simple expression without parenthesis", () => {
    assert.strictEqual(parseModule.parse("1 + 2"), "1 2 +");
  });

  it("testing with simple expression with parenthesis", () => {
    assert.strictEqual(parseModule.parse("( 1 + 2 )"), "1 2 +");
  });

  it("testing with expression having 2 operators", () => {
    assert.strictEqual(parseModule.parse("1 + 2 * 3"), "1 2 3 * +");
  });

  it("testing with expression having multiple operators", () => {
    assert.strictEqual(parseModule.parse("1 + 2 * 3 - 4"), "1 2 3 * + 4 -");
  });

  it("testing with expression having multiple operators and parenthesis", () => {
    assert.strictEqual(parseModule.parse("( 1 + 2 ) * 3 - 4"), "1 2 + 3 * 4 -");
  });

  it("testing with expression having multiple operators and multiple parenthesis", () => {
    assert.strictEqual(
      parseModule.parse("( 1 + 2 ) * ( 3 - 4 )"),
      "1 2 + 3 4 - *"
    );
  });

  it("testing with expression having multiple operators and nested parenthesis", () => {
    assert.strictEqual(
      parseModule.parse("( 1 + ( 2 - 3 ) ) * 4"),
      "1 2 3 - + 4 *"
    );
  });

  it("testing with float values", () => {
    assert.strictEqual(parseModule.parse("1.2 + 3.4 * 5.6"), "1.2 3.4 5.6 * +");
  });

  it("testing with more complex expression", () => {
    assert.strictEqual(
      parseModule.parse("1.9 + 2.09 * ( 3 - 4 ) / 5"),
      "1.9 2.09 3 4 - * 5 / +"
    );
  });

  it("testing with invalid token", () => {
    assert.throws(() => parseModule.parse("1 + 2 * 3 - 4 a"), {
      message: "Invalid token",
    });
  });
});
