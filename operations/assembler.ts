import { configs } from './../configs';
import { numtohex } from "../converter";

// PRESENTATION ASSEMBLER
export async function presentation(info: Buffer, presconfig, prestype) {
    
    // CREATE A REQUEST NUMBER
    let req_id;
    if(prestype === 'access_request'){
        req_id = 1;
    } else if(prestype === 'heartbeat') {
        req_id = 2;
    } else{
        
        req_id = presconfig.req_id;
    }
    
    let request_no = numtohex(req_id, 4);

    // BYTE LENGTH
    let byte_length = Buffer.byteLength(info);

    console.log('BYTE LENGTH IS', byte_length);

    

    let slices = [];
    if(byte_length > 59996){
        console.log('TOOOOO BIG');
        
        const packet_count = Math.ceil(byte_length/59996);
        const lenth_diff = (byte_length - (packet_count-1) * 59996);
    
        for(let i = 0; 1 < packet_count; i++){
            let slice1 = (i*59996);
            let slice2;
            if(i === (packet_count-1)){
                slice2 = slice1+lenth_diff
            } else {
                slice2 = ((i+1)*59996);
            }
            slices.push(info.slice(slice1, slice2))
        }
    } else{
        console.log('JUUUUST OK');
        slices.push(info)
    }

    const total_count_of_packets = numtohex(slices.length, 2);

    const present = slices.map((slice, index) => {
        const current_packet_no = numtohex((index+1), 2);
        let slice_length = numtohex((Buffer.byteLength(slice) + 4), 2);
        const presentationArr = [ 
            presconfig.type_code, 
            presconfig.fun_code, 
            presconfig.version,
            total_count_of_packets,
            current_packet_no,
            slice_length,
            request_no,
            slice
        ];
        return Buffer.concat(presentationArr)
    });

    return present;
}


// SESSION ASSEMBLER
export function session(preslayer: Array<Buffer>, control_serial_no: Buffer) {

    return preslayer.map((el) => {
        const data_length = numtohex(Buffer.byteLength(el), 2);
        const sessArr = [ 
            configs.header, 
            configs.total_frames,
            configs.current_frame,
            control_serial_no,
            data_length,
            el,
            configs.tail
        ];
        return Buffer.concat(sessArr)
    });

}