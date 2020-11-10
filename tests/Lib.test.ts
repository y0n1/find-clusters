import { assertArrayIncludes } from "https://deno.land/std@0.77.0/testing/asserts.ts";
import { findClusters } from "../src/Lib.ts";
import { fixtures } from "./fixtures.ts";

Deno.test("finds clusters correctly", () => {
    const { input, expected } = fixtures[0];
    const actual = findClusters(input);
    assertArrayIncludes(actual, expected);
});

Deno.test("finds a single clusters, when all components are connected", () => {
    const { input, expected } = fixtures[0];
    const actual = findClusters(input);
    assertArrayIncludes(actual, expected);
});

Deno.test("finds no cluster, when there are no connected components", () => {
    const { input, expected } = fixtures[0];
    const actual = findClusters(input);
    assertArrayIncludes(actual, expected);
});