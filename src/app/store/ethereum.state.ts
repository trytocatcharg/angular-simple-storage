export const EthereumWalletFeature = 'wallet';


export interface AppState {
    user: User;   
}

export interface User {
    wallet: string;
}

export const EthereumitialState: User = {
        wallet: ''
};
