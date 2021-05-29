import { Tyr } from './tyr';
import path from 'path';

async function main() {
    const objPath = path.join('data', 'head.obj');
    const tyr = new Tyr();
    const model = await tyr.parse({ objPath });
    const images = tyr.render(model);
    Object
        .entries(images)
        .forEach(([key, value]) => value.save(path.join('rendered-images', `${key}.png`)));
}

if (require.main === module) main();
