import { hextonum, bytetodate, hextodword, hextoword } from "../converter";

export default async function(information: Buffer, informationlen ){

    const count_of_train = hextonum(information.slice(0, 1));

    const trains = information.slice(1, informationlen);
    const trainslen = Buffer.byteLength(trains);

    const trainsArr = [];

    if(count_of_train > 1){
        let loop_pos = 0;
        for(let i = 0; i < count_of_train; i++){
            let pin_pos = loop_pos;
            const train_id = hextodword(trains.slice(pin_pos, (pin_pos+4)));
            pin_pos += 4;
            const length_of_train = hextonum(trains.slice(pin_pos, (pin_pos+1)));
            pin_pos += 1;
            const train_no = (trains.slice(pin_pos, (pin_pos+length_of_train))).toString();
            pin_pos += length_of_train;
            const length_boarding_station = hextonum(trains.slice(pin_pos, (pin_pos+1)));
            pin_pos += 1;
            const boarding_station = (trains.slice(pin_pos, (pin_pos+length_boarding_station))).toString();
            pin_pos += length_boarding_station;
            const station_order_boarding_station = hextonum(trains.slice(pin_pos, (pin_pos+1)));
            pin_pos += 1;
            const depart_time = bytetodate(trains.slice(pin_pos, (pin_pos+7)));
            pin_pos += 7;
            const length_arrival_station = hextonum(trains.slice(pin_pos, (pin_pos+1)));
            pin_pos += 1;
            const arrival_station = (trains.slice(pin_pos, (pin_pos+length_arrival_station))).toString();
            pin_pos += length_arrival_station;
            const station_order_arrival_station = hextonum(trains.slice(pin_pos, (pin_pos+1)));
            pin_pos += 1;
            const arrival_time = bytetodate(trains.slice(pin_pos, (pin_pos+7)));
            pin_pos += 7;

            const count_of_seat = hextonum(trains.slice(pin_pos, (pin_pos+1)));
            pin_pos += 1;

            const seats = trains.slice(pin_pos, trainslen);
            const seatslen = Buffer.from(seats);
            let seatsArr = [];
            let posupdate;

            if(count_of_seat > 1){
                let loop_pos2 = 0;
                for(let i = 0; i < count_of_seat; i++){
                    let pin_pos2 = loop_pos2;
                    const length_seat_type = hextonum(seats.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const seat_type = (seats.slice(pin_pos2, (pin_pos2+length_seat_type))).toString();
                    pin_pos2 += length_seat_type;
                    const seat_balance = hextoword(seats.slice(pin_pos2, (pin_pos2+2)))
                    pin_pos2 += 2;

                    loop_pos2 = pin_pos2;

                    if(i === (count_of_seat -1)){
                        posupdate = pin_pos2;
                    }

                    seatsArr.push({
                        seat_type: seat_type,
                        seat_balance: seat_balance
                    })
                }
            } else {
                let pin_pos2 = 0;
                    const length_seat_type = hextonum(seats.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const seat_type = (seats.slice(pin_pos2, (pin_pos2+length_seat_type))).toString();
                    pin_pos2 += length_seat_type;
                    const seat_balance = hextoword(seats.slice(pin_pos2, (pin_pos2+2)))
                    pin_pos2 += 2;

                    seatsArr.push({
                        seat_type: seat_type,
                        seat_balance: seat_balance
                    })
            }

            loop_pos = (pin_pos + posupdate);

            trainsArr.push({
                train_id: train_id,
                train_no: train_no,
                boarding_station: boarding_station,
                station_order_boarding_station: station_order_boarding_station,
                depart_time: depart_time,
                arrival_station: arrival_station,
                station_order_arrival_station: station_order_arrival_station,
                arrival_time: arrival_time,
                seats: seatsArr
            })

        }
    } else {
        
        let pin_pos = 0;
            const train_id = hextodword(trains.slice(pin_pos, (pin_pos+4)));
            pin_pos += 4;
            const length_of_train = hextonum(trains.slice(pin_pos, (pin_pos+1)));
            pin_pos += 1;
            const train_no = (trains.slice(pin_pos, (pin_pos+length_of_train))).toString();
            pin_pos += length_of_train;
            const length_boarding_station = hextonum(trains.slice(pin_pos, (pin_pos+1)));
            pin_pos += 1;
            const boarding_station = (trains.slice(pin_pos, (pin_pos+length_boarding_station))).toString();
            pin_pos += length_boarding_station;
            const station_order_boarding_station = hextonum(trains.slice(pin_pos, (pin_pos+1)));
            pin_pos += 1;
            const depart_time = bytetodate(trains.slice(pin_pos, (pin_pos+7)));
            pin_pos += 7;
            const length_arrival_station = hextonum(trains.slice(pin_pos, (pin_pos+1)));
            pin_pos += 1;
            const arrival_station = (trains.slice(pin_pos, (pin_pos+length_arrival_station))).toString();
            pin_pos += length_arrival_station;
            const station_order_arrival_station = hextonum(trains.slice(pin_pos, (pin_pos+1)));
            pin_pos += 1;
            const arrival_time = bytetodate(trains.slice(pin_pos, (pin_pos+7)));
            pin_pos += 7;

            const count_of_seat = hextonum(trains.slice(pin_pos, (pin_pos+1)));
            pin_pos += 1;

            const seats = trains.slice(pin_pos, trainslen);
            const seatslen = Buffer.from(seats);
            let seatsArr = [];
            let posupdate;

            if(count_of_seat > 1){
                let loop_pos2 = 0;
                for(let i = 0; i < count_of_seat; i++){
                    let pin_pos2 = loop_pos2;
                    const length_seat_type = hextonum(seats.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const seat_type = (seats.slice(pin_pos2, (pin_pos2+length_seat_type))).toString();
                    pin_pos2 += length_seat_type;
                    const seat_balance = hextoword(seats.slice(pin_pos2, (pin_pos2+2)))
                    pin_pos2 += 2;

                    loop_pos2 = pin_pos2;

                    if(i === (count_of_seat -1)){
                        posupdate = pin_pos2;
                    }

                    seatsArr.push({
                        seat_type: seat_type,
                        seat_balance: seat_balance
                    })
                }
            } else {
                let pin_pos2 = 0;
                    const length_seat_type = hextonum(seats.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const seat_type = (seats.slice(pin_pos2, (pin_pos2+length_seat_type))).toString();
                    pin_pos2 += length_seat_type;
                    const seat_balance = hextoword(seats.slice(pin_pos2, (pin_pos2+2)))
                    pin_pos2 += 2;

                    seatsArr.push({
                        seat_type: seat_type,
                        seat_balance: seat_balance
                    })
            }

            trainsArr.push({
                train_id: train_id,
                train_no: train_no,
                boarding_station: boarding_station,
                station_order_boarding_station: station_order_boarding_station,
                depart_time: depart_time,
                arrival_station: arrival_station,
                station_order_arrival_station: station_order_arrival_station,
                arrival_time: arrival_time,
                seats: seatsArr
            })

    }

    return {
        trains: trainsArr,
        status: 'SUCCESS'
    };

}