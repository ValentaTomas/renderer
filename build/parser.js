"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const readline = require("readline");
const obj_1 = require("./obj");
function notEmpty(value) {
    return value !== null && value !== undefined;
}
class Parser {
    static parseObj(path) {
        return __awaiter(this, void 0, void 0, function* () {
            var e_1, _a;
            const fileStream = fs.createReadStream(path);
            const lines = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity
            });
            const obj = { vertices: [], normals: [], textureCoordinate: [], faces: [] };
            try {
                for (var lines_1 = __asyncValues(lines), lines_1_1; lines_1_1 = yield lines_1.next(), !lines_1_1.done;) {
                    const line = lines_1_1.value;
                    const parsedLine = this.parseObjLine(line);
                    if (parsedLine) {
                        switch (parsedLine.type) {
                            case obj_1.ObjType.Vertex:
                                obj.vertices.push(parsedLine.data);
                                break;
                            case obj_1.ObjType.VertexNormal:
                                obj.normals.push(parsedLine.data);
                                break;
                            case obj_1.ObjType.TextureCoordinate:
                                obj.textureCoordinate.push(parsedLine.data);
                                break;
                            case obj_1.ObjType.Face:
                                obj.faces.push(parsedLine.data);
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) yield _a.call(lines_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            fileStream.close();
            return obj;
        });
    }
    static parseObjLine(line) {
        const parts = line.split(' ');
        const sign = parts.shift();
        if (sign === 'v') {
            const type = obj_1.ObjType.Vertex;
            const vertex = Parser.parseObjVertex(parts);
            if (vertex) {
                return { type, data: vertex };
            }
        }
        if (sign === 'vn') {
            const type = obj_1.ObjType.TextureCoordinate;
            const normal = Parser.parseObjNormal(parts);
            if (normal) {
                return { type, data: normal };
            }
        }
        if (sign === 'vt') {
            const type = obj_1.ObjType.VertexNormal;
            const coordinate = Parser.parseObjCoordinate(parts);
            if (coordinate) {
                return { type, data: coordinate };
            }
        }
        if (sign === 'f') {
            const type = obj_1.ObjType.Face;
            const face = Parser.parseObjFace(parts);
            if (face) {
                return { type, data: face };
            }
        }
    }
    static parseObjNormal(parts) {
        const x = parts.shift();
        const y = parts.shift();
        const z = parts.shift();
        if (x && y && z) {
            return {
                x: +x,
                y: +y,
                z: +z,
            };
        }
    }
    static parseObjCoordinate(parts) {
        const x = parts.shift();
        const y = parts.shift();
        const z = parts.shift();
        if (x) {
            return {
                x: +x,
                y: y ? +y : 0,
                z: z ? +z : 0,
            };
        }
    }
    static parseObjFace(parts) {
        const a = parts.shift();
        const b = parts.shift();
        const c = parts.shift();
        if (a && b && c) {
            const as = a.split('/');
            const bs = b.split('/');
            const cs = c.split('/');
            const vertices = [as.shift(), bs.shift(), cs.shift()].filter(notEmpty).map(p => +p);
            const coordinates = [as.shift(), bs.shift(), cs.shift()].filter(notEmpty).map(p => +p);
            const normals = [as.shift(), bs.shift(), cs.shift()].filter(notEmpty).map(p => +p);
            return {
                vertices,
                coordinates: coordinates.length === 3 ? coordinates : undefined,
                normals: normals.length === 3 ? normals : undefined,
            };
        }
    }
    static parseObjVertex(parts) {
        const x = parts.shift();
        const y = parts.shift();
        const z = parts.shift();
        const w = parts.shift();
        if (x && y && z) {
            return {
                x: +x,
                y: +y,
                z: +z,
                w: w ? +w : 1
            };
        }
    }
}
exports.Parser = Parser;
//# sourceMappingURL=parser.js.map