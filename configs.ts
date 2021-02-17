class Cycler{
    private count: number = 0;

    increment(){
        if(this.count === 4294967295){
            this.count = 1;
        } else {
            this.count++;
        }

        return this.count;
    }
}

export const configs = {
    host: '172.21.1.35',
    // host: 'localhost',
    port: 6003,
    access_request: 'U2FsdGVkX1+7W1lZCWSvDDSNuG5poEz0iLzgdlQaUDU=',
    csn: new Cycler(),
    header: Buffer.from([0xEF, 0xEF]),
    total_frames: Buffer.from([0x01]),
    current_frame: Buffer.from([0x01]),
    type_codes: [
        { 
            id: 1, 
            type: 'communication_control', 
            code: Buffer.from([0xD1]),
            fun_code: [
                { id: 1, type: 'access_request', code: Buffer.from([0x01]) },
                { id: 2, type: 'access_success_reciept', code: Buffer.from([0x02]) },
                { id: 3, type: 'heartbeat', code: Buffer.from([0x10]) },
            ]
        },
        { 
            id: 2, 
            type: 'booking_business', 
            code: Buffer.from([0xD2]),
            fun_code: [
                { id: 1, type: 'inquiry_tickets_receipt', code: Buffer.from([0x01]) },
                { id: 2, type: 'inquiry_tickets_receipt', code: Buffer.from([0x02]) },
                { 
                    id: 3, type: 'inquiry_tickets_failure', code: Buffer.from([0x03]),
                    errors: [
                      { value: Buffer.from([0x01]), message: 'Protocal resolution failed' },
                      { value: Buffer.from([0x02]), message: 'Inquiry condiion is incorrect' },
                      { value: Buffer.from([0x05]), message: 'No train information' },
                      { value: Buffer.from([0x06]), message: 'No seat infromation' }
                    ] 
                },
                { id: 4, type: 'booking_tickets_receipt', code: Buffer.from([0x05]) },
                { 
                    id: 5, type: 'booking_tickets_failure', code: Buffer.from([0x06]),
                    errors: [
                        { value: Buffer.from([0x01]), message: 'Protocal resolution failed' },
                        { value: Buffer.from([0x02]), message: 'the booking condition is incorrect' },
                        { value: Buffer.from([0x03]), message: 'insufficient tickets' },
                        { value: Buffer.from([0x04]), message: 'get of ticket price failed' },
                        { value: Buffer.from([0x05]), message: 'oracle exception' },
                        { value: Buffer.from([0x09]), message: 'You have already booked this train' },
                      ] 
                },
                { id: 6, type: 'trade_inquiry_receipt', code: Buffer.from([0x09]) },
                { 
                    id: 7, type: 'trade_inquiry_failure', code: Buffer.from([0x0A]),
                    errors: [
                        { value: Buffer.from([0x01]), message: 'Protocal resolution failed' },
                        { value: Buffer.from([0x02]), message: 'the booking condition is incorrect' },
                        { value: Buffer.from([0x03]), message: 'no such trade' }
                      ] 
                },
                { id: 8, type: 'cancel_trade_id', code: Buffer.from([0x0C]),
                    errors: [
                        { value: Buffer.from([0x01]), message: 'Protocal resolution failed' },
                        { value: Buffer.from([0x02]), message: 'oracle exception' },
                        { value: Buffer.from([0x03]), message: 'no such trade' },
                        { value: Buffer.from([0x04]), message: 'the trade has been paid' },
                        { value: Buffer.from([0x05]), message: 'the trade is invalid' },
                    ] 
                },
            ]
        },
        { 
            id: 3,
            type: 'payment_notification', 
            code: Buffer.from([0xD4]),
            fun_code: [
                { id: 1, type: 'payment_validation', code: Buffer.from([0x01]) },
                { 
                    id: 2, type: 'payment_validation_reciept', code: Buffer.from([0x02]),
                    errors: [
                        { value: Buffer.from([0x01]), message: 'no such trade' },
                        { value: Buffer.from([0x02]), message: 'the trade is invalid' },
                        { value: Buffer.from([0x03]), message: 'the trade has been paid' },
                        { value: Buffer.from([0x04]), message: 'the payment amount is wrong' }
                      ] 
                },
                { id: 3, type: 'payment_confirmation', code: Buffer.from([0x03]) },
                { id: 4, type: 'payment_confirmation_ack', code: Buffer.from([0x04]),
                    errors: [
                        { value: Buffer.from([0x01]), message: 'no such trade' },
                        { value: Buffer.from([0x02]), message: 'the trade is invalid' },
                        { value: Buffer.from([0x03]), message: 'the trade has been paid' },
                        { value: Buffer.from([0x04]), message: 'the payment amount is wrong' }
                    ] 
                },
            ]
        },
        {
            id: 4,
            type: 'refund_business', 
            code: Buffer.from([0xD3]),
            fun_code: [
                { id: 1, type: 'refund_request', code: Buffer.from([0x01]) },
                { id: 2, type: 'refund_reciept', code: Buffer.from([0x02]),
                    errors: [
                        { value: Buffer.from([0x04]), message: 'ticket hasnt been paid successfully' },
                        { value: Buffer.from([0x05]), message: 'the ticket isnt the normal state' },
                        { value: Buffer.from([0x06]), message: 'the ticket has been printed' },
                        { value: Buffer.from([0x07]), message: 'violate the replace rules' },
                        { value: Buffer.from([0x08]), message: ' no left ticket' }
                    ] 
                },
            ]
        },
        {
            id: 5,
            type: 'replace_business', 
            code: Buffer.from([0xD5]),
            fun_code: [
                { id: 1, type: 'replace_request', code: Buffer.from([0x01]) },
                { id: 2, type: 'replace_reciept', code: Buffer.from([0x02]),},
                { id: 3, type: 'replace_reciept_fail', code: Buffer.from([0x03]),
                    errors: [
                        { value: Buffer.from([0x01]), message: 'the protocal resolution failed' },
                        { value: Buffer.from([0x02]), message: 'oracle exception' },
                        { value: Buffer.from([0x03]), message: 'no such ticket' },
                        { value: Buffer.from([0x04]), message: 'ticket hasnt been paid successfully' },
                        { value: Buffer.from([0x05]), message: 'ticket has been printed' },
                        { value: Buffer.from([0x06]), message: 'the ticket status isnt normal' },
                        { value: Buffer.from([0x07]), message: 'refund time is over' },
                        { value: Buffer.from([0x08]), message: 'the refund rate is wrong' },
                        { value: Buffer.from([0x09]), message: 'the refund price is wrong' },
                    ] 
                },
            ]
        }
    ],
    version: Buffer.from([0x01]),
    tail: Buffer.from([0xFD, 0xFD]),
}
