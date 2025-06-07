"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.range = void 0;
const range = (canvasWidth, alienWidth) => {
    const canvasCenter = canvasWidth / 2;
    const maxRangeFromCenter = Math.floor(Math.random() * (canvasCenter - alienWidth + 1));
    const minX = Math.max(0, canvasCenter - maxRangeFromCenter);
    const maxX = Math.min(canvasWidth - alienWidth, canvasCenter + maxRangeFromCenter);
    return { minX, maxX };
};
exports.range = range;
