import {
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Texture,
  TextureLoader,
} from 'three';
import { Users } from '../user/user';
import { RoundCardsContainer } from './round-cards.container';
import { RoundHigh } from './round-high';

export async function getTable() {}

export class Table {
  private image: string = '/assets/img1-unsplash.jpg';
  private height: number;
  private roundCardsContainer?: RoundCardsContainer;
  private roundHigh?: RoundHigh;
  private texture?: Texture;
  private mesh?: Mesh<PlaneGeometry, MeshBasicMaterial>;

  constructor(public aspectRatio: number, public width = 320) {
    this.height = width / this.aspectRatio;
  }

  async getGeometry() {
    this.texture = await new TextureLoader().loadAsync(this.image);
    const geometry = new PlaneGeometry(this.width, this.height);
    const material = new MeshBasicMaterial({ map: this.texture });
    this.mesh = new Mesh(geometry, material);
    this.mesh.name = 'Table';
    return this.mesh;
  }

  start(users: Users) {
    const { width: tw, height: th } = this;
    this.roundCardsContainer = new RoundCardsContainer(users, tw, th);
    this.roundHigh = new RoundHigh(tw, th);
    this.mesh!.add(this.roundCardsContainer.mesh);
    this.mesh!.add(this.roundHigh.mesh);
  }
}
