import {usePagination} from 'ahooks';
import {Pagination} from 'antd';
import {faker} from '@faker-js/faker';
import React from 'react';

interface UserListItem {
    id: string;
    name: string;
    email: string;
    disabled: boolean;
}

const userList = (current: number, pageSize: number) => ({
    total: 55,
    list: new Array(pageSize).fill(1).map(it => ({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        disabled: faker.datatype.boolean(),
    }))
})


async function getUserList(params: {
    current: number;
    pageSize: number;
}): Promise<{ total: number; list: UserListItem[] }> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(userList(params.current, params.pageSize));
        }, 1000);
    });
}

export function Hello() {
    const {data, loading, pagination} = usePagination(getUserList);

    return (
        <div>
            {loading ? (
                <p>loading</p>
            ) : (
                <ul>
                    {data?.list?.map((item) => (
                        <li key={item.email}>
                            {item.name} - {item.email}
                        </li>
                    ))}
                </ul>
            )}
            <Pagination
                current={pagination.current}
                pageSize={pagination.pageSize}
                total={data?.total}
                onChange={pagination.onChange}
                onShowSizeChange={pagination.onChange}
                showQuickJumper
                showSizeChanger
                style={{marginTop: 16, textAlign: 'right'}}
            />
        </div>
    );
};