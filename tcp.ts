import { configs } from './configs';
import { EventEmitter } from 'events';
import { heartcron } from './cron';
import moment from 'moment-timezone';
import net from 'net';
import { accessRequest, heartbeat } from './operations/communication';
import { dataResponse } from './operations/responses';


export const client = new net.Socket();

const host = configs.host,
    port = configs.port,
    timeout = 3000;

let retrying = false; 

export function makeConnection() {
    client.connect(port, host);
}

async function connectEventHandler() {

    console.log(`Connected to host ${client.remoteAddress} port ${client.remotePort} : ${moment().format('dddd, MMMM Do YYYY, h:mm:ss a')}`);
    retrying = false;

    const accreq = await accessRequest();
    // console.log('ACCESS REQUEST IS', accreq[0].toString('hex').replace(/(.)(.)/g, '$1$2 '))
    const accres = await sendTcp(accreq[0]);
    console.log('CONNECTION RESPONSE', accres.toString('hex').replace(/(.)(.)/g, '$1$2 '))
    await dataResponse(accres);    

}

export async function heart() {
    console.log('***** heartbeat ******');
    const hbeat = await heartbeat();
    hbeat.forEach((el) => {
        client.write(el);
    });
}


function errorEventHandler(e) {
    console.log(`Connection error ${e.code}`);

    // POST ALERT 

    if (!retrying) {
        retrying = true;
    }

    heartcron.stop();
    setTimeout(makeConnection, timeout);
}

function closeEventHandler() {
    if (retrying) return false;
    console.log('Server closed');
    console.log(`Reconnecting... in ${timeout / 1000} Seconds`);
    if (!retrying) {
        retrying = true;
    }
    return setTimeout(makeConnection, timeout);
}

class OnDataEmitter extends EventEmitter { }
const OnData = new OnDataEmitter();

// Start Eevent Listeners
client.on('connect', connectEventHandler);
client.on('error', errorEventHandler);
client.on('close', closeEventHandler);
client.on('data', (data) => {
    OnData.emit('response', data);
});

export const sendTcp = (message): Promise<Buffer> => {

    return new Promise((resolve, reject) => {

        console.log('SENDING MESSAGE')
        client.write(message);
       
        let status = false;
        OnData.on('response', (data) => {
            console.log('RESPONSE CAME BACK');
            
            status = true;
            const res = data;
            OnData.removeAllListeners('response');
            resolve(res);
        });

        setTimeout(()=>{
            if(status) return true;
            console.log('TIMED OUUUUUT');
            OnData.removeAllListeners('response');
            reject('Session timeout');
        }, 10000);
        
    });
}
