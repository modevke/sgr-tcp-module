import { configs } from './../configs';
import { numtohex, getbyteTime } from "../converter";
import { presentation, session } from "./assembler";

// 1) INQUIRY TICKETS
export async function inquiryTickets(data, req_id){
    const mobilephonelen = numtohex((data.mobile).length, 1);
    const mobilephone = Buffer.from(data.mobile); 

    const namelen = numtohex((data.name).length, 1);
    const name = Buffer.from(data.name);
    
    const boarding_time = getbyteTime(data.boarding_time);

    const boarding_stationlen = numtohex((data.boarding_station).length, 1);
    const boarding_station =Buffer.from(data.boarding_station);
    
    const arrival_stationlen =  numtohex((data.arrival_station).length, 1);
    const arrival_station = Buffer.from(data.arrival_station);

    const train_nolen = numtohex((data.train_no).length, 1);
    const train_no = Buffer.from(data.train_no);

    const infromationArr = [
        mobilephonelen, mobilephone, namelen, name, boarding_time, boarding_stationlen, 
        boarding_station, arrival_stationlen, arrival_station, train_nolen, train_no 
    ];
    const presconfig = {
        type_code: Buffer.from([0xD2]),
        fun_code: Buffer.from([0x01]),
        version:  Buffer.from([0x01]),
        req_id: req_id
    }

    const preslayer = await presentation(Buffer.concat(infromationArr), presconfig, 'inquiry_ticket');
    const control_serial_no = numtohex(configs.csn.increment(), 4);

     return session(preslayer, control_serial_no);
}