declare module "static-kdtree" {
  export default function (points: number[][]): {
    knn: (point: number[], count: number) => number[];
  };
}
