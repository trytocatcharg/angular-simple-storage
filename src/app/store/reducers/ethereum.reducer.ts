import { createReducer, on } from '@ngrx/store';
import { AppState, EthereumitialState } from '../ethereum.state';
import {requestWalletSuccess, requestWalletError} from '../actions/wallet.action';

export const EthereumReducer = createReducer<AppState>(
    EthereumitialState,
    on(requestWalletSuccess, (state, {wallet}) => ({
        ...state,
        wallet: wallet
    })),
    on(requestWalletError, (state) => ({...state, wallet: null})),
);
