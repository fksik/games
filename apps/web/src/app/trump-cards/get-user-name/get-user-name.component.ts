import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'games-get-user-name',
  templateUrl: './get-user-name.component.html',
  styleUrls: ['./get-user-name.component.scss'],
})
export class GetUserNameComponent implements OnInit {
  public infoForm!: FormGroup;
  @Output()
  public name = new EventEmitter<string>();
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.infoForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  doneWithNameChanges() {
    if (this.infoForm.valid) {
      const { name } = this.infoForm.value;
      this.name.emit(name);
    }
  }
}
