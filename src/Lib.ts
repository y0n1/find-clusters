const initToCellId = (n: number) => (i: number, j: number) => n * i + j;
const initFromCellId = (n: number) =>
  (id: number): [number, number] => [Math.floor(id / n), id % n];

function findNearestNeighbors(
  m: Array<Array<number>>,
  cellId: number,
): Array<number> {
  const n = m.length;
  const toCellId = initToCellId(n);
  const fromCellId = initFromCellId(n);
  const [i, j] = fromCellId(cellId);
  // deno-fmt-ignore
  const positions: Array<[number, number]> = [
      [i-1, j-1], [i-1,   j], [i-1, j+1],
      [i  , j-1],             [i  , j+1],
      [i+1, j-1], [i+1,   j], [i+1, j+1],
    ];
  const neighbors: Array<number> = [];
  positions.forEach(([row, col]) => {
    if (m[row][col] === 1) {
      neighbors.push(toCellId(row, col));
    }
  });

  return neighbors;
}

function wrap(input: Array<Array<number>>): Array<Array<number>> {
  const n = input.length;
  const output: Array<Array<number>> = [];

  for (let i = 0; i < n + 2; i++) {
    if (i === 0 || i === n + 1) {
      output.push((new Array(n + 2)).fill(0));
    } else {
      output.push([0, ...input[i - 1], 0]);
    }
  }

  return output;
}

function unwrap(m: Array<Array<number>>): Array<Array<number>> {
  const n = m.length;
  const output = [];
  for (let i = 1; i <= n - 2; i++) {
    output.push(m[i].slice(1, n - 1));
  }

  return output;
}

function scan(
  m: Array<Array<number>>,
): Array<number> {
  const n = m.length;
  const toCellId = initToCellId(n);
  const output: Array<number> = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (m[i][j] !== 0) {
        output.push(toCellId(i, j));
      }
    }
  }

  return output;
}

function findLinks(
  m: Array<Array<number>>,
  cellIds: Array<number>,
): Array<number> {
  const parents = new Array(cellIds.length).fill(0);
  cellIds.forEach((cellId, i) => {
    const neighbors = findNearestNeighbors(m, cellId);
    const cellIndex = cellIds.indexOf(cellId);
    parents[i] = cellIndex;
    neighbors.forEach((neighbor) => {
      const neighborIndex = cellIds.indexOf(neighbor);
      parents[neighborIndex] = cellIndex;
    });
  });

  return parents;
}

function createClusters(
  cells: Array<number>,
  links: Array<number>,
): Map<number, Array<number>> {
  let cid = 1;
  const clusters = new Map<number, Array<number>>();
  const processed: Array<boolean> = new Array(links.length).fill(false);

  cells.forEach((cell, idx) => {
    if (!processed[idx]) {
      processed[idx] = true;
      clusters.set(cid, [cell]);
      let currentLinkIdx = idx;
      let nextLinkIdx = links[currentLinkIdx];
      while (nextLinkIdx !== currentLinkIdx) {
        clusters.get(cid)?.push(cells[nextLinkIdx]);
        processed[nextLinkIdx] = true;
        currentLinkIdx = nextLinkIdx;
        nextLinkIdx = links[nextLinkIdx];
      }
      cid++;
    }
  });

  return clusters;
}

function updateMatrix(
  m: Array<Array<number>>,
  clusters: Map<number, Array<number>>,
): void {
  const n = m.length;
  const fromCellId = initFromCellId(n);
  for (const [k, cells] of clusters.entries()) {
    for (const id of cells) {
      const [i, j] = fromCellId(id);
      m[i][j] = k;
    }
  }
}

export function findClusters(input: Array<Array<number>>) {
  const m = wrap(input);
  const cells = scan(m);
  const links = findLinks(m, cells);
  const clusters = createClusters(cells, links);
  updateMatrix(m, clusters);
  return unwrap(m);
}
