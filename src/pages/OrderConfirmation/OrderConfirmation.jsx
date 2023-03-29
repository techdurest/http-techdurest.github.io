import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import successSvg from './success.svg';
import Box from '@mui/material/Box';

function OrderConfirmation() {
  const { state } = useLocation();
  console.log(state['premium'])

  if (state['premium'] == 'Y'){
    return (
      <Box textAlign="center" marginTop={2}>
        <ReactSVG src={successSvg} />
          <Card>
            <CardHeader title='Your Premium Delivery Date has been confirmed!' />
            <CardContent variant='outlined'>
              <Typography sx={{ mb: 2 }} variant='body1'>
              Premium Paid Dedicated Day Delivery is all booked in - Thank You!

              </Typography>
              <Typography sx={{ mb: 2, fontWeight: 'bold', color: 'blue' }} variant='body1'>
              This will be delivered at your convenience on <b>{state.date}</b>
              </Typography>
              <Typography sx={{ mb: 2 }} variant='body1'>
              Thank you for choosing BedLink
              </Typography>
            </CardContent>
          </Card>
          </Box>
      );
    }
  return (
    <Box textAlign="center" marginTop={2}>
        <ReactSVG src={successSvg} />
        <Card>
          <CardHeader title='Your delivery date confirmed' />
          <CardContent variant='outlined'>
            <Typography sx={{ mb: 2 , fontWeight: 'bold', color: 'blue' }} variant='body1'>
              Thank you for confirming your delivery date.
            </Typography>
            <Typography variant='body1'>
              Your order will be delivered on this date: <b>{state.date}</b>
            </Typography>
          </CardContent>
        </Card>
    </Box>
  );
}

export default OrderConfirmation;
