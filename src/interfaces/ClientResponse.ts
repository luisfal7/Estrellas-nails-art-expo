export interface ClientResponse {
    id:      string;
    email:   string;
    fecha:   string;
    hour:    string;
    name:    string;
    precio:  number;
    service: Service[];
}

export interface Service {
    id:      string;
    precio:  string;
    service: string;
}
