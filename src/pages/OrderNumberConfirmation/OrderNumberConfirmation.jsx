import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Typography,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function OrderNumberConfirmation(props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const listOrders = [];
  [1, 2, 3, 4].forEach((i) => {
    const productDescription = state[`Product Description ${i}`];
    if (productDescription) {
      listOrders.push(`${state['Quantity P1']} X ${productDescription}`);
    }
  });

  return (
    <Card>
      <CardHeader title='Confirm your order'></CardHeader>
      <CardContent>
        <Typography variant='subtitle2'>Your order:</Typography>
        {listOrders.map((order, i) => (
          <Typography variant='subtitle1' key={i}>
            {order}
          </Typography>
        ))}
      </CardContent>
      <CardContent style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant='outlined'
          color='success'
          onClick={() => {
            navigate('/date_order_confirmation', { state });
          }}
        >
          BOOK DELIVERY SLOT
        </Button>
      </CardContent>
    </Card>
  );
}

export default OrderNumberConfirmation;
