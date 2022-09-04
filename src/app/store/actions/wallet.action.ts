import { createAction, props } from '@ngrx/store';

export enum WalletActions {
    REQUEST_WALLET_SUCCESS = '[WALLET]: Request wallet success',
    REQUEST_WALLET_ERROR = '[WALLET]: Request wallet error',
    CLEAR_WALLET = '[WALLET]: Clear'
}

export const requestWalletSuccess = createAction(
    WalletActions.REQUEST_WALLET_SUCCESS,
    props<{ wallet: string }>()
);

export const requestWalletError = createAction(
    WalletActions.REQUEST_WALLET_ERROR
);