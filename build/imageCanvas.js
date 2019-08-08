"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jimp = require("jimp");
const path = require("path");
class ImageCanvas {
    constructor(width, height) {
        this.jImage = new jimp(width, height, 'black');
    }
    setPixel(x, y, color) {
        if (x <= this.jImage.getWidth() && y <= this.jImage.getHeight()) {
            const hex = jimp.rgbaToInt(color.r, color.g, color.b, 255, () => { });
            const flippedY = this.jImage.getHeight() - y;
            this.jImage.setPixelColor(hex, x, flippedY);
        }
    }
    save(savePath) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.jImage.writeAsync(path.join(process.cwd(), savePath));
        });
    }
}
exports.ImageCanvas = ImageCanvas;
//# sourceMappingURL=imageCanvas.js.map