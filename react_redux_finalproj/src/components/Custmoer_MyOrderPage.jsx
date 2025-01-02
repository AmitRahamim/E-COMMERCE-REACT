import * as React from 'react';
import { useSelector } from 'react-redux';
import DynamicTable from './DynamicTable.jsx';

function MyOrderPageCopm() {
  const users = useSelector((state) => state.users);
  const releventuser = users.find(x => x.username === sessionStorage.username)

  const ProductsBColumns = [
    { title: 'Title', key: 'product' },
    { title: 'QTY', key: 'Qty' },
    { title: 'Total', key: 'total' },
    { title: 'Date', key: 'date' },
  ];

  const fiexarray = releventuser.productsB.map(prod => {
    const obj = {
      total: +(prod.Qty) * +(prod.price),
      ...prod
    };
    return obj;
  });

  return (
    <>
      <div
        style={{
          backgroundColor: '#d3d3d3',
          height: 'fit-content',
          display: 'flex',
          justifyContent: 'center',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ width: '80%', maxWidth: '1200px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
            Product with Employees Table
          </h2>
          <div className="custom-table-container">
            <div className="styled-table">
              <DynamicTable
                columns={ProductsBColumns}
                data={fiexarray}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyOrderPageCopm;
