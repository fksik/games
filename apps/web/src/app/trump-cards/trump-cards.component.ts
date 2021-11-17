import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EventBusService } from '../event-bus.service';
import { FirebaseService } from '../firebase.service';
import { GameErrors, GameUIState } from './constants';
import { Game } from './game/game';
import { Table } from './ui/table';
import { AspectRatio } from './utils/aspect-ratio';

@Component({
  selector: 'games-trump-cards',
  templateUrl: './trump-cards.component.html',
  styleUrls: ['./trump-cards.component.scss'],
})
export class TrumpCardsComponent implements OnInit, OnDestroy {
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
  public gameUIState: GameUIState = GameUIState.NONE;
  public gameUIStateValues = GameUIState;
  public game?: Game;
  private subscriptions: Array<Subscription> = [];

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FirebaseService,
    private eb: EventBusService
  ) {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(45, this.aspectRatio.value, 0.1, 1000);
    this.canvas = new WebGLRenderer({ alpha: true, antialias: true });
    this.canvas.setSize(this.aspectRatio.width, this.aspectRatio.height);
    this.table = new Table(this.aspectRatio.value);
  }

  async ngOnInit(): Promise<void> {
    await this.createScene();
    this.route.queryParamMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.waitForUsers(id);
        } else {
          this.gameUIState = GameUIState.START_GAME;
        }
      },
    });
  }

  async waitForUsers(id: string) {
    try {
      const existing = Game.checkIfExistingUser(this.fb, id);
      if (!existing) {
        const name = await this.getUserName();
        this.game = await Game.joinAsNewUser(this.fb, id, name);
      } else {
        this.game = await Game.joinAsExistingUser(this.fb, id);
      }
      this.gameUIState = GameUIState.LOBBY;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === GameErrors.ROOM_NOT_EXISTS) {
          Game.clearGameStorage();
          this.router.navigate(['/', 'trump-cards']);
        }
      }
    }
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

  public async initiateGame() {
    const name = await this.getUserName();
    const { id: roomId } = await Game.initiateGame(this.fb, name);
    this.router.navigate(['/', 'trump-cards'], { queryParams: { id: roomId } });
  }

  public async getUserName(): Promise<string> {
    this.gameUIState = GameUIState.ENTER_NAME;
    return new Promise((res) => {
      const sub = this.eb.on<string>('get-name').subscribe((name) => {
        res(name);
        sub.unsubscribe();
        this.gameUIState = GameUIState.NONE;
      });
      this.subscriptions.push(sub);
    });
  }

  public updateUserName(name: string) {
    this.eb.emit<string>('get-name', name);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((_) => _.unsubscribe());
  }
}
