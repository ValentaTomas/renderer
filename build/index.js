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
const tyr_1 = require("./tyr");
function start(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const objPath = args.shift();
        if (!objPath) {
            return;
        }
        const tyr = new tyr_1.Tyr();
        const model = yield tyr.parse({ objPath });
        const images = tyr.render(model);
        const directory = new Date().toISOString();
        Object.entries(images).forEach(([key, value]) => __awaiter(this, void 0, void 0, function* () { return yield value.save(`rendered_images/${directory}/${key}.png`); }));
    });
}
const args = process.argv.slice(2);
start(args);
//# sourceMappingURL=index.js.map