"use client"
import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { MetroSpinner, PushSpinner } from 'react-spinners-kit';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

// const rows = [
//   createData(
//     0,
//     '2222',
//     '12:30',
//     'Small',
//     '300',
//     312.44,
//   ),
//   createData(
//     0,
//     '2222',
//     '12:30',
//     'Small',
//     '300',
//     312.44,
//   ), createData(
//     0,
//     '2222',
//     '12:30',
//     'Small',
//     '300',
//     312.44,
//   ), createData(
//     0,
//     '2222',
//     '12:30',
//     'Small',
//     '300',
//     312.44,
//   ),
// ];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getAllData();
  }, []);

  const getAllData = () => {
    setLoading(true);
    fetch('/api/getdata')
      .then((res) => res.json())
      .then((data) => {
        setItems(data.users);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }
  return (
    <React.Fragment>
      <Title>Data</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>TIME</TableCell>
            <TableCell>SIZE</TableCell>
            <TableCell>COUNT</TableCell>
            <TableCell align="right">SUM</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <div className="spinner-container">
              <MetroSpinner size={30} color="#1976d2" loading={loading} />
            </div>
          ) : (
            <>
              {items.map((row, key) => (
                <TableRow key={key}>
                  <TableCell>{key + 1}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  <TableCell>{row.size}</TableCell>
                  <TableCell>{row.count}</TableCell>
                  <TableCell align="right">{row.sum}</TableCell>
                </TableRow>
              ))}
            </>
          )
          }

        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </React.Fragment >
  );
}