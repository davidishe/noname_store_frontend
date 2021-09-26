import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'DateAgoPipe'
})

export class DateAgoPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (value) {
            const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
            if (seconds < 29) { // less than 30 seconds ago will show as 'Just now'
                return 'только что';
            }
            const intervals = {
                'год': 31536000,
                'месяц': 2592000,
                'неделя': 604800,
                'день': 86400,
                'час': 3600,
                'минут': 60,
                'секунд': 1
            };

            const periods = [
                31536000,
                2592000,
                604800,
                86400,
                3600,
                60,
                1
            ];


            // минуты
            if (seconds < 60 ) { // less than 30 seconds ago will show as 'Just now'
                return 'меньше минуты назад';
            }


            let counter;

            // tslint:disable-next-line: forin
            for (const i in intervals) {
            console.log(intervals[i]);
            counter = Math.floor(seconds / intervals[i]);

            if (counter > 0) {
                if (counter === 1) {
                    return counter + ' ' + i + ' назад';
                }
                if (counter > 2 && counter < 5)  { // 2-5 часа
                    return counter + ' ' + i + 'а назад';
                }
                if (counter >= 5 && counter <= 20)  { // 2-5 часа
                    return counter + ' ' + i + 'ов назад';
                }
                if (counter === 21)  { // 21 час
                    return counter + ' ' + i + ' назад';
                }
                if (counter >= 22 && counter <= 23)  { // 22-23 часа
                    return counter + ' ' + i + 'а назад';
                }

                return counter + ' ' + i + ' назад';
            }
        }


            // let counter;

            // tslint:disable-next-line: forin
            // for (const i in intervals) {
            // counter = Math.floor(seconds / intervals[i]);

            // if (intervals[i] > 0) {
            //     if (+i === 1) {
            //         return counter + ' ' + i + ' назад'; // singular (1 day ago)
            //     }
            //     if (counter > 2 && counter < 5)  { // 2-5 часа
            //         return counter + ' ' + i + 'а назад';
            //     }
            //     if (counter >= 5 && counter <= 20)  { // 2-5 часа
            //         console.log(counter);
            //         return counter + ' ' + i + 'ов назад';
            //     }
            //     if (counter === 21)  { // 21 час
            //         return counter + ' ' + i + ' назад';
            //     }
            //     if (counter >= 22 && counter <= 23)  { // 22-23 часа
            //         return counter + ' ' + i + 'а назад';
            //     }

            //     return counter + ' ' + i + ' назад'; // plural (2 days ago)
        //     }
        // }



            // tslint:disable-next-line: forin
            // for (const i in intervals) {
            //     counter = Math.floor(seconds / intervals[i]);
            //     if (counter > 0) {
            //         if (counter === 1) {
            //             return counter + ' ' + i + ' назад'; // singular (1 day ago)
            //         }
            //         if (counter > 2 && counter < 5)  { // 2-5 часа
            //             return counter + ' ' + i + 'а назад';
            //         }
            //         if (counter >= 5 && counter <= 20)  { // 2-5 часа
            //             console.log(counter);
            //             return counter + ' ' + i + 'ов назад';
            //         }
            //         if (counter === 21)  { // 21 час
            //             return counter + ' ' + i + ' назад';
            //         }
            //         if (counter >= 22 && counter <= 23)  { // 22-23 часа
            //             return counter + ' ' + i + 'а назад';
            //         }

            //         return counter + ' ' + i + ' назад'; // plural (2 days ago)
            //     }
            // }
        }
        return value;
    }

}