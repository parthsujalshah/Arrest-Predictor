import React from 'react';
import 'antd/dist/antd.css';
import { Form, Button, Select } from 'antd';
import axios from "axios";
import { apiUrl, apiGetColNames } from './constants';

const { Option } = Select;

function App() {

  const [communityAreaField, setCommunityAreaField] = React.useState([]);
  const [dayField, setDayField] = React.useState([]);
  const [domesticField, setDomesticField] = React.useState([]);
  const [monthField, setMonthField] = React.useState([]);
  const [primaryTypeField, setPrimaryTypeField] = React.useState([]);

  const dayMap = {
    "0": "MONDAY",
    "1": "TUESDAY",
    "2": "WEDNESDAY",
    "3": "THURSDAY",
    "4": "FRIDAY",
    "5": "SATURDAY",
    "6": "SUNDAY"
  };
  const dayReverseMap = {
    "MONDAY": "0",
    "TUESDAY": "1",
    "WEDNESDAY": "2",
    "THURSDAY": "3",
    "FRIDAY": "4",
    "SATURDAY": "5",
    "SUNDAY": "6",
  };
  const monthMap = {
    "1": "JANUARY",
    "2": "FEBRUARY",
    "3": "MARCH",
    "4": "APRIL",
    "5": "MAY",
    "6": "JUNE",
    "7": "JULY",
    "8": "AUGUST",
    "9": "SEPTEMBER",
    "10": "OCTOBER",
    "11": "NOVEMBER",
    "12": "DECEMBER",
  };
  const monthReverseMap = {
    "JANUARY": "1",
    "FEBRUARY": "2",
    "MARCH": "3",
    "APRIL": "4",
    "MAY": "5",
    "JUNE": "6",
    "JULY": "7",
    "AUGUST": "8",
    "SEPTEMBER": "9",
    "OCTOBER": "10",
    "NOVEMBER": "11",
    "DECEMBER": "12",
  };

  React.useEffect(() => {
    const getSetColValues = async () => {
      const res1 = await axios.get(`${apiUrl}/${apiGetColNames}`);
      setCommunityAreaField(res1.data['community_area'])
      setDayField(res1.data['day'])
      setDomesticField(res1.data['domestic'])
      setMonthField(res1.data['month'])
      setPrimaryTypeField(res1.data['primary_type'])
    }
    getSetColValues();
  }, []);
  return (
    <Form>
      <Form.Item
        name="community_area"
        label="Community Area"
        rules={[
          {
            required: true,
            message: 'Please select the community area',
          },
        ]}
      >
        <Select showSearch>
          {communityAreaField.map(val =>
            <Option value={val}>{val}</Option>
          )}
        </Select>
      </Form.Item>
      <Form.Item
        label="Day of the week"
        name="day"
        rules={[
          {
            required: true,
            message: 'Please select the day'
          },
        ]}
      >
        <Select showSearch>
          {dayField.map(val =>
            <Option value={dayMap[val]}>{dayMap[val]}</Option>
          )}
        </Select>
      </Form.Item>
      <Form.Item
        label="Month"
        name="month"
        rules={[
          {
            required: true,
            message: 'Please select the month'
          },
        ]}
      >
        <Select showSearch>
          {monthField.map(val =>
            <Option value={monthMap[val]}>{monthMap[val]}</Option>
          )}
        </Select>
      </Form.Item>
      <Form.Item
        label="Wether the crime will be domestic or not"
        name="domestic"
        rules={[
          {
            required: true,
            message: 'Please select wether the crime is domestic or not'
          },
        ]}
      >
        <Select showSearch>
          {domesticField.map(val =>
            <Option value={val}>{val}</Option>
          )}
        </Select>
      </Form.Item>
      <Form.Item
        label="Type of the crime"
        name="primary_type"
        rules={[
          {
            required: true,
            message: 'Please select the type of the crime'
          },
        ]}
      >
        <Select showSearch>
          {primaryTypeField.map(val =>
            <Option value={val}>{val}</Option>
          )}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default App;
