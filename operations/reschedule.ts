import { configs } from './../configs';
import { numtohex, getbyteTime } from "../converter";
import { presentation, session } from "./assembler";

export async function replace(data, req_id){

    const mobilephonelen = numtohex((data.mobile).length, 1);
    const mobilephone = Buffer.from(data.mobile); 

    const namelen = numtohex((data.name).length, 1);
    const name = Buffer.from(data.name); 

    const replace_time = getbyteTime(data.refund_time);

    const boarding_time = getbyteTime(data.boarding_time);

    const boarding_stationlen = numtohex((data.boarding_station).length, 1);
    const boarding_station =Buffer.from(data.boarding_station);
    
    const station_order_boarding_station = numtohex(data.station_order_boarding_station, 1);

    const arrival_stationlen =  numtohex((data.arrival_station).length, 1);
    const arrival_station = Buffer.from(data.arrival_station);

    const station_order_arrival_station = numtohex(data.station_order_arrival_station, 1);

    const train_id =  numtohex(data.train_id, 4);
    
    const train_nolen =  numtohex((data.train_no).length, 1);
    const train_no = Buffer.from(data.train_no);

    const seat_typelen = numtohex((data.seat_type).length, 1);
    const seat_type = Buffer.from(data.seat_type);

    const count_of_original_tickets = numtohex((data.tickets).length, 1);

    const tickets = data.tickets.map( function(tck) {
        const stub_id = numtohex(tck.stub_id, 4);

        return Buffer.concat([ stub_id ]);
    });

    const infromationArr = [
        mobilephonelen, mobilephone, namelen, name, replace_time, boarding_time, boarding_stationlen, boarding_station, station_order_boarding_station, arrival_stationlen, arrival_station, station_order_arrival_station, train_id, train_nolen, train_no, seat_typelen, seat_type, count_of_original_tickets
    ];

    const finalArr = infromationArr.concat(tickets);

    const presconfig = {
        type_code: Buffer.from([0xD3]),
        fun_code: Buffer.from([0x01]),
        version:  Buffer.from([0x01]),
        req_id: req_id
    }

    const preslayer = await presentation(Buffer.concat(finalArr), presconfig, 'refund');
    const control_serial_no = numtohex(configs.csn.increment(), 4);

     return session(preslayer, control_serial_no);

}