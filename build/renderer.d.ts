import { Obj } from './obj';
import { ImageCanvas } from './imageCanvas';
import { Position2D } from './position';
import { Color } from './color';
export declare class Renderer {
    static lines(lineRenderer: (start: Position2D, end: Position2D, image: ImageCanvas, color: Color) => void): ImageCanvas;
    static line1(start: Position2D, end: Position2D, image: ImageCanvas, color: Color): void;
    static line2(start: Position2D, end: Position2D, image: ImageCanvas, color: Color): void;
    static line3(start: Position2D, end: Position2D, image: ImageCanvas, color: Color): void;
    static line4(start: Position2D, end: Position2D, image: ImageCanvas, color: Color): void;
    static line(start: Position2D, end: Position2D, image: ImageCanvas, color: Color): void;
    static renderWire(obj: Obj, width: number, height: number): ImageCanvas;
}
