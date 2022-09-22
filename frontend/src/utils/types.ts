export interface Contact {
    contactId: string;
    name: string;
    phone: string;
}

export interface ContactRequest {
    contactId?: string;
    name: string;
    phone: string;
}