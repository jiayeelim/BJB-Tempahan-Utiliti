import { Time } from '@angular/common';

export class Reservation
{
    reservationDescription: string;
    startdate: Date | undefined;
    starttime: Time | undefined;
    enddate: Date | undefined;
    endtime:Time | undefined;
    ruangprice:number | undefined;
    ruangname: string;
    quantity: number | undefined;
    discount:number;
    total:number;
    name: string;
    phoneno: string;

}

