export type BasicData = {
    platforms: { id: number; platform_name: string }[];
    modules: { id: number; module_name: string }[];
    environments: { id: number; environment_name: string }[];
    projectTypes: { id: number; type_name: string }[];
    issues: { id: number; issue_name: string }[];
};