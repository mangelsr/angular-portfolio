import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { InfoPage } from '../interfaces/info-page.interface';
import { Person } from '../interfaces/person.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPageService {

  info: InfoPage;
  loaded = false;
  team: Person[];

  constructor(private http: HttpClient) {
    this.loadInfo();
    this.loadTeam();
  }

  private loadInfo() {
    this.http.get('assets/data/data-page.json')
      .subscribe((resp: InfoPage) => {
        this.loaded = true;
        this.info = resp;
      }
      );
  }

  private loadTeam() {
    this.http.get('https://angular-html-7d172.firebaseio.com/team.json')
      .subscribe((resp: Person[]) => {
        this.team = resp;
      }
      );
  }
}
