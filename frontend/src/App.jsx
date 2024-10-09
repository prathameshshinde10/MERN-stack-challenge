import './App.css';
import React, { useState } from 'react';
import { Layout, Menu, Select, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Transactions from './components/Transactions';
import Stats from './components/Stats';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';


const { Header, Content} = Layout;

const navItems = [
  {
    key: 1,
    label: <NavLink to="/" activeClassName="active">Transactions</NavLink>
  },
  {
    key: 2,
    label: <NavLink to="/stats" activeClassName="active">Stats</NavLink>
  }
];

const options = [
  "All Months",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const App = () => {
  const [month, setMonth] = useState(3);
  const [isDrawerVisible, setDrawerVisible] = useState(false);

  const handleMonthChange = (value) => {
    setMonth(parseInt(value));
  };

  const toggleDrawer = () => {
    setDrawerVisible(!isDrawerVisible);
  };

  return (
    <BrowserRouter>
      <Layout>
        <Header className="app-header">
          <div className="logo">Dashboard</div>

          <Button
            className="menu-toggle"
            type="primary"
            icon={<MenuOutlined />}
            onClick={toggleDrawer}
          />
          <Drawer
            title="Navigation"
            placement="right"
            closable={true}
            onClose={toggleDrawer}
            visible={isDrawerVisible}
            
          >
            <Menu
              mode="vertical"
              defaultSelectedKeys={["1"]}
              items={navItems}
              onClick={toggleDrawer}
            />
          </Drawer>

          <Menu
            theme="dark"
            mode='horizontal'
            defaultSelectedKeys={["1"]}
            className="nav-menu"
            items={navItems}
            
          />

          <Select
            size="large"
            defaultValue={options[month]}
            onChange={handleMonthChange}
            className="month-selector"
            options={options.map((text, i) => ({
              value: i,
              label: text
            }))}
          />
        </Header>

        <Content className="app-content">
          <Routes>
            <Route path="/" element={<Transactions month={month} monthText={options[month]} />} />
            <Route path="/stats" element={<Stats month={month} monthText={options[month]} />} />
          </Routes>
        </Content>

      </Layout>
    </BrowserRouter>
  );
};

export default App;
