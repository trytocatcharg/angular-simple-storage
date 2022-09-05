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
  public isConnected$: Observable<string>;
  public mode: ProgressSpinnerMode = 'indeterminate';
  public showCurrentValueSpinner = false;
  constructor(private store: Store<AppState>) { }

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
        const txResponse = await this.contract['store'](this.value);

        const currentFavNumber = await this.contract['retrieve']();
        console.log('retrieve', currentFavNumber.toString());
    }
  }

}
