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
            navigate('/order_number_confirmation', {
              state: result,
            });
          } else {
            setErrorText('Delivery Reference does not exist');
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
