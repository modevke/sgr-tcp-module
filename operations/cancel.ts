import { configs } from './../configs';
import { numtohex } from "../converter";
import { presentation, session } from "./assembler";

// 4) CANCEL TRADE ID
export async function cancelTradeId(data, req_id){
    const trade_id = numtohex(data.trade_id, 4);

    const infromationArr = [
        trade_id
    ];
    const presconfig = {
        type_code: Buffer.from([0xD2]),
        fun_code: Buffer.from([0x0B]),
        version:  Buffer.from([0x01]),
        req_id: req_id
    }

    const preslayer = await presentation(Buffer.concat(infromationArr), presconfig, 'cancel_trade_id');
    const control_serial_no = numtohex(configs.csn.increment(), 4);

    return session(preslayer, control_serial_no);
}
