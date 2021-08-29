import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Table } from './ui/table';
import { AspectRatio } from './utils/aspect-ratio';

@Component({
  selector: 'games-trump-cards',
  templateUrl: './trump-cards.component.html',
  styleUrls: ['./trump-cards.component.scss'],
})
export class TrumpCardsComponent implements OnInit {
  private animate = () => {
    requestAnimationFrame(this.animate);
    this.controls.update();
    this.canvas.render(this.scene, this.camera);
  };
  scene: Scene;
  camera: PerspectiveCamera;
  canvas: WebGLRenderer;
  controls!: OrbitControls;
  private table: Table;
  private aspectRatio = new AspectRatio();

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(45, this.aspectRatio.value, 0.1, 1000);
    this.canvas = new WebGLRenderer({ alpha: true, antialias: true });
    this.canvas.setSize(this.aspectRatio.width, this.aspectRatio.height);
    this.table = new Table(this.aspectRatio.value);
  }

  ngOnInit(): void {
    this.createScene();
  }

  async createScene() {
    this.renderer.appendChild(
      this.elementRef.nativeElement,
      this.canvas.domElement
    );
    this.renderer.setAttribute(this.canvas.domElement, 'id', 'trump-canvas');

    this.controls = new OrbitControls(this.camera, this.canvas.domElement);
    this.camera.position.set(0, -33, 196);
    this.camera.lookAt(new Vector3(0, 0, 0));
    this.controls.update();

    const table = await this.table.getGeometry();
    this.scene.add(table);

    this.canvas.render(this.scene, this.camera);
    this.animate();
  }
}