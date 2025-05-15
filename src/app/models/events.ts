export interface Events {
    kind: string;
    etag: string;
    summary: string;
    description?: string;
    updated: string;
    timeZone: string;
    accessRole: string;
    defaultReminders?: {
        method: string;
        minutes: number;
    }[];
    items: {
        kind: string;
        etag: string;
        id: string;
        status: string;
        htmlLink: string;
        created: string;
        updated: string;
        summary?: string;
        description?: string;
        location?: string;
        creator: {
            email: string;
            displayName?: string;
            self?: boolean;
        };
        organizer: {
            email: string;
            displayName?: string;
            self?: boolean;
        };
        start: {
            dateTime?: string;
            date?: string;
            timeZone?: string;
        };
        end: {
            dateTime?: string;
            date?: string;
            timeZone?: string;
        };
    }[];
    };
    


