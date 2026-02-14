"use client"
import { createContext, useContext, useState } from "react";

const ScanContext = createContext(null);

export const ScanProvider = ({ children }) => {
    const [scanResult, setScanResult] = useState(null);

    return (
        <ScanContext value={{ scanResult, setScanResult }}>
            {children}
        </ScanContext>
    );
};

export const useScanData = () => useContext(ScanContext);
