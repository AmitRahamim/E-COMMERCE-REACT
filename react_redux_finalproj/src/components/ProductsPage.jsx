import React, { useState,memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CssBaseline } from '@mui/material';
import { Slider, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function ProductsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate hook

  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);
  const users = useSelector((state) => state.users);
  const currentUser = users.find(user => user.username === sessionStorage.username);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [cart, setCart] = useState([]);
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterPrice, setFilterPrice] = useState([0, 500]);
  const [filterTitle, setFilterTitle] = useState('');
  const [quantities, setQuantities] = useState({});
  const [cartVisible, setCartVisible] = useState(false); // Cart visibility toggle state

  const handleFilter = () => {
    let filtered = products;
    if (filterCategory !== 'All') {
      filtered = filtered.filter(product => product.category === filterCategory);
    }
    filtered = filtered.filter(product => product.price >= filterPrice[0] && product.price <= filterPrice[1]);
    if (filterTitle) {
      filtered = filtered.filter(product => product.title.toLowerCase().includes(filterTitle.toLowerCase()));
    }
    setFilteredProducts(filtered);
  };

  const addToCart = (product, qty) => {
    if (qty > 0 && qty <= product.inStock) {
      const cartItem = cart.find(item => item.id === product.id);
      if (cartItem) {
        const newQty = cartItem.qty + qty;
        if (newQty <= product.inStock) {
          cartItem.qty = newQty;
          cartItem.total = cartItem.qty * cartItem.price;
          setCart([...cart]);
        } else {
          alert('Cannot add more than available stock');
        }
      } else {
        setCart([...cart, { ...product, qty, total: product.price * qty }]);
      }
    } else {
      alert('Invalid quantity');
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, newQty) => {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
      if (newQty <= cartItem.inStock && newQty > 0) {
        cartItem.qty = newQty;
        cartItem.total = cartItem.qty * cartItem.price;
        setCart([...cart]);
      } else if (newQty > cartItem.inStock) {
        alert('Cannot exceed available stock');
      } else {
        removeFromCart(productId);
      }
    }
  };

  const getTotalPrice = () => cart.reduce((total, item) => total + item.total, 0);

  const OrderCart = () => {
    if (cart.length > 0) {
      const updatedProductsB = [...currentUser.productsB];
      cart.forEach(item => {
        updatedProductsB.push({
          product: item.title,
          Qty: item.qty,
          date: new Date().toLocaleDateString(),
          price: item.price
        });

        const product = products.find(product => product.id === item.id);
        if (product) {
          const existingBuyers = product.boughtB || [];
          existingBuyers.push({
            name: currentUser.firstname,
            Qty: item.qty,
            date: new Date().toLocaleDateString(),
            price: item.price,
          });

          const updatedProduct = {
            ...product,
            boughtB: existingBuyers,
            inStock: product.inStock - item.qty // Reduce the stock based on the purchased quantity
          };

          dispatch({
            type: 'UPDATE_PRODUCT',
            payload: updatedProduct // Pass only the updated product
          });
        }
      });

      dispatch({
        type: 'UpdateUser',
        payload: { ...currentUser, productsB: updatedProductsB }
      });

      setCart([]);
      sessionStorage.clear(); // Log the user out after the order
      alert('Order placed successfully!');
      navigate('/'); // Redirect to login page after placing the order
    } else {
      alert('Your cart is empty!');
    }
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px', backgroundColor: '#f0f0f0' }}>
        
        {/* Cart Section (Left Side - 40% width) */}
        <Box sx={{
          width: '40%',
          backgroundColor: '#d3f8e2',
          padding: '20px',
          marginRight: '20px',
          display: cartVisible ? 'block' : 'none',
          transition: 'transform 0.5s ease', // Smooth transition for sliding
          transform: cartVisible ? 'translateX(0)' : 'translateX(-100%)', // Move the cart in and out
          position: 'relative', // Set the position relative for the arrow button
        }}>
          <h3>Cart</h3>
          {cart.map((item) => (
            <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <p>{item.title} - {item.qty} units</p>
              <p>${item.total}</p>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button onClick={() => updateCartQuantity(item.id, item.qty - 1)}>-</Button>
                <TextField
                  type="number"
                  value={item.qty}
                  onChange={(e) => updateCartQuantity(item.id, parseInt(e.target.value))}
                  style={{ width: '60px', marginTop: '10px', marginLeft: '10px', marginRight: '10px' }}
                />
                <Button onClick={() => updateCartQuantity(item.id, item.qty + 1)}>+</Button>
                <Button sx={{ color: 'red' }} onClick={() => removeFromCart(item.id)}>X</Button>
              </Box>
            </Box>
          ))}
          <h3>Total: ${getTotalPrice()}</h3>
          <Button onClick={OrderCart} variant="contained" sx={{ width: '100%', backgroundColor: '#28a745' }}>
            Order
          </Button>
        </Box>

        {/* Cart Toggle Button (Arrow Button) */}
        <Button
          sx={{
            position: 'absolute',  // Absolute position to place it at the edge of the cart
            top: '50%',            // Center vertically
            left: cartVisible ? '100%' : '0',   // Place at the edge when the cart is open, and reset to the left when closed
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#007bff',
            color: '#fff',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            '&:hover': { backgroundColor: '#0056b3' },
            transition: 'left 0.5s ease',  // Smooth transition when toggling
          }}
          onClick={() => setCartVisible(!cartVisible)}
        >
          {cartVisible ? <ArrowBackIcon sx={{ fontSize: '24px' }} /> : <ArrowForwardIcon sx={{ fontSize: '24px' }} />}
        </Button>

        {/* Filter Section and Products Catalog (Right Side - 60% width) */}
        <Box sx={{ width: '60%' }}>
          <h2>Filter Products</h2>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            {/* Category Filter */}
            <FormControl sx={{ width: '30%' }}>
              <InputLabel>Category</InputLabel>
              <Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <MenuItem value="All">All</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Title Search */}
            <TextField
              label="Search Title"
              value={filterTitle}
              onChange={(e) => setFilterTitle(e.target.value)}
              fullWidth
              sx={{ width: '30%' }}
            />

            {/* Price Filter */}
            <Slider
              value={filterPrice}
              onChange={(e, newValue) => setFilterPrice(newValue)}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `$${value}`}
              min={0}
              max={1000}
              sx={{ width: '30%' }}
            />
          </Box>
          
          <Button variant="contained" onClick={handleFilter} sx={{ marginBottom: '20px', backgroundColor: '#007bff' }}>
            Apply Filters
          </Button>

          {/* Products Catalog */}
          <h2>Products Catalog</h2>
          {filteredProducts.map((product) => {
            const totalBought = product.boughtB.reduce((acc, buyer) => acc + +buyer.Qty, 0);

            return (
              <Box key={product.id} sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#fff',
                padding: '15px',
                marginBottom: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
              }}>
                <Box sx={{ width: '40%', padding: '10px' }}>
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                  <p>In Stock: {product.inStock}</p>
                  <p>Bought: {totalBought}</p>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button onClick={() => addToCart(product, 1)}>+</Button>
                  </Box>
                </Box>

                <Box sx={{ width: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={product.linktoimg} alt={product.title} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                </Box>

                <Box sx={{ width: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <p>Bought: {totalBought}</p>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
}

export default memo(ProductsPage);
