import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppState } from '../../store/ethereum.state';
import {Store, select} from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectWallet } from 'src/app/store/selectors/wallet.selector';
import { ethers } from 'ethers';
import { environment } from 'src/environments/environment';
// const abi = require('../../../assets/abi');
import {abi } from '../../../assets/abi';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../custom-snackbar/custom-snackbar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  public currentValue ='0';
  public value ='';
  private provider;
  private signer;
  private contract;
  public isDisabled = false;
  public showCurrentTxProcessSpinner = false;
  public isConnected$: Observable<string>;
  public mode: ProgressSpinnerMode = 'indeterminate';
  public showCurrentValueSpinner = false;
  constructor(private store: Store<AppState>, 
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.isConnected$ = this.store.pipe(
                              select(selectWallet),
                              map( e=> {
                                return e as string
                              } ));


    this.isConnected$.subscribe((r) => {
      if (r && window.ethereum)  {
         this.provider = new ethers.providers.Web3Provider(window.ethereum);
         this.signer = this.provider.getSigner();
         this.showCurrentValueSpinner = true;
         const contractAddress = environment.goerliContractSimpleStorage;
         this.contract = new ethers.Contract(contractAddress, abi, this.signer);
         this.contract['retrieve']().then((r) => {
          if (r) {
            this.currentValue = r.toString();
            this.showCurrentValueSpinner = false;
          }
         });
      }
      
    })
  }


  async update() {
    if (window.ethereum) {
      this.isDisabled = true;
      this.showCurrentTxProcessSpinner = true;
      try {
        const txResponse = await this.contract['store'](this.value);
        window.sessionStorage.setItem('tx', txResponse.hash);
        this._snackBar.openFromComponent(CustomSnackbarComponent, {
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          duration: 3000
        });
        
        await this.listenForTxMine(txResponse, this.provider);

        const currentFavNumber = await this.contract['retrieve']();
        this.currentValue = currentFavNumber.toString();
        this.showCurrentTxProcessSpinner = false;
        this.isDisabled = false;
        window.sessionStorage.removeItem('tx');
        this._snackBar.open('Your value was updated!', 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          duration: 3000
        });



      } catch (error) {
        console.log(error);
        this.isDisabled = false;
        this.showCurrentTxProcessSpinner = false;
      }
    }
  }

  public async listenForTxMine(tx, provider) {

    return new Promise<void>((resolve, reject) => {
        provider.once(tx.hash, (txReceipt) => {
          resolve();
        })
    })  
  }

}
