import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'walletFormat'
})
export class WalletFormaterPipe implements PipeTransform {
  constructor() {}
  transform(wallet: string): string {
    const value = `${wallet.substring(0, 5)}...${wallet.substring(wallet.length - 4)}`;
    return value!;
  }
}
