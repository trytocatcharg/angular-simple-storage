import { createAction, props } from '@ngrx/store';

export enum WalletActions {
    REQUEST_WALLET_SUCCESS = '[WALLET]: Request wallet success',
    REQUEST_WALLET_ERROR = '[WALLET]: Request wallet error',
    LOGIN_SUCCESS = '[WALLET]: Login wallet success',
    CLEAR_WALLET = '[WALLET]: Clear'
}

export const requestWalletSuccess = createAction(
    WalletActions.REQUEST_WALLET_SUCCESS,
    props<{ wallet: string }>()
);

export const loginWalletSuccess = createAction(
    WalletActions.LOGIN_SUCCESS,
    props<{ isAuth: boolean }>()
);


export const requestWalletError = createAction(
    WalletActions.REQUEST_WALLET_ERROR
);
