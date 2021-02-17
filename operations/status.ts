import { configs } from './../configs';
import { numtohex, getbyteTime } from "../converter";
import { presentation, session } from "./assembler";

// 3) TRADE STATUS BY ID
export async function inquiryTradeById(data, req_id){
    const trade_id = numtohex(data.trade_id, 4);
    const mobilephonelen = numtohex((data.mobile).length, 1);
    const mobilephone = Buffer.from(data.mobile); 

    const infromationArr = [
        trade_id, mobilephonelen, mobilephone
    ];
    const presconfig = {
        type_code: Buffer.from([0xD2]),
        fun_code: Buffer.from([0x07]),
        version:  Buffer.from([0x01]),
        req_id: req_id
    }

    const preslayer = await presentation(Buffer.concat(infromationArr), presconfig, 'inquiry_trade_id');
    const control_serial_no = numtohex(configs.csn.increment(), 4);

    return session(preslayer, control_serial_no);
}

// 3) TRADE STATUS BY BOOKING DATE
export async function inquiryBookingDate(data, req_id){
    const mobilephonelen = numtohex((data.mobile).length, 1);
    const mobilephone = Buffer.from(data.mobile); 
    const start_time = getbyteTime(data.start_time);
    const end_time = getbyteTime(data.end_time);

    const infromationArr = [
        mobilephonelen, mobilephone, start_time, end_time
    ];
    const presconfig = {
        type_code: Buffer.from([0xD2]),
        fun_code: Buffer.from([0x08]),
        version:  Buffer.from([0x01]),
        req_id: req_id
    }

    const preslayer = await presentation(Buffer.concat(infromationArr), presconfig, 'inquiry_trade_date');
    const control_serial_no = numtohex(configs.csn.increment(), 4);

    return session(preslayer, control_serial_no);
}