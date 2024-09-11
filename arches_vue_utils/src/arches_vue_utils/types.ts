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
    languageCode: string;
    valuetype: "prefLabel" | "altLabel" | "hiddenLabel";
}

export interface Labellable {
    labels: Label[];
}
