import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TchatComponent } from './tchat.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [TchatComponent],
  exports: [TchatComponent]
})
export class TchatComponentModule {}
