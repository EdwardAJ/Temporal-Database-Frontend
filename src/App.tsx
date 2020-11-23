import React from 'react';
import logo from './logo.svg';
import { Jumbotron, Container, Button, Row, Col, FormGroup, Label, Input, Table } from 'reactstrap';
import Select from 'react-select'
import './App.css';

const queryOptions = [
  { label: 'A before B', value: 'before' },
  { label: 'A overlaps B', value: 'overlaps' },
  { label: 'A contains B', value: 'contains' },
  { label: 'A starts B', value: 'starts' },
  { label: 'A finished-by B', value: 'finishedby' },
  { label: 'A meets B', value: 'meets' },
  { label: 'A equal B', value: 'equal' },
  { label: 'A after B', value: 'after' },
  { label: 'A overlapped-by B', value: 'overlappedby' },
  { label: 'A during B', value: 'during' },
  { label: 'A started-by B', value: 'startedby' },
  { label: 'A finishes B', value: 'finishes' },
  { label: 'A met-by B', value: 'metby' },
  { label: 'Most Checking Day', value: 'mostcheckin' },
  { label: 'Most Cancle Day', value: 'mostcancel' },
  { label: 'Checkin Per Day', value: 'checkinperday' },
];

function App() {
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
              // onChange={selectedOption => {
              //   let value = selectedOption!.value;
              //   console.log(value);
              // }}
            />
            <FormGroup className="mt-2">
              <Label className="text-white" for="inputId" style={{marginBottom: "0"}}>ID A:</Label>
              <Input type="text" name="input_id" id="inputId" placeholder="Input ID A" />
            </FormGroup>
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
                <tr>
                  <th scope="row">1</th>
                  <td>Resort Hotel</td>
                  <td>2</td>
                  <td>0</td>
                  <td>0</td>
                  <td>2015-07-02</td>
                  <td>2015-07-07</td>
                  <td>1</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Resort Hotel</td>
                  <td>2</td>
                  <td>0</td>
                  <td>0</td>
                  <td>2015-07-02</td>
                  <td>2015-07-07</td>
                  <td>1</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Resort Hotel</td>
                  <td>2</td>
                  <td>0</td>
                  <td>0</td>
                  <td>2015-07-02</td>
                  <td>2015-07-07</td>
                  <td>1</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
