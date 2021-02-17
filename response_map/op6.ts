import { hextonum, bytetodate, hextofloat } from "../converter";

export default function(information: Buffer, informationlen ) {

    const trade_count = hextonum(information.slice(0, 1)); 

    const trades = information.slice(1, informationlen);
    const tradeslen = Buffer.byteLength(trades);
    let tradeArr = [];

    if(trade_count > 1) {
        let loop_pos = 0
        for(let i = 0; i < trade_count; i++) {
            let pin_pos = loop_pos;
            const trade_id = hextonum(trades.slice(pin_pos, (pin_pos+4)));
            pin_pos += 4;

            const trade_type = hextonum(trades.slice(pin_pos, (pin_pos+1)));
            pin_pos += 1;
            
            const trade_time = bytetodate(trades.slice(pin_pos, (pin_pos+7)));
            pin_pos += 7;

            const trade_status = hextonum(trades.slice(pin_pos, (pin_pos+1)));
            pin_pos += 1;

            const total_ticket_price = hextofloat(trades.slice(pin_pos, (pin_pos+4)));
            pin_pos += 4;

            const ticket_count = hextonum(trades.slice(pin_pos, (pin_pos+2)));
            pin_pos += 2;

            const tickets = trades.slice(pin_pos, tradeslen);
            let posupdate;

            let ticketArr = [];
            
            if(ticket_count > 1){
                let loop_pos2 = 0;
                for(let i = 0; i < ticket_count; i++){
                    let pin_pos2 = loop_pos2;
                    const ticket_stub_no = hextonum(tickets.slice(pin_pos2, (pin_pos2+4)));
                    pin_pos2 += 4;

                    const boarding_time = bytetodate(tickets.slice(pin_pos2, (pin_pos2+7)));
                    pin_pos2 += 7;
    
                    const length_boarding_station = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const boarding_station = (tickets.slice(pin_pos2, (pin_pos2+length_boarding_station))).toString();
                    pin_pos2 += length_boarding_station;
    
                    const length_arrival_station = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const arrival_station = (tickets.slice(pin_pos2, (pin_pos2+length_arrival_station))).toString();
                    pin_pos2 += length_arrival_station;
    
                    const train_id = hextonum(tickets.slice(pin_pos2, (pin_pos2+4)));
                    pin_pos2 += 4;
    
                    const length_train_no = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const train_no = (tickets.slice(pin_pos2, (pin_pos2+length_train_no))).toString();
                    pin_pos2 += length_train_no;

                    const seat_nolen = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const seat_no = (tickets.slice(pin_pos2, (pin_pos2+seat_nolen))).toString();
                    pin_pos2 += seat_nolen;
                    const coach_no = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const seat_typelen = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const seat_type = (tickets.slice(pin_pos2, (pin_pos2+seat_typelen))).toString();
                    pin_pos2 += seat_typelen;
                    const berthlen = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const berth = (tickets.slice(pin_pos2, (pin_pos2+berthlen))).toString();
                    pin_pos2 += berthlen;
                    const ticket_typelen = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const ticket_type = (tickets.slice(pin_pos2, (pin_pos2+ticket_typelen))).toString();
                    pin_pos2 += ticket_typelen;
                    const ticket_price = hextofloat(tickets.slice(pin_pos2, (pin_pos2+4)));
                    pin_pos2 += 4;

                    const passenger_namelen = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const passenger_name = (tickets.slice(pin_pos2, (pin_pos2+passenger_namelen))).toString();
                    pin_pos2 += passenger_namelen;

                    const passenger_idlen = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const passenger_id = (tickets.slice(pin_pos2, (pin_pos2+passenger_idlen))).toString();
                    pin_pos2 += passenger_idlen;

                    const stub_status = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;

                    const print_status = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    


                    loop_pos2 = pin_pos2;

                    if(i === (ticket_count -1)){
                        posupdate = pin_pos2;
                    }

                    ticketArr.push({
                        ticket_stub_no: ticket_stub_no,
                        boarding_time: boarding_time,
                        boarding_station:boarding_station,
                        arrival_station: arrival_station,
                        train_id: train_id,
                        train_no: train_no,
                        seat_no: seat_no,
                        coach_no: coach_no,
                        seat_type: seat_type,
                        berth: berth,
                        ticket_type: ticket_type,
                        ticket_price: ticket_price,
                        passenger_name: passenger_name,
                        passenger_id: passenger_id,
                        stub_status: stub_status,
                        print_status: print_status
                    })

                }
            } else {
                let pin_pos2 = 0;
                    const ticket_stub_no = hextonum(tickets.slice(pin_pos2, (pin_pos2+4)));
                    pin_pos2 += 4;

                    const boarding_time = bytetodate(tickets.slice(pin_pos2, (pin_pos2+7)));
                    pin_pos2 += 7;
    
                    const length_boarding_station = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const boarding_station = (tickets.slice(pin_pos2, (pin_pos2+length_boarding_station))).toString();
                    pin_pos2 += length_boarding_station;
    
                    const length_arrival_station = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const arrival_station = (tickets.slice(pin_pos2, (pin_pos2+length_arrival_station))).toString();
                    pin_pos2 += length_arrival_station;
    
                    const train_id = hextonum(tickets.slice(pin_pos2, (pin_pos2+4)));
                    pin_pos2 += 4;
    
                    const length_train_no = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const train_no = (tickets.slice(pin_pos2, (pin_pos2+length_train_no))).toString();
                    pin_pos2 += length_train_no;

                    const seat_nolen = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const seat_no = (tickets.slice(pin_pos2, (pin_pos2+seat_nolen))).toString();
                    pin_pos2 += seat_nolen;
                    const coach_no = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const seat_typelen = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const seat_type = (tickets.slice(pin_pos2, (pin_pos2+seat_typelen))).toString();
                    pin_pos2 += seat_typelen;
                    const berthlen = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const berth = (tickets.slice(pin_pos2, (pin_pos2+berthlen))).toString();
                    pin_pos2 += berthlen;
                    const ticket_typelen = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const ticket_type = (tickets.slice(pin_pos2, (pin_pos2+ticket_typelen))).toString();
                    pin_pos2 += ticket_typelen;
                    const ticket_price = hextofloat(tickets.slice(pin_pos2, (pin_pos2+4)));
                    pin_pos2 += 4;

                    const passenger_namelen = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const passenger_name = (tickets.slice(pin_pos2, (pin_pos2+passenger_namelen))).toString();
                    pin_pos2 += passenger_namelen;

                    const passenger_idlen = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const passenger_id = (tickets.slice(pin_pos2, (pin_pos2+passenger_idlen))).toString();
                    pin_pos2 += passenger_idlen;

                    const stub_status = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;

                    const print_status = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    
                    posupdate = pin_pos2

                    ticketArr.push({
                        ticket_stub_no: ticket_stub_no,
                        boarding_time: boarding_time,
                        boarding_station:boarding_station,
                        arrival_station: arrival_station,
                        train_id: train_id,
                        train_no: train_no,
                        seat_no: seat_no,
                        coach_no: coach_no,
                        seat_type: seat_type,
                        berth: berth,
                        ticket_type: ticket_type,
                        ticket_price: ticket_price,
                        passenger_name: passenger_name,
                        passenger_id: passenger_id,
                        stub_status: stub_status,
                        print_status: print_status
                    })
            }

            loop_pos = (pin_pos + posupdate)
            tradeArr.push({
                trade_id: trade_id,
                trade_type: trade_type,
                trade_time: trade_time,
                trade_status: trade_status,
                total_ticket_price: total_ticket_price,
                tickets: ticketArr
            })


        }

    } else {

        let pin_pos = 0;
            const trade_id = hextonum(trades.slice(pin_pos, (pin_pos+4)));
            pin_pos += 4;

            const trade_type = hextonum(trades.slice(pin_pos, (pin_pos+1)));
            pin_pos += 1;
            
            const trade_time = bytetodate(trades.slice(pin_pos, (pin_pos+7)));
            pin_pos += 7;

            const trade_status = hextonum(trades.slice(pin_pos, (pin_pos+1)));
            pin_pos += 1;

            const total_ticket_price = hextofloat(trades.slice(pin_pos, (pin_pos+4)));
            pin_pos += 4;

            const ticket_count = hextonum(trades.slice(pin_pos, (pin_pos+2)));
            pin_pos += 2;

            const tickets = trades.slice(pin_pos, tradeslen);
            let posupdate;

            let ticketArr = [];
            
            if(ticket_count > 1){
                let loop_pos2 = 0;
                for(let i = 0; i < ticket_count; i++){
                    let pin_pos2 = loop_pos2;
                    const ticket_stub_no = hextonum(tickets.slice(pin_pos2, (pin_pos2+4)));
                    pin_pos2 += 4;

                    const boarding_time = bytetodate(tickets.slice(pin_pos2, (pin_pos2+7)));
                    pin_pos2 += 7;
    
                    const length_boarding_station = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const boarding_station = (tickets.slice(pin_pos2, (pin_pos2+length_boarding_station))).toString();
                    pin_pos2 += length_boarding_station;
    
                    const length_arrival_station = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const arrival_station = (tickets.slice(pin_pos2, (pin_pos2+length_arrival_station))).toString();
                    pin_pos2 += length_arrival_station;
    
                    const train_id = hextonum(tickets.slice(pin_pos2, (pin_pos2+4)));
                    pin_pos2 += 4;
    
                    const length_train_no = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const train_no = (tickets.slice(pin_pos2, (pin_pos2+length_train_no))).toString();
                    pin_pos2 += length_train_no;

                    const seat_nolen = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const seat_no = (tickets.slice(pin_pos2, (pin_pos2+seat_nolen))).toString();
                    pin_pos2 += seat_nolen;
                    const coach_no = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const seat_typelen = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const seat_type = (tickets.slice(pin_pos2, (pin_pos2+seat_typelen))).toString();
                    pin_pos2 += seat_typelen;
                    const berthlen = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const berth = (tickets.slice(pin_pos2, (pin_pos2+berthlen))).toString();
                    pin_pos2 += berthlen;
                    const ticket_typelen = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const ticket_type = (tickets.slice(pin_pos2, (pin_pos2+ticket_typelen))).toString();
                    pin_pos2 += ticket_typelen;
                    const ticket_price = hextofloat(tickets.slice(pin_pos2, (pin_pos2+4)));
                    pin_pos2 += 4;

                    const passenger_namelen = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const passenger_name = (tickets.slice(pin_pos2, (pin_pos2+passenger_namelen))).toString();
                    pin_pos2 += passenger_namelen;

                    const passenger_idlen = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const passenger_id = (tickets.slice(pin_pos2, (pin_pos2+passenger_idlen))).toString();
                    pin_pos2 += passenger_idlen;

                    const stub_status = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;

                    const print_status = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    


                    loop_pos2 = pin_pos2;

                    if(i === (ticket_count -1)){
                        posupdate = pin_pos2;
                    }

                    ticketArr.push({
                        ticket_stub_no: ticket_stub_no,
                        boarding_time: boarding_time,
                        boarding_station:boarding_station,
                        arrival_station: arrival_station,
                        train_id: train_id,
                        train_no: train_no,
                        seat_no: seat_no,
                        coach_no: coach_no,
                        seat_type: seat_type,
                        berth: berth,
                        ticket_type: ticket_type,
                        ticket_price: ticket_price,
                        passenger_name: passenger_name,
                        passenger_id: passenger_id,
                        stub_status: stub_status,
                        print_status: print_status
                    })

                }
            } else {
                let pin_pos2 = 0;
                    const ticket_stub_no = hextonum(tickets.slice(pin_pos2, (pin_pos2+4)));
                    pin_pos2 += 4;

                    const boarding_time = bytetodate(tickets.slice(pin_pos2, (pin_pos2+7)));
                    pin_pos2 += 7;
    
                    const length_boarding_station = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const boarding_station = (tickets.slice(pin_pos2, (pin_pos2+length_boarding_station))).toString();
                    pin_pos2 += length_boarding_station;
    
                    const length_arrival_station = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const arrival_station = (tickets.slice(pin_pos2, (pin_pos2+length_arrival_station))).toString();
                    pin_pos2 += length_arrival_station;
    
                    const train_id = hextonum(tickets.slice(pin_pos2, (pin_pos2+4)));
                    pin_pos2 += 4;
    
                    const length_train_no = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const train_no = (tickets.slice(pin_pos2, (pin_pos2+length_train_no))).toString();
                    pin_pos2 += length_train_no;

                    const seat_nolen = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const seat_no = (tickets.slice(pin_pos2, (pin_pos2+seat_nolen))).toString();
                    pin_pos2 += seat_nolen;
                    const coach_no = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const seat_typelen = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const seat_type = (tickets.slice(pin_pos2, (pin_pos2+seat_typelen))).toString();
                    pin_pos2 += seat_typelen;
                    const berthlen = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const berth = (tickets.slice(pin_pos2, (pin_pos2+berthlen))).toString();
                    pin_pos2 += berthlen;
                    const ticket_typelen = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const ticket_type = (tickets.slice(pin_pos2, (pin_pos2+ticket_typelen))).toString();
                    pin_pos2 += ticket_typelen;
                    const ticket_price = hextofloat(tickets.slice(pin_pos2, (pin_pos2+4)));
                    pin_pos2 += 4;

                    const passenger_namelen = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const passenger_name = (tickets.slice(pin_pos2, (pin_pos2+passenger_namelen))).toString();
                    pin_pos2 += passenger_namelen;

                    const passenger_idlen = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    const passenger_id = (tickets.slice(pin_pos2, (pin_pos2+passenger_idlen))).toString();
                    pin_pos2 += passenger_idlen;

                    const stub_status = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;

                    const print_status = hextonum(tickets.slice(pin_pos2, (pin_pos2+1)));
                    pin_pos2 += 1;
                    
                    posupdate = pin_pos2

                    ticketArr.push({
                        ticket_stub_no: ticket_stub_no,
                        boarding_time: boarding_time,
                        boarding_station:boarding_station,
                        arrival_station: arrival_station,
                        train_id: train_id,
                        train_no: train_no,
                        seat_no: seat_no,
                        coach_no: coach_no,
                        seat_type: seat_type,
                        berth: berth,
                        ticket_type: ticket_type,
                        ticket_price: ticket_price,
                        passenger_name: passenger_name,
                        passenger_id: passenger_id,
                        stub_status: stub_status,
                        print_status: print_status
                    })
            }

            tradeArr.push({
                trade_id: trade_id,
                trade_type: trade_type,
                trade_time: trade_time,
                trade_status: trade_status,
                total_ticket_price: total_ticket_price,
                tickets: ticketArr
            })

    }

    return tradeArr 

}