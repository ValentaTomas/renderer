import * as jimp from 'jimp';
import { Color } from './color';
export declare class ImageCanvas {
    private jImage;
    constructor(width: number, height: number);
    setPixel(x: number, y: number, color: Color): void;
    save(savePath: string): Promise<jimp>;
}
