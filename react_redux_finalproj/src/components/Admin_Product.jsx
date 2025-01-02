import * as React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DynamicTable from './DynamicTable.jsx';
import Button from '@mui/material/Button'; 
import { useState, useEffect,memo } from 'react';

function AdminProductComp({ product }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(false);

  

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
      setImg(product.linktoimg);
      setCategory(product.category);
      setDescription(product.description);
    }
  }, [product]);

  

  const saveChanges = () => {
    if (!title || !price || !img || !category || !description) {
      setError(true); 
      alert('All fields must be filled out.');
      return;
    }
    const updatedProduct = {
      id: product.id,
      title:title,
      price:price,
      linktoimg: img,
      category:category,
      description:description,
    };

    dispatch({
      type: 'UPDATE_PRODUCT',
      payload: updatedProduct
    });

    setError(false);
  };

  const ProductsBColumns = [
    { title: 'Name', key: 'name' },
    { title: 'QTY', key: 'Qty' },
    { title: 'Date', key: 'date' },
  ];

  return (
    <>
      
        <div style={{ flex: '1' }}>
          <h4 style={{ fontWeight: 'bold', color: 'black' }}>Title:</h4>
          <TextField
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            size="small"
            error={error && !title}
            helperText={error && !title ? 'Title is required' : ''}
            fullWidth
            style={{ marginBottom: '20px',backgroundColor: 'white' }}  // Space between fields
          />

          <h4 style={{ fontWeight: 'bold', color: 'black' }}>Category:</h4>
          <FormControl fullWidth style={{ marginBottom: '20px',backgroundColor: 'white' }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories?.map((cat) => {
                return <MenuItem key={cat} value={cat}>{cat}</MenuItem>;
              })}
            </Select>
          </FormControl>

          <h4 style={{ fontWeight: 'bold', color: 'black' }}>Description:</h4>
          <TextField
            required
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            fullWidth
            helperText={error && !description ? 'descriptiom is required' : ''}
            style={{ marginBottom: '20px',backgroundColor: 'white' }}
          />
          <Button  onClick={saveChanges} style={{ marginTop: '20px',backgroundColor: 'green', color: '#fff'}}>
            Save Changes
          </Button>
        </div>

        <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
          <h4 style={{ fontWeight: 'bold', color: 'black' }}>Price:</h4>
          
          <TextField
            required
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
            size="small"
            error={error && !price}
            helperText={error && !price ? 'Price is required' : ''}
            fullWidth
            style={{ marginBottom: '20px',backgroundColor: 'white' }}
          />

          <h4 style={{ fontWeight: 'bold', color: 'black' }}>Link to Image:</h4>
          <TextField
            required
            value={img}
            onChange={(e) => setImg(e.target.value)}
            size="small"
            error={error && !img}
            helperText={error && !img ? 'Image URL is required' : ''}
            fullWidth
            style={{ marginBottom: '20px',backgroundColor: 'white' }}
          />

          <h4 style={{ fontWeight: 'bold', color: 'black' }}>Bought By:</h4>
          <DynamicTable
            columns={ProductsBColumns}
            data={product.boughtB}
          />
        </div>
      
    </>
  );
}

export default AdminProductComp;
