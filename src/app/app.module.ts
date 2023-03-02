import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule }   from '@angular/common/http';

import { AppComponent } from './app.component';
import { HourComponent } from './components/hour/hour.component';
import { WeatherComponent } from './components/weather/weather.component';
import { HttpService } from './services/http.service';
import { NotificationService } from './services/notification.service';
import { UtilService } from './services/util.service';
import { DayComponent } from './components/day/day.component';
import { RemoveDublicatesPipe } from './pipes/remove-dublicates.pipe';
import { MapComponent } from './components/map/map.component';
import { LeafletService } from './services/leaflet.service';
import { GetDayNamePipe } from './pipes/get-day-name.pipe';
import { CelsiusPipe } from './pipes/celsius.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HourComponent,
    WeatherComponent,
    DayComponent,
    RemoveDublicatesPipe,
    GetDayNamePipe,
    CelsiusPipe,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [HttpService, NotificationService, UtilService, LeafletService],
  bootstrap: [AppComponent]
})
export class AppModule { }
