import React, { Component } from 'react';
// import axios from 'axios';
import $ from 'jquery';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  ResponsiveContainer,
} from 'recharts';

import Sidebar from './Sidebar';
import Topbar from './Topbar';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const dataP = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

export default class Traffic extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
    };
  }

  authenticateUser() {
    const token = localStorage.getItem('token');
    if (token === null) {
      this.setState({
        authenticated: false
      })
    } else {
      $.ajax({
        type: 'GET',
        url: '/api/article',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .done(this.setState({ authenticated: true }))
        .fail(function(error) {
          console.log('An error occurred:', error);
        });
    }
  }

  componentWillMount() {
    this.authenticateUser();
  }
  render() {
    if (this.state.authenticated === true) {
      return (
        <div className="cpanel">
          <Topbar />
          <Sidebar />
          <div className="cpanel__main">
            <div className="cpanel__main__monthly">
              <h3 className="cpanel__main__title">Monthly Traffic</h3>
              <ResponsiveContainer width="100%" aspect={2}>
                <LineChart
                  data={data}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="cpanel__main__minor">
              <div className="cpanel__main__daily">
                <h3 className="cpanel__main__title">Daily Traffic</h3>
                <ResponsiveContainer width="100%" aspect={2}>
                  <BarChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" fill="#8884d8" />
                    <Bar dataKey="uv" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="cpanel__main__mobile">
                <h3 className="cpanel__main__title">Mobile Traffic</h3>
                <ResponsiveContainer width="100%" aspect={2}>
                  <PieChart>
                    <Pie data={dataP} fill="#8884d8" label dataKey="value" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="unauth">
          <h1>You are not authorized to view this page</h1>
        </div>
      );
    }
  }
}
