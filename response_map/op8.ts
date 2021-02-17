import { hextonum } from "../converter";


export default function(information: Buffer, operation ) {

    let pin = 0
    const trade_id = hextonum(information.slice(pin, (pin+4)));
    pin += 4;

    const cancel_result = (information.slice(pin, (pin+1))).equals(Buffer.from([0x55])) ? 'success' : 'fail';
    pin += 1;

    if( cancel_result === 'fail'){
        const error_type = operation.errors.find((er) => {
            return (er.value).equals(information.slice(pin, (pin+1)))
        });
        pin += 1;

        const err_reason_len = hextonum(information.slice(pin, (pin+1)))
        pin += 1;
    
        const err_reason = (information.slice(pin, (pin+err_reason_len))).toString();

        return {
            trade_id: trade_id,
            status: cancel_result.toUpperCase(),
            reason: err_reason,
            message: error_type.message
        }
    
    } else{
        return {
            trade_id: trade_id,
            status: cancel_result.toUpperCase()
        }
    }


}