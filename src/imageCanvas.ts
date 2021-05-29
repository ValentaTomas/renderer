import jimp from 'jimp';
import path from 'path';
import { Color } from './color';

export class ImageCanvas {
    private jImage: jimp;
    public constructor(width: number, height: number) {
        this.jImage = new jimp(width, height, 'black');
    }

    public setPixel(x: number, y: number, color: Color) {
        if (x <= this.jImage.getWidth() && y <= this.jImage.getHeight()) {
            const hex = jimp.rgbaToInt(color.r, color.g, color.b, 255, () => { });
            const flippedY = this.jImage.getHeight() - y;
            this.jImage.setPixelColor(hex, x, flippedY);
        }
    }

    public async save(savePath: string) {
        return this.jImage.writeAsync(path.join(process.cwd(), savePath))
    }
}