import { Component, OnInit } from '@angular/core';
import { AppState, EthereumState } from '../../store/ethereum.state';
import {Store, select} from '@ngrx/store';
import { requestWalletSuccess } from '../../store/actions/wallet.action';
import { selectWallet } from '../../store/selectors/wallet.selector';

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
      window.sessionStorage.setItem('address', connectedAccount);
    })
  }


  public clickInstallMetaMask() {
    window.open("https://metamask.io/", "_blank");
  }

}
