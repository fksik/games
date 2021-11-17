import { Component, Input, OnInit } from '@angular/core';
import { Users } from '../models/user';

@Component({
  selector: 'games-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit {
  @Input()
  public users?: Users;

  constructor() {}

  ngOnInit(): void {}
}
