import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Table, Input, message, Image } from 'antd';
import axios from 'axios';
import './Transactions.css';  // Import the CSS file

const { Search } = Input;
const columns = [
    {
        title: "#",
        dataIndex: "id",
        width: "40px",
    },
    {
        title: "Title",
        dataIndex: "title",
        width: "200px",
    },
    {
        title: "Price",
        dataIndex: "price",
        render: (price) => parseFloat(price).toFixed(2),
        width: "80px",
        className: 'price-column'
    },
    {
        title: "Description",
        dataIndex: "description",
        className: 'description-column'
    },
    {
        title: "Category",
        dataIndex: "category",
        width: "120px"
    },
    {
        title: "Sold",
        dataIndex: "sold",
        render: (sold) => sold ? "Yes" : "No",
        width: "50px",
        className: 'sold-column'
    },
    {
        title: "Date",
        dataIndex: "dateOfSale",
        render: (date) => moment(date).format("DD MMM YYYY"),
        width: "100px",
        className: 'date-column'
    },
    {
        title: "Image",
        dataIndex: "image",
        render: (url) => <Image src={url} alt="Product Image" className="product-image" />,
        width: "80px",
        className: 'image-column'
    }
];

function Transactions({ month, monthText }) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10
        }
    });

    const getData = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`https://mern-stack-task-j2pc.onrender.com/transactions`, {
                params: {
                    month,
                    page: tableParams.pagination.current,
                    limit: tableParams.pagination.pageSize,
                    search: tableParams.search
                }
            });

            setData(data.transactions);
            setLoading(false);
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: data.totalCount,
                }
            });
            message.success('Data loaded successfully');
        } catch (error) {
            console.log(error);
            message.error('Error loading data');
        }
    };

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            ...tableParams,
            pagination
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    const handleSearch = (value) => {
        setTableParams({
            ...tableParams,
            search: value
        });
    }

    useEffect(() => {
        getData();
    }, [JSON.stringify(tableParams), month]);

    return (
        <div className="transactions-container">
            <Search
                placeholder="Search"
                allowClear
                onSearch={handleSearch}
                className="search-bar"
            />

            <Table
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={data}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
                size='small'
                bordered
                title={() => <strong>Transactions for {monthText}</strong>}
                className="transaction-table"
                scroll={{ y: 540 }}
            />
        </div>
    )
}

export default Transactions;
