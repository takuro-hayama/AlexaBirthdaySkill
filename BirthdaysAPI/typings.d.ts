declare module '*/birthdays.json' {

    interface Birthday {
        id: number;
        name: string;
        birthday: string;
    }

    const value: Array<Birthday>;
    export = value;
}
