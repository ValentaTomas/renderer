export enum ObjType {
    Vertex,
    TextureCoordinate,
    VertexNormal,
    Face
}

export interface Vertex {
    x: number;
    y: number;
    z: number;
    w?: number;
}

export interface TextureCoordinate {
    x: number;
    y?: number;
    z?: number;
}

export interface VertexNormal {
    x: number;
    y: number;
    z: number;
}

export interface Face {
    vertices: number[];
    coordinates?: number[];
    normals?: number[];
}

export interface Obj {
    vertices: Vertex[];
    normals: VertexNormal[];
    textureCoordinate: TextureCoordinate[];
    faces: Face[];
}