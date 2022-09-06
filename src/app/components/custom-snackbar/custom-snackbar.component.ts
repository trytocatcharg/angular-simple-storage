import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-custom-snackbar',
  templateUrl: 'custom-snackbar.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CustomSnackbarComponent implements OnInit {
  
  public msg = '';
  ngOnInit(): void {
    this.msg =`https://goerli.etherscan.io/tx/${window.sessionStorage.getItem('tx')}`;
  }
}