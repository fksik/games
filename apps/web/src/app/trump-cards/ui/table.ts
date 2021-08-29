import {
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Texture,
  TextureLoader,
} from 'three';
import { RoundCardsContainer } from './round-cards.container';

export async function getTable() {}

export class Table {
  public image: string = '/assets/img1-unsplash.jpg';
  public height: number;
  public roundCardsContainer: RoundCardsContainer;
  texture?: Texture;
  mesh?: Mesh<PlaneGeometry, MeshBasicMaterial>;

  constructor(public aspectRatio: number, public width = 320) {
    this.height = width / this.aspectRatio;
    const { width: tw, height: th } = this;
    this.roundCardsContainer = new RoundCardsContainer(tw, th);
  }

  async getGeometry() {
    this.texture = await new TextureLoader().loadAsync(this.image);
    const geometry = new PlaneGeometry(this.width, this.height);
    const material = new MeshBasicMaterial({ map: this.texture });
    this.mesh = new Mesh(geometry, material);
    this.mesh.add(this.roundCardsContainer.mesh);
    return this.mesh;
  }
}
