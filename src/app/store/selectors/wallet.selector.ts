import { createSelector } from '@ngrx/store';
import { AppState, User } from '../ethereum.state';


export const walletUpdated = (state: AppState) => state.user;


export const selectWallet = createSelector(
    walletUpdated,
    (state: User) => state.wallet
);