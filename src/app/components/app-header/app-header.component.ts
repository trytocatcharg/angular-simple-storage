import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store/ethereum.state';
import {select, Store} from '@ngrx/store';
import { requestWalletSuccess } from '../../store/actions/wallet.action';
import { selectWallet } from 'src/app/store/selectors/wallet.selector';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
public isMetaMaskInstalled = false;
public isMetaMaskConnected = false;
public addresMetaMask = '';
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isMetaMaskInstalled= !!window.ethereum;

    const selector = this.store.pipe(
      select(selectWallet),
      map( e=> { return e as string} ));

      selector.subscribe((p) => {
        if (p) {
          this.isMetaMaskConnected = true;
          this.addresMetaMask = p;    
        }
      })

  }


  public click() {
    window.ethereum.request({
      method: 'eth_requestAccounts'
    }).then((res) => {
      const connectedAccount = res[0];
      this.isMetaMaskConnected = true;
      this.store.dispatch(requestWalletSuccess({
          wallet: connectedAccount
      }))
      this.addresMetaMask = connectedAccount;
    })
  }


  public clickInstallMetaMask() {
    window.open("https://metamask.io/", "_blank");
  }

}
