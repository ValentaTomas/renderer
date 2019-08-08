import { Obj } from './obj';
export declare class Parser {
    static parseObj(path: string): Promise<Obj>;
    private static parseObjLine;
    private static parseObjNormal;
    private static parseObjCoordinate;
    private static parseObjFace;
    private static parseObjVertex;
}
