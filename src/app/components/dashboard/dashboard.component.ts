import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store/ethereum.state';
import {Store, select} from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectWallet } from 'src/app/store/selectors/wallet.selector';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public currentValue ='0';
  public value ='';

  public isConnected$: Observable<string>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isConnected$ = this.store.pipe(select(selectWallet));
  }

}
