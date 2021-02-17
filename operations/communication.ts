import { configs } from '../configs';
import { numtohex, getbyteTime } from "../converter";
import { presentation, session } from "./assembler";

// 1) ACCESS REQUEST
export async function accessRequest(){
    const encrstr = configs.access_request;
    const encrstr_len = encrstr.length;

    const encrstrbuf = Buffer.from(encrstr);
    const encrstr_lenbuf = numtohex(encrstr_len, 1);
    const time = getbyteTime();

    const accessArr = [encrstr_lenbuf, encrstrbuf, time ];
    const presconfig = {
        type_code: Buffer.from([0xD1]),
        fun_code: Buffer.from([0x01]),
        version:  Buffer.from([0x01])
    }
    const preslayer = await presentation(Buffer.concat(accessArr), presconfig, 'access_request');
    const control_serial_no = numtohex(configs.csn.increment(), 4);

    return session(preslayer, control_serial_no);
}

// 3) HEARTBEAT
export async function heartbeat(){
    const time = getbyteTime();
    const presconfig = {
        type_code: Buffer.from([0xD1]),
        fun_code: Buffer.from([0x10]),
        version:  Buffer.from([0x01])
    }
    const preslayer = await presentation(time, presconfig, 'heartbeat');

    const control_serial_no = numtohex(configs.csn.increment(), 4);

    return session(preslayer, control_serial_no);
}