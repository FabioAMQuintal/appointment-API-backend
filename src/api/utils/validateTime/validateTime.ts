import { isFuture, getHours, parseJSON, getMinutes, getSeconds, getMilliseconds } from 'date-fns';

class ValidateTime {

    public checkValidTime(date: string){
        const parsedDate = this.parseTime(date);
        const hours = getHours(parsedDate) + 3;
        const minutes = getMinutes(parsedDate);
        const seconds = getSeconds(parsedDate);
        const mili = getMilliseconds(parsedDate);

        let valid: boolean;
        
        if(hours >= 8 && hours <= 16){
            valid = true
        } else if(hours === 17 && minutes === 0 && seconds === 0 && mili === 0){
            valid = true
        } else {
            valid = false
        }
        return valid;
    }

    public checkFutureDate(date: string){
        return isFuture(this.parseTime(date))
    }

    public parseTime(date: string){
        return parseJSON(date);
    }

}

export default new ValidateTime();