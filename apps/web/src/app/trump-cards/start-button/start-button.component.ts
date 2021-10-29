import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../firebase.service';
import { Game } from '../game/game';

@Component({
  selector: 'games-start-button',
  templateUrl: './start-button.component.html',
  styleUrls: ['./start-button.component.scss'],
})
export class StartButtonComponent {
  @Output()
  public initialize: EventEmitter<void> = new EventEmitter();
  private uname: string | null;
  showReadUname = false;

  constructor(private fb: FirebaseService, private router: Router) {
    this.uname = localStorage.getItem('uname');
  }

  ngOnInit(): void {
    const game = Game.checkIfHasGame();
    if (game) {
      this.router.navigate(['/', 'trump-cards'], { queryParams: { id: game } });
    }
  }

  async createGame() {
    if (!this.uname) {
      this.readUname();
    }
    if (this.fb.isInitialized) {
      this.initialize.emit();
    }
  }

  private readUname() {
    this.showReadUname = true;
  }

  public get isInitialized(): boolean {
    return this.fb.isInitialized;
  }
}
