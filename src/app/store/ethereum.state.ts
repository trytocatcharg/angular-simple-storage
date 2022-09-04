export const EthereumWalletFeature = 'wallet';


export interface AppState {
    eth: EthereumState
}

export interface EthereumState {
    wallet: string;
}

export const EthereumitialState: AppState = {eth: {
    wallet: ''
}};