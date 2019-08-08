import {Tyr} from './tyr';

async function start(args: string[]) {
    const objPath = args.shift();
    if (!objPath) {
        return;
    }
    const tyr = new Tyr();
    const model = await tyr.parse({ objPath });
    const images = tyr.render(model);
    const directory = new Date().toISOString();
    Object.entries(images).forEach(
        async ([key, value]) => await value.save(`rendered_images/${directory}/${key}.png`)
    );
}

const args = process.argv.slice(2);
start(args);
