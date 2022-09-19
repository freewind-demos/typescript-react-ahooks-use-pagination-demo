import type {FC} from "react";
import React from "react";
import {useHello} from "./useHello";
import {useCachedHello} from "./useCachedHello";

export const Component1: FC = React.memo((props) => {
    const hello = useHello();
    const cachedHello = useCachedHello();
    return <div>Component 1:
        <ul>
            <li>useHello: {hello.data}</li>
            <li>useCachedHello: {cachedHello.data}</li>
        </ul>
    </div>
})
