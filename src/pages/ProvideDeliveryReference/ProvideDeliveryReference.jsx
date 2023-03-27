import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import { getOrderByDeliveryReference } from '../../API';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function ProvideDeliveryReference(props) {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState('');
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateIsEmpty = (v) => {
    if (!v) {
      setErrorText('Field cannot be empty');
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    setErrorText('');
  };

  const onSubmit = () => {
    if (validateIsEmpty(value)) {
      setIsLoading(true);
      getOrderByDeliveryReference(value.trim())
        .then((result) => {
          if (result) {
            console.log(result['DeliveryLock'])
            if (result['DeliveryLock']) {
              const sd = new Date(result['Customer Confirmed Delivery Date']);
              const df = sd.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
              const email = 'hello@bedlink.co.uk';
              if(result['PremiumDelivery'] == true){
                setErrorText(`Amazing news, your Premium Paid Delivery has already been booked in for ${df}. You do not need to do anything else at this stage. If you want this date changed, please email ${email} and the team can update this for you.`);
              }
              else{
                setErrorText(`Great news, your delivery has already been booked in for ${df}. You do not need to do anything else at this stage. If you want this date changed, please email ${email} and the team can update this for you.`);
              }
            }
            
            // else if (result['available_delivery_dates'] == null || Object.values(result['available_delivery_dates']).every(val => !val)) {
            //   setErrorText("We're sorry, but there are no delivery schedules available for your location at this time. Please try again later, or contact our customer care team for further assistance.");
            // }
            else{
              navigate('/order_number_confirmation', {
                state: result,
              });
            }
            
          } else {
            setErrorText('Your reference number does not belong to our system, please can you check your order and delivery reference and try again. Thank you.');
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <Card>
      <CardHeader title='Provide delivery reference' />
      <CardContent sx={{pt:1}}>
        <Typography sx={{ mb: 2 }}>
          Please enter your delivery reference to book your delivery slot:
        </Typography>
        <TextField
          error={!!errorText}
          helperText={errorText}
          fullWidth
          variant='outlined'
          color='success'
          size='small'
          value={value}
          onChange={(v) => handleChange(v)}
        />
      </CardContent>
      <CardContent style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <LoadingButton
          loading={isLoading}
          variant='outlined'
          color='success'
          onClick={onSubmit}
        >
          Continue
        </LoadingButton>
      </CardContent>
    </Card>
  );
}

export default ProvideDeliveryReference;
