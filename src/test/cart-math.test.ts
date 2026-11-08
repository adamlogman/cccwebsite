import { describe, expect, it } from "vitest";
import { addLine, computeTotals, setLineQty } from "@/lib/cart-math";

describe("cart math", () => {
  it("merges quantities for the same product and caps at stock", () => {
    const lines = addLine(addLine([], "a", 2, 3), "a", 5, 3);
    expect(lines).toEqual([{ id: "a", qty: 3 }]);
  });
  it("removes a line when quantity drops to zero", () => {
    expect(setLineQty([{ id: "a", qty: 1 }], "a", 0, 5)).toEqual([]);
  });
  it("gives free standard shipping from $100", () => {
    expect(computeTotals(100, "standard").shipping).toBe(0);
    expect(computeTotals(99, "standard").shipping).toBe(5.99);
  });
  it("adds 8% tax to the total", () => {
    expect(computeTotals(50, "pickup")).toEqual({ subtotal: 50, shipping: 0, tax: 4, total: 54 });
  });
});
