import { hextonum } from "../converter";

export default function(information, operation) {
    let err_pin = 0
    const errtype = information.slice(err_pin, (err_pin+1));
    err_pin += 1;
    const err_reason_len = hextonum(information.slice(err_pin, (err_pin+1)))
    err_pin += 1;

    const err_reason = (information.slice(err_pin, (err_pin+err_reason_len))).toString();

    console.log('Error type is', errtype);

    const err_message = operation.errors.find((er) => {
        return (er.value).equals(errtype)
    });

    return {
        status: 'failed',
        reason: err_reason,
        message: err_message.message
    };

}