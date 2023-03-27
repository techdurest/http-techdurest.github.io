import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

function OrderConfirmation() {
  const { state } = useLocation();
  console.log(state['premium'])

  if (state['premium'] == 'Y'){
    return (
        <Card>
          <CardHeader title='Your Premium Delivery Date has been confirmed!' />
          <CardContent variant='outlined'>
            <Typography sx={{ mb: 2 }} variant='body1'>
            Premium Paid Dedicated Day Delivery is all booked in - Thank You!

            </Typography>
            <Typography sx={{ mb: 2 }} variant='body1'>
            This will be delivered at your convenience on <b>{state.date}</b>
            </Typography>
            <Typography sx={{ mb: 2 }} variant='body1'>
            Thank you for choosing BedLink
            </Typography>
          </CardContent>
        </Card>
      );
    }
  return (
    <Card>
      <CardHeader title='Your delivery date confirmed' />
      <CardContent variant='outlined'>
        <Typography sx={{ mb: 2 }} variant='body1'>
          Thank you for confirming your delivery date.
        </Typography>
        <Typography variant='body1'>
          Your order will be delivered on this date: <b>{state.date}</b>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default OrderConfirmation;
