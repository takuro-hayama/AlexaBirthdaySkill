declare module '*/birthdays.json' {

    interface BirthdayInfo {
        id: number;
        name: string;
        birthday: string;
    }

    const value: Array<BirthdayInfo>;
    export = value;
}
