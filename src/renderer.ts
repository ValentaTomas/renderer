import { Obj } from './obj';
import { ImageCanvas } from './imageCanvas';
import { Position2D } from './position';
import { Color } from './color';

const white: Color = {
    r: 255,
    g: 255,
    b: 255
}

const red: Color = {
    r: 255,
    g: 0,
    b: 0
}

export class Renderer {
    public static lines(lineRenderer: (start: Position2D, end: Position2D, image: ImageCanvas, color: Color) => void) {
        const image = new ImageCanvas(100, 100);
        lineRenderer({ x: 13, y: 20 }, { x: 80, y: 40 }, image, white);
        lineRenderer({ x: 20, y: 13 }, { x: 40, y: 80 }, image, red);
        lineRenderer({ x: 80, y: 40 }, { x: 13, y: 20 }, image, red);
        return image;
    }

    public static line1(start: Position2D, end: Position2D, image: ImageCanvas, color: Color) {
        for (let t = 0; t < 1; t += 0.1) {
            const x = start.x + (end.x - start.x) * t;
            const y = start.y + (end.y - start.y) * t;
            image.setPixel(x, y, color);
        }
    }

    public static line2(start: Position2D, end: Position2D, image: ImageCanvas, color: Color) {
        for (let x = start.x; x <= end.x; x++) {
            const t = (x - start.x) / (end.x - start.x);
            const y = start.y * (1 - t) + end.y * t;
            image.setPixel(x, y, color);
        }
    }

    public static line3(start: Position2D, end: Position2D, image: ImageCanvas, color: Color) {
        let isSteep = false;
        if (Math.abs(start.x - end.x) < Math.abs(start.y - end.y)) {
            [start.x, start.y] = [start.y, start.x];
            [end.x, end.y] = [end.y, end.x];
            isSteep = true;
        }
        if (start.x > end.x) {
            [start.x, end.x] = [end.x, start.x];
            [start.y, end.y] = [end.y, start.y];
        }
        for (let x = start.x; x <= end.x; x++) {
            const t = (x - start.x) / (end.x - start.x);
            const y = start.y * (1 - t) + end.y * t;
            if (isSteep) {
                image.setPixel(y, x, color);
            } else {
                image.setPixel(x, y, color);
            }
        }
    }

    public static line4(start: Position2D, end: Position2D, image: ImageCanvas, color: Color) {
        let isSteep = false;
        if (Math.abs(start.x - end.x) < Math.abs(start.y - end.y)) {
            [start.x, start.y] = [start.y, start.x];
            [end.x, end.y] = [end.y, end.x];
            isSteep = true;
        }
        if (start.x > end.x) {
            [start.x, end.x] = [end.x, start.x];
            [start.y, end.y] = [end.y, start.y];
        }

        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const derror = Math.abs(dy / dx);
        let error = 0;
        let y = start.y;

        for (let x = start.x; x <= end.x; x++) {
            if (isSteep) {
                image.setPixel(y, x, color);
            } else {
                image.setPixel(x, y, color);
            }
            error += derror;
            if (error > 0.5) {
                y += (end.y > start.y ? 1 : -1);
                error -= 1;
            }
        }
    }

    public static line(start: Position2D, end: Position2D, image: ImageCanvas, color: Color) {
        let isSteep = false;
        if (Math.abs(start.x - end.x) < Math.abs(start.y - end.y)) {
            [start.x, start.y] = [start.y, start.x];
            [end.x, end.y] = [end.y, end.x];
            isSteep = true;
        }
        if (start.x > end.x) {
            [start.x, end.x] = [end.x, start.x];
            [start.y, end.y] = [end.y, start.y];
        }

        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const derror2 = Math.abs(dy) * 2;
        let error2 = 0;
        let y = start.y;

        for (let x = start.x; x <= end.x; x++) {
            if (isSteep) {
                image.setPixel(y, x, color);
            } else {
                image.setPixel(x, y, color);
            }
            error2 += derror2;
            if (error2 > dx) {
                y += (end.y > start.y ? 1 : -1);
                error2 -= dx * 2;
            }
        }
    }

    public static renderWire(obj: Obj, width: number, height: number) {
        const image = new ImageCanvas(width, height);
        obj.faces.forEach(f => {
            f.vertices.forEach((v, i) => {
                const otherV = f.vertices[(i + 1) % 3];
                const vertex = obj.vertices[v - 1];
                const otherVertex = obj.vertices[otherV - 1];
                const start = {
                    x: (vertex.x + 1) * width / 2,
                    y: (vertex.y + 1) * height / 2
                };
                const end = {
                    x: (otherVertex.x + 1) * width / 2,
                    y: (otherVertex.y + 1) * height / 2
                };
                Renderer.line(start, end, image, white);
            });
        });
        return image;
    }
}