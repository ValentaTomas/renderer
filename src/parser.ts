import * as fs from 'fs';
import * as readline from 'readline';
import { Obj, ObjType, Vertex, VertexNormal, TextureCoordinate, Face } from './obj';

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}

export class Parser {
    public static async parseObj(path: string) {
        const fileStream = fs.createReadStream(path);
        const lines = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        const obj: Obj = { vertices: [], normals: [], textureCoordinate: [], faces: [] };
        for await (const line of lines) {
            const parsedLine = this.parseObjLine(line);
            if (parsedLine) {
                switch (parsedLine.type) {
                    case ObjType.Vertex:
                        obj.vertices.push(parsedLine.data as Vertex);
                        break;
                    case ObjType.VertexNormal:
                        obj.normals.push(parsedLine.data as VertexNormal);
                        break;
                    case ObjType.TextureCoordinate:
                        obj.textureCoordinate.push(parsedLine.data as TextureCoordinate);
                        break;
                    case ObjType.Face:
                        obj.faces.push(parsedLine.data as Face);
                        break;
                    default:
                        break;
                }
            }
        }
        fileStream.close();
        return obj;
    }
    private static parseObjLine(line: string) {
        const parts = line.split(' ');
        const sign = parts.shift();
        if (sign === 'v') {
            const type = ObjType.Vertex;
            const vertex = Parser.parseObjVertex(parts);
            if (vertex) {
                return { type, data: vertex };
            }
        }
        if (sign === 'vn') {
            const type = ObjType.TextureCoordinate;
            const normal = Parser.parseObjNormal(parts);
            if (normal) {
                return { type, data: normal };
            }
        }
        if (sign === 'vt') {
            const type = ObjType.VertexNormal;
            const coordinate = Parser.parseObjCoordinate(parts);
            if (coordinate) {
                return { type, data: coordinate };
            }
        }
        if (sign === 'f') {
            const type = ObjType.Face;
            const face = Parser.parseObjFace(parts);
            if (face) {
                return { type, data: face };
            }
        }
    }

    private static parseObjNormal(parts: string[]): VertexNormal | undefined {
        const x = parts.shift();
        const y = parts.shift();
        const z = parts.shift();
        if (x && y && z) {
            return {
                x: +x,
                y: +y,
                z: +z,
            }
        }
    }

    private static parseObjCoordinate(parts: string[]): TextureCoordinate | undefined {
        const x = parts.shift();
        const y = parts.shift();
        const z = parts.shift();
        if (x) {
            return {
                x: +x,
                y: y ? +y : 0,
                z: z ? +z : 0,
            }
        }
    }

    private static parseObjFace(parts: string[]): Face | undefined {
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

    private static parseObjVertex(parts: string[]): Vertex | undefined {
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
            }
        }
    }
}