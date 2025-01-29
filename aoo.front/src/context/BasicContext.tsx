import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { getBasicEnvironments, getBasicIssues, getBasicModules, getBasicPlatforms, getBasicProjectTypes } from '../services/BasicSerivces';
import { useAuth } from './AuthContext';
import { BasicData } from '../models/BasicData';

interface BasicContextProps {
    getBasicData: () => BasicData | null;
}

export const BasicContext = createContext<BasicContextProps | undefined>(undefined);

interface BasicDataProviderProps {
    children: ReactNode;
}

export default function BasicDataProvider({ children }: BasicDataProviderProps) {
    const [data, setData] = useState<BasicData>({
        platforms: [],
        modules: [],
        environments: [],
        projectTypes: [],
        issues: []
    });
    const { user } = useAuth();

    const getBasicData = (): BasicData | null => {
        return JSON.parse(localStorage.getItem('basicData') || 'null');
    }

    let isData = localStorage.getItem('basicData') ? true : false;

    useEffect(() => {
        if (user && !isData) {
            console.log(isData);

            const fetchData = async () => {
                try {
                    const resPlatforms = await getBasicPlatforms();
                    const resModules = await getBasicModules();
                    const resEnvs = await getBasicEnvironments();
                    const resProjTypes = await getBasicProjectTypes();
                    const resIssues = await getBasicIssues();

                    setData({
                        platforms: resPlatforms.data,
                        modules: resModules.data,
                        environments: resEnvs.data,
                        projectTypes: resProjTypes.data,
                        issues: resIssues.data,
                    });
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }
    }, [user, isData]);

    useEffect(() => {
        if (data.platforms.length || data.modules.length || data.environments.length || data.projectTypes.length || data.issues.length) {
            localStorage.setItem('basicData', JSON.stringify(data));
            console.log("Data saved to local storage:", data);
        }
    }, [data]);

    return (
        <BasicContext.Provider value={{ getBasicData }}>
            {children}
        </BasicContext.Provider>
    );
}

export function useBasic() {
    const context = useContext(BasicContext);
    if (!context) {
        throw new Error('useBasic must be used within a BasicDataProvider');
    }
    return context;
}
