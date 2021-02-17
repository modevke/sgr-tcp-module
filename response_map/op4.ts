import { hextonum, bytetodate, hextofloat } from "../converter";

export default function (information, informationlen) {
    
    let pin = 0
    const trade_id = hextonum(information.slice(pin, (pin+4)));
    pin += 4;
   
    const boarding_time = bytetodate(information.slice(pin, (pin+7)));
    pin += 7;

    const length_boarding_station = hextonum(information.slice(pin, (pin+1)));
    pin += 1;
    const boarding_station = (information.slice(pin, (pin+length_boarding_station))).toString();
    pin += length_boarding_station;

    const length_arrival_station = hextonum(information.slice(pin, (pin+1)));
    pin += 1;
    const arrival_station = (information.slice(pin, (pin+length_arrival_station))).toString();
    pin += length_arrival_station;

    const train_id = hextonum(information.slice(pin, (pin+4)));
    pin += 4;

    const length_train_no = hextonum(information.slice(pin, (pin+1)));
    pin += 1;
    const train_no = (information.slice(pin, (pin+length_train_no))).toString();
    pin += length_train_no;

    const total_ticket_price = hextofloat(information.slice(pin, (pin+4)));
    pin += 4;

    const ticket_count = hextonum(information.slice(pin, (pin+2)));
    pin += 2;

    const tickets = information.slice(pin, informationlen);

    let ticketArr = [];

    if(ticket_count > 1){
    let loop_pos = 0
        for(let i = 0; i < ticket_count; i++){
            let pin_pos = loop_pos;
            const ticket_stub_id = hextonum(tickets.slice(pin_pos, (pin_pos+4)));
            pin_pos += 4;
            const seat_nolen = hextonum(tickets.slice(pin_pos, (pin_pos+1)));
            pin_pos += 1;
            const seat_no = (tickets.slice(pin_pos, (pin_pos+seat_nolen))).toString();
            pin_pos += seat_nolen;
            const coach_no = hextonum(tickets.slice(pin_pos, (pin_pos+1)));
            pin_pos += 1;
            const seat_typelen = hextonum(tickets.slice(pin_pos, (pin_pos+1)));
            pin_pos += 1;
            const seat_type = (tickets.slice(pin_pos, (pin_pos+seat_typelen))).toString();
            pin_pos += seat_typelen;
            const berthlen = hextonum(tickets.slice(pin_pos, (pin_pos+1)));
            pin_pos += 1;
            const berth = (tickets.slice(pin_pos, (pin_pos+berthlen))).toString();
            pin_pos += berthlen;
            const ticket_typelen = hextonum(tickets.slice(pin_pos, (pin_pos+1)));
            pin_pos += 1;
            const ticket_type = (tickets.slice(pin_pos, (pin_pos+ticket_typelen))).toString();
            pin_pos += ticket_typelen;
            const ticket_price = hextofloat(tickets.slice(pin_pos, (pin_pos+4)));
            pin_pos += 4;

            loop_pos = pin_pos;

            ticketArr.push({
                ticket_stub_id: ticket_stub_id,
                seat_no: seat_no,
                coach_no: coach_no,
                seat_type: seat_type,
                berth: berth,
                ticket_type: ticket_type,
                ticket_price: ticket_price
            })

        }
    }else {

        let pin_pos = 0;
        const ticket_stub_id = hextonum(tickets.slice(pin_pos, (pin_pos+4)));
        pin_pos += 4;
        const seat_nolen = hextonum(tickets.slice(pin_pos, (pin_pos+1)));
        pin_pos += 1;
        const seat_no = (tickets.slice(pin_pos, (pin_pos+seat_nolen))).toString();
        pin_pos += seat_nolen;
        const coach_no = hextonum(tickets.slice(pin_pos, (pin_pos+1)));
        pin_pos += 1;
        const seat_typelen = hextonum(tickets.slice(pin_pos, (pin_pos+1)));
        pin_pos += 1;
        const seat_type = (tickets.slice(pin_pos, (pin_pos+seat_typelen))).toString();
        pin_pos += seat_typelen;
        const berthlen = hextonum(tickets.slice(pin_pos, (pin_pos+1)));
        pin_pos += 1;
        const berth = (tickets.slice(pin_pos, (pin_pos+berthlen))).toString();
        pin_pos += berthlen;
        const ticket_typelen = hextonum(tickets.slice(pin_pos, (pin_pos+1)));
        pin_pos += 1;
        const ticket_type = (tickets.slice(pin_pos, (pin_pos+ticket_typelen))).toString();
        pin_pos += ticket_typelen;
        const ticket_price = hextofloat(tickets.slice(pin_pos, (pin_pos+4)));
        pin_pos += 4;

        ticketArr.push({
            ticket_stub_id: ticket_stub_id,
            seat_no: seat_no,
            coach_no: coach_no,
            seat_type: seat_type,
            berth: berth,
            ticket_type: ticket_type,
            ticket_price: ticket_price
        })

    }

    return {
        trade_id: trade_id,
        boarding_time: boarding_time,
        boarding_station: boarding_station,
        arrival_station: arrival_station,
        train_id: train_id,
        train_no: train_no,
        total_ticket_price: total_ticket_price,
        tickets: ticketArr,
        status: 'SUCCESS'
    }


}