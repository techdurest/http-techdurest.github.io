import { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { getDayAvailabilityForPostcode, updateDayDelivery } from '../../API';
import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';


function DateOrderConfirmation() {
  const [value, setValue] = useState('');
  const [deliveryAvailability, setDeliveryAvailability] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    getDayAvailabilityForPostcode(state['Postcode']).then(
      (availabilities) => {
        console.log(availabilities)
        setDeliveryAvailability(availabilities);
      }
    );
  }, [state]);

  const onSubmitDay = () => {
    setIsLoading(true);    
    const chosenDay = value.format('DD/MM/YY');
    updateDayDelivery(state['Unique Ref'], chosenDay, 'N')
      .then(() => {
        navigate('/order_confirmation', { state: { date: chosenDay , premium: 'N' } });
      })
      .finally(() => setIsLoading(false));
  };

  const isDeliveryDayAvailable = (date) => {
    return !deliveryAvailability[date.format('DD/MM/YY')];
  };

  return (
    <>
      <Card>
        <CardHeader title='Confirm Your Standard Delivery Date' />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker
            PaperProps={{
              sx: {
                '& .MuiPickersDay-root': {
                  '&.Mui-selected': {
                    backgroundColor: 'red',
                  },
                },
              },
            }}
            orientation='landscape'
            openTo='day'
            value={value}
            shouldDisableDate={isDeliveryDayAvailable}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            showToolbar={false}
            renderInput={(params) => <TextField {...params} />}
            components={{
              ActionBar: () => null,
            }}
          />
        </LocalizationProvider>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> 
            <Button
                variant='contained'
                color='primary'
                sx={{ bgcolor: '#2596be', color: 'white' }}
                onClick={() => navigate('/premium_date_order_confirmation', { state })}
              >
              Can't see an ideal date? Book a Premium Paid Dedicated Delivery
              </Button>
              <LoadingButton
                loading={isLoading}
                variant='outlined'
                color='success'
                onClick={onSubmitDay}
                disabled={!value}
              >
                Confirm Slot
              </LoadingButton>
            </Box>
        </CardContent>
      </Card>
    </>
  );
}

export default DateOrderConfirmation;

