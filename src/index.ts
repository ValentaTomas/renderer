import Renderer from './renderer';
import Parser from './parser';
import path from 'path';

async function main() {
    const objPath = path.join('data', 'head.obj');
    const obj = await Parser.parseObj(objPath);
    const images = {
        lines1: Renderer.lines(Renderer.line1),
        lines2: Renderer.lines(Renderer.line2),
        lines3: Renderer.lines(Renderer.line3),
        lines4: Renderer.lines(Renderer.line4),
        lines5: Renderer.lines(Renderer.line),
        wireframe: Renderer.renderWire(obj, 1000, 1000),
    };
    Object
        .entries(images)
        .forEach(([key, value]) => value.save(path.join('rendered-images', `${key}.png`)));
}

if (require.main === module) main();
