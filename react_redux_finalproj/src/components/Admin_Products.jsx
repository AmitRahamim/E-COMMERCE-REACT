import * as React from 'react';
import Stack from '@mui/material/Stack';
import { useSelector,useDispatch } from 'react-redux';
import AdminProductComp from './Admin_Product';
import Button from '@mui/material/Button'; 
import { memo } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

function AdminProductsComp() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: '#f0f0f0',
      ...theme.typography.body2,
      padding: theme.spacing(3),
      color: theme.palette.text.secondary,
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',  // Soft shadow for the card
      borderRadius: '8px',  // Rounded corners
      marginBottom: '30px',  // Space between product cards
      display: 'flex',
      flexDirection: 'row', // Makes sure the content inside is in row format
      gap: '20px', // Space between left and right sections
    }));

    const AddProductEmpty = () => {
        const NewProduct = {
            title :'',
            price : '',
            linktoimg: '',
            category:'',
            description:'',
            boughtB:[]
          };
      
          dispatch({
            type: 'ADD_PRODUCT_EMPTY',
            payload: NewProduct
          });
    }

  return (
    <>
    <div
      style={{
        backgroundColor: '#d3d3d3',
        height: 'fit-content',
        width: '100%',
        padding: '20px',
      }}
    > 
      <Stack spacing={1}>
          {products && products.length > 0 ? (
            products.map((prod, index) => (
              <Item>
              <AdminProductComp key={index} product={prod} />
              </Item>
            ))
          ) : (
            <p>No prudcts available</p> // Fallback message if no categories
          )}
        </Stack>
        <br />
        <Button variant="contained" onClick={AddProductEmpty}  style={{ marginTop: '20px' }}>
            ADD New
          </Button>
    </div>
    </>
  );
}

export default memo(AdminProductsComp);
