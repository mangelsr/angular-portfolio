import { Person } from './person.interface';

export interface InfoPage {
    title?: string;
    email?: string;
    short_name?: string;
    author_page?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    tumblr?: string;
    team?: Person[];
}
