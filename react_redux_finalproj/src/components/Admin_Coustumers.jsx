import * as React from 'react';
import { useSelector } from 'react-redux';
import DynamicTable from './DynamicTable.jsx';
import './AdminCostumersComp.css'; // Import the CSS file for styling

function AdminCostumersComp() {
  const users = useSelector((state) => state.users);

  const ProductsBColumns = [
    { title: 'Product', key: 'product' },
    { title: 'QTY', key: 'Qty' },
    { title: 'Date', key: 'date' },
  ];

  const productWithProdcutsBoughtColumns = [
    { title: 'Fullname', key: 'firstname' },
    { title: 'Joined At', key: 'registrationDate' },
    { title: 'Products Bought', key: 'productsB', nestedColumns: ProductsBColumns },
  ];

  const productWithUsersData = users;

  return (
    <>
      <div
        style={{
          backgroundColor: '#d3d3d3',
          height: 'fit-content', 
          display: 'flex',
          justifyContent: 'center', // Center horizontally
          
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ width: '80%', maxWidth: '1200px' }}>
          <h1 style={{ textAlign: 'center'}}>Customers</h1>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
            Product with Employees Table
          </h2>

          
          <div className="custom-table-container">
            <DynamicTable
              columns={productWithProdcutsBoughtColumns}
              data={productWithUsersData}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminCostumersComp;
