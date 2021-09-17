import createKdTree from "static-kdtree";

import { gpus, GPU } from "../gpus";

const gpuPoint = (gpu: GPU) => [
  gpu.g2d,
  gpu.dx9,
  gpu.dx10,
  gpu.dx11,
  gpu.dx12,
  gpu.overallSpeed,
];

const tree = createKdTree(gpus.map(gpuPoint));

export const getRecommendations = (gpu: GPU): GPU[] =>
  tree
    .knn(gpuPoint(gpu), 20)
    .map((index) => gpus[index])
    .filter(({ id }) => id !== gpu.id);
