import {Parser} from './parser';
import {Renderer} from './renderer';
import { Model } from './model';

export class Tyr {
    public async parse(paths: {objPath: string}) {
        const obj = await Parser.parseObj(paths.objPath);
        return { obj };
    }
    public render(model: Model) {
        return {
            lines1: Renderer.lines(Renderer.line1),
            lines2: Renderer.lines(Renderer.line2),
            lines3: Renderer.lines(Renderer.line3),
            lines4: Renderer.lines(Renderer.line4),
            lines5: Renderer.lines(Renderer.line),
            wireframe: Renderer.renderWire(model.obj, 1000, 1000),
        };
    }
}