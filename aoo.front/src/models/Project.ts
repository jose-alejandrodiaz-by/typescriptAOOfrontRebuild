export type Project = {
    id?: number;
    project_name: string;
    project_code: string;
    project_type_id: number;
    platform_id: number;
    region_id: number;
    modules: any[];
    environments: any[];
    created_by_name?: string;
    created_on?: string;
    platform_value?: string;
    project_type_value?: string;

};
