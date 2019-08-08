import { Model } from './model';
export declare class Tyr {
    parse(paths: {
        objPath: string;
    }): Promise<{
        obj: import("./obj").Obj;
    }>;
    render(model: Model): {
        lines1: import("./imageCanvas").ImageCanvas;
        lines2: import("./imageCanvas").ImageCanvas;
        lines3: import("./imageCanvas").ImageCanvas;
        lines4: import("./imageCanvas").ImageCanvas;
        lines5: import("./imageCanvas").ImageCanvas;
        wireframe: import("./imageCanvas").ImageCanvas;
    };
}
