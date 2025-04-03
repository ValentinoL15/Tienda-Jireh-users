import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  imports: [InputTextModule,FormsModule,Dialog,ButtonModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  value3 : string = ''
  visible: boolean = false;

    showDialog() {
        this.visible = true;
    }
}
