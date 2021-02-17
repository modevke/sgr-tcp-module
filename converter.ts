import moment from 'moment-timezone';

export function numtohex(num, byteLen){
    let buf = Buffer.allocUnsafe(byteLen);
    buf.writeUIntLE(num, 0, byteLen);
    return buf;
}

export function numtodword(num, byteLen){
    let buf = Buffer.allocUnsafe(byteLen);
    buf.writeUInt32LE(num, 0);
    return buf;
}

export function floattohex(num, byteLen){
    let buf = Buffer.allocUnsafe(byteLen);
    buf.writeFloatLE(num, 0);
    return buf;
}

export function hextonum(hex: Buffer){
    const hexlen = Buffer.byteLength(hex);
    return hex.readUIntLE(0, hexlen);
}

export function getbyteTime(date = moment()){
    const now = date;
    const year = numtohex(now.year(), 2);
    const month = numtohex(((now.month())+1), 1);
    const day = numtohex(now.date(), 1);
    const hour = numtohex(now.hour(), 1);
    const minute = numtohex(now.minute() ,1);
    const second = numtohex(now.second(), 1);

    const dateArr = [ year, month, day, hour, minute, second ];
    return Buffer.concat(dateArr);
}

export function bytetodate(hex: Buffer){
    const year = hextonum(hex.slice(0, 2));
    const month = hextonum(hex.slice(2, 3));
    const day = hextonum(hex.slice(3, 4));
    const hour = hextonum(hex.slice(4, 5));
    const minute = hextonum(hex.slice(5, 6));
    const second = hextonum(hex.slice(6, 7));

    return `${year}/${month}/${day} ${hour}:${minute}:${second}`
}

export function hextodword(hex: Buffer){
    return hex.readUInt32LE(0);
}

export function hextoword(hex: Buffer){
    return hex.readUInt16LE(0);
}

export function hextofloat(hex: Buffer){
   return hex.readFloatLE(0)
}