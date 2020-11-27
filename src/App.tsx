import React, { FormEvent, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Jumbotron, Container, Button, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import Select, { ValueType } from 'react-select'
import { AxiosResponse } from 'axios'
import {customAxios} from './utils/axios.utils'

import './App.css';

const queryOptions: QueryType[] = [
  { label: 'A before B', value: 'before', endpoint: '/before', num: 0 },
  { label: 'A overlaps B', value: 'overlaps', endpoint: '/overlaps', num: 1 },
  { label: 'A contains B', value: 'contains', endpoint: '/contains', num: 2 },
  { label: 'A starts B', value: 'starts', endpoint: '/start', num: 3 },
  { label: 'A finished-by B', value: 'finishedby', endpoint: '/finished-by', num: 4 },
  { label: 'A meets B', value: 'meets', endpoint: '/meets', num: 5 },
  { label: 'A equal B', value: 'equals', endpoint: '/equals', num: 6 },
  { label: 'A after B', value: 'after', endpoint: '/after', num: 7 },
  { label: 'A overlapped-by B', value: 'overlappedby', endpoint: '/overlapped-by', num: 8 },
  { label: 'A during B', value: 'during', endpoint: '/during', num: 9 },
  { label: 'A started-by B', value: 'startedby', endpoint: '/started-by', num: 10 },
  { label: 'A finishes B', value: 'finish', endpoint: '/finish', num: 11 },
  { label: 'A met-by B', value: 'metby', endpoint: '/met-by', num: 12 },
  // { label: 'Projection', value: 'projection', num: 13 },
  // { label: 'Selection', value: 'checkinperday', num: 14 },
  // { label: 'Union', value: 'checkinperday', num: 15 },
  // { label: 'Temporal Difference', value: 'checkinperday', num: 16 },
  // { label: 'Temporal Join', value: 'checkinperday', num: 17 },
  // { label: 'Valid-TimeSlice', value: 'checkinperday', num: 18 },
  // { label: 'Insert', value: 'checkinperday', num: 19 },
  // { label: 'Delete', value: 'checkinperday', num: 20 },
  // { label: 'Modify', value: 'checkinperday', num: 21 },
];

type QueryType = {
  label: string,
  value: string,
  endpoint: string,
  num: number
};

type QueryValue = number | string;

type TableItem = VisitorTable;

type VisitorTable = {
  id: number,
  hotel: string,
  adults: number,
  children: number,
  babies: number,
  checkin_date: string,
  checkout_date: string
};

type Column = {
  id: string,
  name: string,
  selector: string
}

const visitorColumns: Column[] = [
  {
    id: 'id',
    name: 'ID A',
    selector: 'id'
  },
  {
    id: 'name',
    name: 'Name',
    selector: 'name'
  },
  {
    id: 'hotel',
    name: 'Hotel',
    selector: 'hotel'
  },
  {
    id: 'adults',
    name: 'Adults',
    selector: 'adults'
  },
  {
    id: 'children',
    name: 'Children',
    selector: 'children'
  },
  {
    id: 'babies',
    name: 'Babies',
    selector: 'babies'
  },
  {
    id: 'checkin_date',
    name: 'Check In Date',
    selector: 'checkin_date'
  },
  {
    id: 'checkout_date',
    name: 'Check Out Date',
    selector: 'checkout_date'
  }
];

const App: React.FC = () => {
  const [ queryNum, setQueryNum ] = useState<number>(0);
  const [ queryValue, setQueryValue ] = useState<QueryValue>(0);
  const [ tableItems, setTableItems ] = useState<TableItem[]>([]);
  const [ tableColumns, setTableColumns] = useState<Column[]>([]);

  const changeQueryValue = (value: string): void => {
    setQueryValue(value);
  }

  const handleSuccessResponse = (response: AxiosResponse<TableItem[]>, columns: Column[]) => {
    setTableItems(response.data);
    setTableColumns(columns);
  }

  async function sendAllenQueryRequest (endpoint: string): Promise<AxiosResponse<TableItem[]> | void> {
    return await customAxios.get<TableItem[]>(`${endpoint}?id=${queryValue}`)
                .catch((error) => { alert (error.message); console.error(error); })
  }

  const executeAllenQuery = async (endpoint: string) => {
    const response = await sendAllenQueryRequest(endpoint) as AxiosResponse<TableItem[]>;
    if (response) {
      handleSuccessResponse(response, visitorColumns);
    }
  }

  const executeQuery = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { endpoint } = queryOptions[queryNum];
    // Allen queries handling
    if (queryNum >= 0 && queryNum <= 13) {
      await executeAllenQuery(endpoint);
    } else {

    }
  }

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
                  e = { label: 'A before B', endpoint: '/before', value: 'before', num: 0 };
                }
                const { num } = e as QueryType;
                setQueryNum(num);
              }}
            />
            <ChangableForm 
              query={queryNum ? queryNum : 0}
              onChangeCallback={changeQueryValue}
            />
            <Button
              onClick={(e: FormEvent<HTMLButtonElement>) => executeQuery(e)}
              color="danger"
              className="mt-1"
            >
              Execute Query
            </Button>
          </Col>
          <Col md="9">
            <DataTable
              title="Result"
              columns={tableColumns}
              data={tableItems}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const ChangableForm = ({query, onChangeCallback}: any) => {
  if (query >= 0 && query <= 12) {  // allen 13
    return (
      <FormGroup className="mt-2">
        <Label className="text-white" for="inputId" style={{marginBottom: "0"}}>ID B:</Label>
        <Input
          onChange={(e) => onChangeCallback(e.target.value)}
          type="text"
          name="input_id"
          id="inputId"
          placeholder="Input ID B"
        />
      </FormGroup>
    );
  }
  if (query >= 13 && query <= 21) {
    return null;
  }
  return null;
}

export default App;
