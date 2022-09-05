import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WalletFormaterPipe } from './pipes/wallet-format.pipe';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { EthereumReducer, metaReducers, reducers } from './store/reducers/ethereum.reducer';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    DashboardComponent,
    WalletFormaterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
  })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
