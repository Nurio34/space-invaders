"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.size = void 0;
const size = (playerSize, alienWidthParameter, ratio) => {
    const alienWidth = playerSize / alienWidthParameter;
    const alienHeight = alienWidth / ratio;
    return { alienWidth, alienHeight };
};
exports.size = size;
