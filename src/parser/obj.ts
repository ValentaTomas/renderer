import { Face } from './face';
import { TextureCoordinate } from './textureCoordinate';
import { Vertex } from './vertex';
import { VertexNormal } from './vertexNormal';


export interface Obj {
    vertices: Vertex[];
    normals: VertexNormal[];
    textureCoordinate: TextureCoordinate[];
    faces: Face[];
}
