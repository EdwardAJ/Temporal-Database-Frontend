import React, { FormEvent, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Jumbotron, Container, Button, Row, Col, FormGroup, Label, Input, Spinner } from 'reactstrap';
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
  { label: 'Projection', value: 'projection', endpoint: '/project', num: 13 },
  { label: 'Selection', value: 'selection', endpoint: '/select', num: 14 },
  { label: 'Union', value: 'union', endpoint: '/union', num: 15 },
  { label: 'Temporal Difference', value: 'temporaldifference', endpoint: '/tempdiff', num: 16 },
  { label: 'Temporal Join', value: 'temporaljoin', endpoint: '/tempjoin', num: 17 },
  { label: 'Valid-TimeSlice', value: 'validtimeslice', endpoint: '/valid-timeslice', num: 18 },
  { label: 'Insert', value: 'insert', endpoint: '/insert', num: 19 },
  { label: 'Delete', value: 'delete', endpoint: '/delete', num: 20 },
  { label: 'Modify', value: 'modify', endpoint: '/modify', num: 21 },
];

type QueryType = {
  label: string,
  value: string,
  endpoint: string,
  num: number
};

type QueryValue = string;

type TableItem = VisitorTable;

type VisitorBody = {
  id ?: number,
  name: string,
  hotel: string,
  adults: number,
  children: number,
  babies: number,
  checkin_date: string,
  checkout_date: string
}
type VisitorTable = VisitorBody;

type ResponseMessage = {
  message: string
}

type Column = {
  id: string,
  name: string,
  selector: string
}

const App: React.FC = () => {
  const [ queryNum, setQueryNum ] = useState<number>(0);
  const [ queryValue, setQueryValue ] = useState<QueryValue>('');
  const [ tableItems, setTableItems ] = useState<TableItem[]>([]);
  const [ tableColumns, setTableColumns] = useState<Column[]>([]);
  const [ isLoading, setIsLoading] = useState<boolean>(false);

  const requestNeedsParam = (queryNum: number) => {
    return (queryNum >= 0 && queryNum <= 12) || (queryNum === 14) || (queryNum >= 18 && queryNum <= 21);
  }

  const getFormTitle = (queryNum: number) => {
    if (queryNum >= 0 && queryNum <= 12) {
      return 'ID B';
    }
    if (queryNum === 14 || queryNum === 20) {
      return 'ID';
    }
    if (queryNum === 18) {
      return 'Time';
    }
    if (queryNum === 19 || queryNum === 21) {
      return 'Request Body'
    }
  }

  const getRequestParam = (queryNum: number) => {
    if ((queryNum >= 0 && queryNum <= 12) || (queryNum === 14) || (queryNum === 20)) {
      return 'id';
    }
    if (queryNum === 18) {
      return 'time';
    }
  }

  const getTableColumns = (firstData: TableItem) => {
    let columns: Column[] = [];
    Object.keys(firstData).forEach((key) => {
      columns.push({
        id: key,
        name: key,
        selector: key
      })
    })
    return columns;
  }

  const changeQueryValue = (value: string): void => {
    setQueryValue(value);
  }

  // Get request handling
  async function sendQueryGetRequest (endpoint: string): Promise<AxiosResponse<TableItem[]> | void> {
    setIsLoading(true);
    let requestEndpoint = endpoint;
    if (requestNeedsParam(queryNum)) {
      requestEndpoint = `${endpoint}?${getRequestParam(queryNum)}=${queryValue}`;
    }
    return await customAxios.get<TableItem[]>(requestEndpoint)
                .catch((error) => { alert (error.message); console.error(error); })
                .finally(() => setIsLoading(false))
  }

  const handleGetRequest = async (endpoint: string) => {
    const response = await sendQueryGetRequest(endpoint) as AxiosResponse<TableItem[]>;
    if (!response) {
      setTableItems([]);
      return;
    }
    setTableItems(response.data);
    if (response.data.length === 0) {
      setTableColumns([]);
      return;
    }
    setTableColumns(getTableColumns(response.data[0]));
  }

  // Post request handling
  async function sendQueryPostRequest (endpoint: string, body: VisitorBody): Promise<AxiosResponse<ResponseMessage> | void> {
    setIsLoading(true);
    return await customAxios.post<ResponseMessage>(endpoint, body)
                .catch((error) => { alert (error.message); console.error(error); })
                .finally(() => setIsLoading(false))
  }

  const handlePostRequest = async (endpoint: string, body: VisitorBody) => {
    const response = await sendQueryPostRequest(endpoint, body) as AxiosResponse<ResponseMessage>;
    if (response) {
      alert(response.data.message);
    }
    setTableItems([]);
    setTableColumns([]);
  }

  // Delete request handling
  async function sendQueryDeleteRequest (endpoint: string): Promise<AxiosResponse<ResponseMessage> | void> {
    setIsLoading(true);
    const requestEndpoint = `${endpoint}?${getRequestParam(queryNum)}=${queryValue}`
    return await customAxios.delete<ResponseMessage>(requestEndpoint)
                .catch((error) => { alert (error.message); console.error(error); })
                .finally(() => setIsLoading(false))
  }

  const handleDeleteRequest = async (endpoint: string) => {
    const response = await sendQueryDeleteRequest(endpoint) as AxiosResponse<ResponseMessage>;
    if (response) {
      alert(response.data.message);
    }
    setTableItems([]);
    setTableColumns([]);
  }

  const executeQuery = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { endpoint } = queryOptions[queryNum];

    if (queryNum >= 0 && queryNum <= 18) {
      handleGetRequest(endpoint);
    } else if (queryNum === 19 || queryNum === 21) {
      handlePostRequest(endpoint, JSON.parse(queryValue));
    } else if (queryNum === 20) {
      handleDeleteRequest(endpoint);
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
            {
              requestNeedsParam(queryNum) && (
                <ChangableForm 
                  title={getFormTitle(queryNum)}
                  onChangeCallback={changeQueryValue}
                />
              )
            }
            <Button
              onClick={(e: FormEvent<HTMLButtonElement>) => executeQuery(e)}
              color="danger"
              disabled={isLoading}
              className="mt-1"
            >
              Execute Query
              { isLoading && (
                <Spinner
                  style={{ width: "0.8rem", height: "0.8rem", marginLeft: "10px" }}
                  type="grow"
                  color="light"
                />
              )}
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

const ChangableForm = ({ title, onChangeCallback }: any) => {
  return (
    <FormGroup className="mt-2">
      <Label className="text-white" for="inputId" style={{marginBottom: "0"}}>
        { title }
      </Label>
      <Input
        onChange={(e) => onChangeCallback(e.target.value)}
        type="text"
        name="input_id"
        id="inputId"
        placeholder={`Input ${title}`}
      />
    </FormGroup>
  );
}

export default App;
