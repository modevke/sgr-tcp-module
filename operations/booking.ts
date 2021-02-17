import { configs } from './../configs';
import { numtohex, getbyteTime } from "../converter";
import { presentation, session } from "./assembler";

// 2) BOOKING TICKETS
export async function bookingTickets(data, req_id){
    const mobilephonelen = numtohex((data.mobile).length, 1);
    const mobilephone = Buffer.from(data.mobile); 

    const namelen = numtohex((data.name).length, 1);
    const name = Buffer.from(data.name);

    const operation_time = getbyteTime();
    const boarding_time = getbyteTime(data.boarding_time);

    const boarding_stationlen = numtohex((data.boarding_station).length, 1);
    const boarding_station = Buffer.from(data.boarding_station);

    const station_order_boarding_station =  numtohex(data.station_order_boarding_station, 1);

    const arrival_stationlen =  numtohex((data.arrival_station).length, 1);
    const arrival_station = Buffer.from(data.arrival_station);

    const station_order_arrival_station =  numtohex(data.station_order_arrival_station, 1);
    
    const train_id =  numtohex(data.train_id, 4);
    
    const train_nolen =  numtohex((data.train_no).length, 1);
    const train_no = Buffer.from(data.train_no);

    const seat_typelen = numtohex((data.seat_type).length, 1);
    const seat_type = Buffer.from(data.seat_type);

    const count_of_booking_tickets = numtohex((data.passengers).length, 1);

    const passengers = data.passengers.map( function(psg) {

        let ticket_type, id_passport, id_passportlen;
        if(psg.age >= 3 && psg.age <= 11){
            ticket_type = 'Child';
            id_passport =  `${psg.id_passport}M${psg.age}`
            id_passportlen = id_passport.length;
        } else if(psg.age >= 12 && psg.age <= 17){
            ticket_type = 'Common';
            id_passport =  `${psg.id_passport}M${psg.age}`
            id_passportlen = id_passport.length;
        } else{
            ticket_type = 'Common';
            id_passport = psg.id_passport;
            id_passportlen = id_passport.length;
        }
            
        const ticket_typelen = numtohex(ticket_type.length, 1);
        const ticket_typebuf = Buffer.from(ticket_type);

        const namelen = numtohex((psg.name).length, 1);
        const name = Buffer.from(psg.name); 

        const id_passportlenBuf = numtohex(id_passportlen, 1);
        const id_passportBuf = Buffer.from(id_passport);

        const natiinalitylen = numtohex((psg.nationality).length, 1);
        const natiinality = Buffer.from(psg.nationality); 

        const genderlen = numtohex((psg.gender).length, 1);
        const gender = Buffer.from(psg.gender);

        return Buffer.concat([ticket_typelen, ticket_typebuf, namelen, name, id_passportlenBuf, id_passportBuf, natiinalitylen, natiinality, genderlen, gender]);

    });

    const infromationArr = [
        mobilephonelen, mobilephone, namelen, name, operation_time, boarding_time, boarding_stationlen, boarding_station, station_order_boarding_station,
        arrival_stationlen, arrival_station, station_order_arrival_station, train_id, train_nolen, train_no, seat_typelen, seat_type, count_of_booking_tickets
    ]

    const finalArr = infromationArr.concat(passengers);

    const presconfig = {
        type_code: Buffer.from([0xD2]),
        fun_code: Buffer.from([0x04]),
        version:  Buffer.from([0x01]),
        req_id: req_id
    }

    const preslayer = await presentation(Buffer.concat(finalArr), presconfig, 'booking_ticket');
    const control_serial_no = numtohex(configs.csn.increment(), 4);

     return session(preslayer, control_serial_no);

}
