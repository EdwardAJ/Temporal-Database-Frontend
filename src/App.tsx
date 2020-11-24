import React, { ChangeEvent, useState } from 'react';
import logo from './logo.svg';
import { Jumbotron, Container, Button, Row, Col, FormGroup, Label, Input, Table } from 'reactstrap';
import Select, { ValueType, ActionMeta } from 'react-select'
import './App.css';

const queryOptions = [
  { label: 'A before B', value: 'before', num: 0 },
  { label: 'A overlaps B', value: 'overlaps', num: 1 },
  { label: 'A contains B', value: 'contains', num: 2 },
  { label: 'A starts B', value: 'starts', num: 3 },
  { label: 'A finished-by B', value: 'finishedby', num: 4 },
  { label: 'A meets B', value: 'meets', num: 5 },
  { label: 'A equal B', value: 'equal', num: 6 },
  { label: 'A after B', value: 'after', num: 7 },
  { label: 'A overlapped-by B', value: 'overlappedby', num: 8 },
  { label: 'A during B', value: 'during', num: 9 },
  { label: 'A started-by B', value: 'startedby', num: 10 },
  { label: 'A finishes B', value: 'finishes', num: 11 },
  { label: 'A met-by B', value: 'metby', num: 12 },
  { label: 'Most Checking Day', value: 'mostcheckin', num: 13 },
  { label: 'Most Cancel Day', value: 'mostcancel', num: 14 },
  { label: 'Checkin Per Day', value: 'checkinperday', num: 15 },
  { label: 'Projection', value: 'projection', num: 16 },
  { label: 'Selection', value: 'checkinperday', num: 17 },
  { label: 'Union', value: 'checkinperday', num: 18 },
  { label: 'Temporal Difference', value: 'checkinperday', num: 19 },
  { label: 'Temporal Join', value: 'checkinperday', num: 20 },
  { label: 'Transaction-Timeslice', value: 'checkinperday', num: 21 },
  { label: 'Insert', value: 'checkinperday', num: 22 },
  { label: 'ts_update', value: 'checkinperday', num: 23 },
  { label: 'Delete', value: 'checkinperday', num: 24 },
  { label: 'Modify', value: 'checkinperday', num: 25 },
];

type QueryType = {
  label: string,
  value: string,
  num: number
};


type TableItem = {
  id: number,
  type: string,
  adults: number,
  children: number, 
  babies: number,
  checkingDate: Date,
  checkoutDate: Date,
  isCanceled: Boolean
};

const App: React.FC = () => {
  const [ queryNum, setQueryNum ] = useState(0);

  const tableItems: TableItem[] = [
    { id: 1, type: "Resort Hotel", adults: 2, children: 0, babies: 0, checkingDate: new Date("2015-07-02"), checkoutDate: new Date("2015-07-07"), isCanceled: Boolean(1) },
    { id: 2, type: "Resort Hotel", adults: 2, children: 0, babies: 0, checkingDate: new Date("2015-07-02"), checkoutDate: new Date("2015-07-07"), isCanceled: Boolean(1) },
    { id: 3, type: "Resort Hotel", adults: 2, children: 0, babies: 0, checkingDate: new Date("2015-07-02"), checkoutDate: new Date("2015-07-07"), isCanceled: Boolean(1) },
  ];

  const renderTableItem = (item: TableItem, index: number) => {
    return (
      <tr>
        <th scope="row">{item.id}</th>
        <td>{item.type}</td>
        <td>{item.adults}</td>
        <td>{item.children}</td>
        <td>{item.babies}</td>
        <td>{item.checkingDate.toLocaleDateString()}</td>
        <td>{item.checkoutDate.toLocaleDateString()}</td>
        <td>{(item.isCanceled) ? 1 : 0}</td>
      </tr>
    );
  };

  return (
    <div className="App" style={{backgroundColor: '#282c34', height: "100vh"}}>
      <Jumbotron style={{textAlign: "center"}}>
        <h1 className="display-4">Temporal Database Assignment</h1>
      </Jumbotron>
      <Container>
        <Row>
          <Col md="3">
            <Select
              options={queryOptions}
              placeholder="Select Query"
              onChange={(e: ValueType<QueryType> | null | undefined) => {
                if (!e) {
                  e = { label: 'A before B', value: 'before', num: 0 };
                }
                const {label, value, num} = e as QueryType;
                setQueryNum(num);
              }}
            />
            <ChangableForm query={queryNum}/>
            <Button color="danger" className="mt-1">Execute Query</Button>
          </Col>
          <Col md="9">
            <Table dark>
              <thead>
                <tr>
                  <th>ID B</th>
                  <th>Hotel Type</th>
                  <th>Adults</th>
                  <th>Children</th>
                  <th>Babies</th>
                  <th>Checkin Date</th>
                  <th>Checkout Date</th>
                  <th>Is Canceled</th>
                </tr>
              </thead>
              <tbody>
                {tableItems.map(renderTableItem)}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const ChangableForm = ({query}: any) => {
  if (query >= 0 && query <= 12) {  // allen 13
    return (
      <FormGroup className="mt-2">
        <Label className="text-white" for="inputId" style={{marginBottom: "0"}}>ID A:</Label>
        <Input type="text" name="input_id" id="inputId" placeholder="Input ID A" />
      </FormGroup>
    );
  } else if (query === 13 || query === 14) {  // most checking day or most cancel day
    return null;
  } else if (query === 15) {  // checkin per day
    return (
      <FormGroup className="mt-2">
        <Label className="text-white" for="dateSlider" style={{marginBottom: "0"}}>Date Slider:</Label>
        <Input className="custom-range" type="range" name="input_data_slider" id="dateSlider" placeholder="Select Date" />
      </FormGroup>
    );
  } else {  // query num 16-25
    return null;
  }
}

export default App;
