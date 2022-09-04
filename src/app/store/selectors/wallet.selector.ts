import { createSelector } from '@ngrx/store';
import { AppState, EthereumState } from '../ethereum.state';


export const walletUpdated = (state: AppState) => state.eth;


export const selectWallet = createSelector(
    walletUpdated,
    (state: EthereumState) => state.wallet
);