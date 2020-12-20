import { Time } from '@angular/common';

export class Reservation
{
    reservationDescription: string;
    startdate: Date | undefined;
    starttime: Time | undefined;
    enddate: Date | undefined;
    endtime:Time | undefined;
    message: void;
    ruangprice:number | undefined;
    ruangname: string;
    //rate:number;
    //discount:number;
    //total:number;
    name: string;
    phoneno: string;

}

