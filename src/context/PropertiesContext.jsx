"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const PropertiesContext = createContext(null);

export function PropertiesProvider({ children }) {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Only fetch if not already loaded
        if (properties.length > 0) {
            setLoading(false);
            return;
        }

        const fetchProperties = async () => {
            try {
                const response = await fetch('/api/properties', {
                    cache: 'force-cache'
                });
                const data = await response.json();
                if (data.properties) {
                    setProperties(data.properties);
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching properties:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    const getPropertyById = (id) => {
        return properties.find(p => p.id === parseInt(id));
    };

    return (
        <PropertiesContext.Provider value={{ properties, loading, error, getPropertyById }}>
            {children}
        </PropertiesContext.Provider>
    );
}

export function useProperties() {
    const context = useContext(PropertiesContext);
    if (!context) {
        throw new Error('useProperties must be used within a PropertiesProvider');
    }
    return context;
}
