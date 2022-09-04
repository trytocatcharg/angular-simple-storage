import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
public isMetaMaskInstalled = false;
public isMetaMaskConnected = false;
public addresMetaMask = '';
  constructor() { }

  ngOnInit(): void {
    this.isMetaMaskInstalled= !!window.ethereum;
    const address = window.sessionStorage.getItem('address');
    if (address) {
      this.isMetaMaskConnected = true;
      this.isMetaMaskConnected = true;
      this.addresMetaMask = address.substring(0, 5) + '...' + address.substring(address.length - 4) ;
    }
  }


  public click() {
    window.ethereum.request({
      method: 'eth_requestAccounts'
    }).then((res) => {
      const connectedAccount = res[0];
      this.isMetaMaskConnected = true;
      console.log(connectedAccount);
      this.addresMetaMask = connectedAccount.substring(0, 5) + '...' + connectedAccount.substring(connectedAccount.length - 4);
      window.sessionStorage.setItem('address', connectedAccount);
    })
  }


  public clickInstallMetaMask() {
    window.open("https://metamask.io/", "_blank");
  }

}
