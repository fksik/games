import { Color, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three';

type n = number;

export class Card {
  mesh: Mesh;

  constructor(width: n, height: n, x: n, y: n) {
    const geometry = new PlaneGeometry(width, height, width, height);
    const material = new MeshBasicMaterial({ color: new Color(125, 125, 125) });
    this.mesh = new Mesh(geometry, material);
    this.mesh.position.set(x, y, 0.1);
  }
}
