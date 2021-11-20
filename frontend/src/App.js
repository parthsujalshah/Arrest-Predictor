import React from 'react';
import 'antd/dist/antd.css';
import { Form, Button, Select, Card, Affix, PageHeader, Modal, Spin, Image } from 'antd';
import axios from "axios";
import { apiUrl, apiGetColNames } from './constants';
import Lottie from 'react-lottie';
import * as animationArrested from './lottiefiles/arrested.json';
import * as animationNotArrested from './lottiefiles/not-arrested.json';
import Background from './assets/images/community_areas.png';

const { Option } = Select;

function App() {

  const [communityAreaField, setCommunityAreaField] = React.useState([]);
  const [dayField, setDayField] = React.useState([]);
  const [domesticField, setDomesticField] = React.useState([]);
  const [monthField, setMonthField] = React.useState([]);
  const [primaryTypeField, setPrimaryTypeField] = React.useState([]);
  const [arrested, setArrested] = React.useState(false);
  const [modalLoading, setModalLoading] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isStopped, setIsStopped] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [communityAreaSelected, setCommunityAreaSelected] = React.useState('');

  const defaultArrested = {
    loop: true,
    autoplay: true,
    animationData: animationArrested.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const defaultNotArrested = {
    loop: true,
    autoplay: true,
    animationData: animationNotArrested.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

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
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  return (
    <div>
      <Modal title="" visible={isModalVisible} onOk={() => {
        setIsModalVisible(false);
      }} onCancel={() => {
        setIsModalVisible(false);
      }}>
        {
          modalLoading ?
            <Spin size="large" />
            :
            <div>
              {
                arrested ?
                  <div>
                    <Lottie height={"400"} width={"400"} options={defaultArrested} isStopped={isStopped} isPaused={isPaused} />
                    <h2>High chances criminals will be arrested</h2>
                  </div>
                  :
                  <div>
                    <Lottie height={"400"} width={"400"} options={defaultNotArrested} isStopped={isStopped} isPaused={isPaused} />
                    <h2>ALERT: Low chances criminals will be arrested</h2>
                  </div>
              }
            </div>
        }
      </Modal>
      <Affix>
        <Card style={{ backgroundColor: "#e6fffb" }}>
          <PageHeader
            // className="site-page-header"
            // onBack={() => null}
            title="Criminal Arrest Predictor"
            subTitle="An assistant to help find out the strength of police force needed to be deployed on a particular Community Area on the basis of chances of arrest of the criminals"
          />
        </Card>
      </Affix>
      <div style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        marginTop: "10vh"
      }}>
        <Card style={{
          backgroundColor: "#f0f0f0",
          width: "80vh",
        }}>
          <Form
            {...layout}
            onFinish={async val => {
              const modelInputData = {
                'community_area': val['community_area'],
                'day': dayReverseMap[val['day']],
                'month': monthReverseMap[val['month']],
                'domestic': val['domestic'],
                'primary_type': val['primary_type'],
              };
              setModalLoading(true);
              setIsModalVisible(true);
              const res = await axios.post(apiUrl, modelInputData);
              setArrested(res.data.arrested);
              setModalLoading(false);
            }}
            onFinishFailed={err => console.log(err)}
          >
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
              label="Domestic Crime"
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
              <div style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
        <div style={{ marginLeft: 20 }} />
        <Image
          preview={false}
          src={Background}
        />
      </div>
    </div>
  );
}

export default App;
