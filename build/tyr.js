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
const parser_1 = require("./parser");
const renderer_1 = require("./renderer");
class Tyr {
    parse(paths) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = yield parser_1.Parser.parseObj(paths.objPath);
            return { obj };
        });
    }
    render(model) {
        return {
            lines1: renderer_1.Renderer.lines(renderer_1.Renderer.line1),
            lines2: renderer_1.Renderer.lines(renderer_1.Renderer.line2),
            lines3: renderer_1.Renderer.lines(renderer_1.Renderer.line3),
            lines4: renderer_1.Renderer.lines(renderer_1.Renderer.line4),
            lines5: renderer_1.Renderer.lines(renderer_1.Renderer.line),
            wireframe: renderer_1.Renderer.renderWire(model.obj, 1000, 1000),
        };
    }
}
exports.Tyr = Tyr;
//# sourceMappingURL=tyr.js.map