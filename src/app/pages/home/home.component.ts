import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RickandmortyService } from 'src/app/services/rickandmorty.service';
import { Character } from '../../models/character';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchForm: FormGroup;

  page: number = 1;
  characters: Character[] = [];
  constructor(
    private fb: FormBuilder,
    private mainService: RickandmortyService
  ) {
    this.searchForm = this.fb.group({ text: [null] });
  }

  ngOnInit(): void {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged((x, y) => JSON.stringify(x) === JSON.stringify(y))
      )
      .subscribe((v) => console.log(v));
    this.loadData();
  }

  private loadData() {
    this.mainService.allCharacters({ page: this.page }).subscribe((r) => {
      this.characters = r.results;
      console.log(r);
    });
  }
}
