import { heart } from './tcp';
import cron from 'node-cron';

export const heartcron = cron.schedule('*/2 * * * *', () => {
    heart()
}, {
    scheduled: false
});