import { hextonum } from "../converter";


export default function(information: Buffer, operation ) {

    let pin = 0;
    const train_id = hextonum(information.slice(pin, (pin+4)));
    pin += 4;

    const validation_result = (information.slice(pin, (pin+1))).equals(Buffer.from([0x55])) ? 'success' : 'fail';
    pin += 1;

    if(validation_result === 'fail'){
        const error_type = operation.errors.find((er) => {
            return (er.value).equals(information.slice(pin, (pin+1)))
        });
        pin += 1;

        const err_reason_len = hextonum(information.slice(pin, (pin+1)))
        pin += 1;
    
        const err_reason = (information.slice(pin, (pin+err_reason_len))).toString();

        return {
            status: validation_result.toUpperCase(),
            reason: err_reason,
            message: error_type.message
        }
    } else {
        return {
            status: validation_result.toUpperCase()
        }
    }

}