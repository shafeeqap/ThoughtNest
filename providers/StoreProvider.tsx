'use client';

import { type AppStore, store } from "@/redux/store";
import React, { useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore | null>(null)
    if (!storeRef.current) {
        storeRef.current = store
    }

    return <Provider store={storeRef.current!}>{children}</Provider>
}