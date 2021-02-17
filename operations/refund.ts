import { configs } from './../configs';
import { numtohex, getbyteTime, floattohex } from "../converter";
import { presentation, session } from "./assembler";

export async function refund(data, req_id){

    const mobilephonelen = numtohex((data.mobile).length, 1);
    const mobilephone = Buffer.from(data.mobile); 

    const namelen = numtohex((data.name).length, 1);
    const name = Buffer.from(data.name); 

    const refund_time = getbyteTime(data.refund_time);

    const total_refund_money = floattohex(data.total_refund_money, 4);

    const count_refund_tickets = numtohex((data.tickets).length, 1);

    const tickets = data.tickets.map( function(tck) {
        const stub_id = numtohex(tck.stub_id, 4);
        const refund_rate = floattohex(tck.refund_rate, 4);
        const refund_fare = floattohex(tck.refund_fare, 4);
        const net_refund = floattohex(tck.net_refund, 4);

        return Buffer.concat([ stub_id, refund_rate, refund_fare, net_refund ]);
    });

    const infromationArr = [
        mobilephonelen, mobilephone, namelen, name, refund_time, total_refund_money, count_refund_tickets
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
