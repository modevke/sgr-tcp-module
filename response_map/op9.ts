import { hextonum, bytetodate, hextofloat } from "../converter";


export default function(information: Buffer, operation ) {

    let pin = 0
    const refund_reciept = (information.slice(pin, (pin+1))).equals(Buffer.from([0x55])) ? 'success' : 'fail';
    pin += 1;
    
    if( refund_reciept === 'fail'){

        const error_type = operation.errors.find((er) => {
            return (er.value).equals(information.slice(pin, (pin+1)))
        });
        pin += 1;

        const err_reason_len = hextonum(information.slice(pin, (pin+1)))
        pin += 1;
    
        const err_reason = (information.slice(pin, (pin+err_reason_len))).toString();

        return {
            status: refund_reciept.toUpperCase(),
            reason: err_reason,
            message: error_type.message
        }
    } else {
        return {
            status: refund_reciept.toUpperCase()
        }
    }
}