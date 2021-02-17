import { heartcron } from './../cron';
import { configs } from './../configs';
import opError from '../response_map/error';
import op2 from '../response_map/op2';
import op4 from '../response_map/op4';
import op6 from '../response_map/op6';
import op8 from '../response_map/op8';
import op9 from '../response_map/op9';
import op10 from '../response_map/op10';
import op11 from '../response_map/op11';


export async function dataResponse(data: Buffer) {
    const datalen = Buffer.byteLength(data);
    const headermatch = Buffer.concat([ configs.header, configs.total_frames, configs.current_frame]);
    const header = data.slice(0, 4);
    const tailmatch = configs.tail;
    const tail = data.slice(datalen-2, datalen);
    

    if(headermatch.equals(header) && tailmatch.equals(tail)){

        const presentation = data.slice(10, (datalen-2));
        const presentationlen = Buffer.byteLength(presentation);
        const res_type_code = presentation.slice(0, 1);

        const req_no = presentation.slice(9, 13);


        const information = presentation.slice(13, presentationlen);
        const informationlen = Buffer.byteLength(information);

        const business: any = configs.type_codes.find((type_code) => {
            return (type_code.code).equals(res_type_code);
        });

        if(business.id === 1){
            const fun_code = presentation.slice(1, 2);

            const operation = business.fun_code.find((fun) => {
                return (fun.code).equals(fun_code);
            });

        
            if(operation.id === 2){
                const success = Buffer.from([0x55]);
                const confirm_result = information.slice((informationlen-1), informationlen);
                const encr_str = information.slice(1, (informationlen-1));
                if(success.equals(confirm_result)){
                    // SUCCESS
                    console.log('SUCCESSFUL CONNECTION')
                    heartcron.start()
                    console.log(encr_str.toString());

                } else {
                    // FAILURE
                    console.log(encr_str.toString())
                }

            }
    
        } else if(business.id === 2){
            
            const fun_code = presentation.slice(1, 2);

            const operation = business.fun_code.find((fun) => {
                return (fun.code).equals(fun_code);
            });            

            // FIND REQUEST
            if(operation.id === 2){
                return await op2(information, informationlen);
            }else if(operation.id === 3 || operation.id === 5 || operation.id === 7){
                
                return opError(information, operation);
               
            } else if(operation.id === 4){
                return op4(information, informationlen);

            } else if(operation.id === 6) {
                return op6(information, informationlen);
            } else if(operation.id === 8) {
                return op8(information, operation);
            }

        } else if(business.id === 3){
            const fun_code = presentation.slice(1, 2);

            const operation = business.fun_code.find((fun) => {
                return (fun.code).equals(fun_code);
            });

            if(operation.id === 2 || operation.id === 4) {
                return op11(information, operation);
            }
        } else if(business.id === 4){
            const fun_code = presentation.slice(1, 2);

            const operation = business.fun_code.find((fun) => {
                return (fun.code).equals(fun_code);
            });

            if(operation.id === 2) {
                return op9(information, operation);
            }
        } else if(business.id === 5){
            const fun_code = presentation.slice(1, 2);

            const operation = business.fun_code.find((fun) => {
                return (fun.code).equals(fun_code);
            });

            if(operation.id === 2) {
                return op10(information, informationlen);
            }

            if(operation.id === 3) {
                return opError(information, operation);
            }
        }

    } else{
        // WRONG FORMAT
        return {
            status: 'false',
            reason: 'Invalid byte format',
            message: 'Invalid byte format'
        }
    }

}