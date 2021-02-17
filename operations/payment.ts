import { configs } from './../configs';
import { numtohex, floattohex, getbyteTime } from "../converter";
import { presentation, session } from "./assembler";

export async function paymentValidation(data, req_id){

    const mobilephonelen = numtohex((data.mobile).length, 1);
    const mobilephone = Buffer.from(data.mobile); 

    const namelen = numtohex((data.name).length, 1);
    const name = Buffer.from(data.name); 

    const trade_id = numtohex(data.trade_id, 4);

    const payment_amount = floattohex(data.payment_amount, 4);

    const infromationArr = [
        mobilephonelen, mobilephone, namelen, name, trade_id, payment_amount
    ];

    const presconfig = {
        type_code: Buffer.from([0xD4]),
        fun_code: Buffer.from([0x01]),
        version:  Buffer.from([0x01]),
        req_id: req_id
    }

    const preslayer = await presentation(Buffer.concat(infromationArr), presconfig, 'payment_validate');
    const control_serial_no = numtohex(configs.csn.increment(), 4);

    return session(preslayer, control_serial_no);
    
}


export async function paymentConfirmation(data, req_id){
    
    const mobilephonelen = numtohex((data.mobile).length, 1);
    const mobilephone = Buffer.from(data.mobile); 

    const namelen = numtohex((data.name).length, 1);
    const name = Buffer.from(data.name); 

    const trade_id = numtohex(data.trade_id, 4);

    const paymentidlen = numtohex((data.payment_id).length, 1);
    const payment_id = Buffer.from(data.payment_id); 

    const payment_amount = floattohex(data.payment_amount, 4);

    const payment_time = getbyteTime(data.payment_time);

    let payment_result;
    if(data.payment_result === 'success'){
        payment_result = Buffer.from ([0x55])
    } else {
        payment_result = Buffer.from ([0xAA])
    }

    const payment_descriptionlen =  numtohex((data.payment_description).length, 1);
    const payment_description = Buffer.from(data.payment_description);

    
    const infromationArr = [
        mobilephonelen, mobilephone, namelen, name, trade_id, paymentidlen, payment_id, payment_amount, payment_time, payment_result, payment_descriptionlen, payment_description
    ];

    const presconfig = {
        type_code: Buffer.from([0xD4]),
        fun_code: Buffer.from([0x02]),
        version:  Buffer.from([0x01]),
        req_id: req_id
    }

    const preslayer = await presentation(Buffer.concat(infromationArr), presconfig, 'payment_confirm');
    const control_serial_no = numtohex(configs.csn.increment(), 4);

    return session(preslayer, control_serial_no);

}