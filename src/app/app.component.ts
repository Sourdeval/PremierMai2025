import { Component } from '@angular/core';

@Component({
  selector: 'pre-mai25-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PremierMai2025';

  chatTabs = [
    'Organisation',
    'Musique',
    'Activités',
    'Blabla',
  ]

  selectedTab = this.chatTabs[0];
}
