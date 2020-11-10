import { findClusters } from "./Lib.ts";

async function main(_: Array<string>): Promise<void> {
  const input = [
    [0, 1, 0, 0, 1],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0],
  ];
  findClusters(input).forEach(row => {
    console.log(row);
  });
}

if (import.meta.main) {
  await main(Deno.args);
}
