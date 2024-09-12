export interface Language {
    code: string;
    default_direction: "ltr" | "rtl";
    id: number;
    isdefault: boolean;
    name: string;
    scope: string;
}

export interface Label {
    value: string;
    language_id: string;
    valuetype_id: string;
}

export interface HasLabels {
    labels: Label[];
}

export interface HasValues {
    values: Label[];
}

export type Labellable = HasLabels | HasValues;
