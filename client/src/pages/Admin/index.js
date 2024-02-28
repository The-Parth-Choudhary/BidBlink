import React from 'react';
import { Tabs } from 'antd';

function Admin() {
    return (
        <div>
            <Tabs>
                <Tabs.TabPane tab='Products' key='1'>
                    <h1>Products</h1>
                </Tabs.TabPane>
                <Tabs.TabPane tab='Users' key='2'>
                    <h1>Users</h1>
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}

export default Admin