import ContactsAPI from "./httpClient";
import { Contact, ContactRequest } from "./types";

class ContactsApiAccesor {
    static url: string;
    static api: ContactsAPI;
    static token: string;
    constructor() {
        if (!ContactsApiAccesor.api) {
            ContactsApiAccesor.build();
        }
    }

    static async build() {
        if (!ContactsApiAccesor.api) {
            ContactsApiAccesor.api = new ContactsAPI();
        }
    }

    static createContact = async (body: ContactRequest) => this.api._create(`contacts`, body);
    static getContact = async (contactId: string) => this.api._get('contacts', contactId);
    static listContacts = async () => this.api._list('contacts', {}) as Promise<Contact[]>;
    static updateContact = async (contactId: string, body: ContactRequest) => this.api._create('contacts', body);
    static deleteContact = async (contactId: string) => this.api._delete('contacts', contactId);

}

export default ContactsApiAccesor