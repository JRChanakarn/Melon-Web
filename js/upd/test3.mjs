import {schedule} from 'node-cron'




schedule('33 * * * *', () => {
    console.log('running every minute 1, 2, 4 and 5');
});

