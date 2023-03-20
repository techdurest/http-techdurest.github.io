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


function DateOrderConfirmation() {
  const [value, setValue] = useState('');
  const [deliveryAvailability, setDeliveryAvailability] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    getDayAvailabilityForPostcode(state['POSTCODE PARSED']).then(
      (availabilities) => {
        setDeliveryAvailability(availabilities);
      }
    );
  }, [state]);

  const onSubmitDay = () => {
    setIsLoading(true);
    const chosenDay = value.format('DD/MM/YY');
    updateDayDelivery(state['UNIQUE DELVIERY REFERENCE'], chosenDay)
      .then(() => {
        navigate('/order_confirmation', { state: { date: chosenDay } });
      })
      .finally(() => setIsLoading(false));
  };

  const isDeliveryDayAvailable = (date) => {
    return !deliveryAvailability[date.format('DD/MM/YY')];
  };

  return (
    <>
      <Card>
        <CardHeader title='Confirm delivery date' />
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
        <CardContent style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <LoadingButton
            loading={isLoading}
            variant='outlined'
            color='success'
            onClick={onSubmitDay}
            disabled={!value}
          >
            Confirm Slot
          </LoadingButton>
        </CardContent>
      </Card>
    </>
  );
}

export default DateOrderConfirmation;
