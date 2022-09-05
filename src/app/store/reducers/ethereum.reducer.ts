import { createReducer, on, MetaReducer } from '@ngrx/store';
import { AppState, EthereumitialState, User } from '../ethereum.state';
import {requestWalletSuccess, requestWalletError} from '../actions/wallet.action';
import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import { localStorageSync, LocalStorageConfig } from 'ngrx-store-localstorage';

export const EthereumReducer = createReducer(
    EthereumitialState,
    on(requestWalletSuccess, (state, {wallet}) => ({
        ...state,
        wallet: wallet
    })),
    on(requestWalletError, (state) => ({...state, wallet: null })),
);

  



export function localStorage(reducer: ActionReducer<AppState>): ActionReducer<AppState> {

    const config: LocalStorageConfig = {
        keys: [
            'user'
        ],
        rehydrate: true,
        removeOnUndefined: false,
    };

    return localStorageSync(config)(reducer);
}

export const metaReducers: Array<MetaReducer<AppState>> = [localStorage];

export const reducers: ActionReducerMap<AppState> = {
    user: EthereumReducer,
}