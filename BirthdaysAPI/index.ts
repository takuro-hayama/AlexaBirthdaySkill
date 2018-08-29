import { Context } from 'aws-lambda';

import birthdays from './resources/birthdays.json';

declare interface BirthdaysRequestEvent {
    id?: number;
    name?: string;
    birthday?: string;
}

let handler = async (event: BirthdaysRequestEvent, context: Context) => {
    const id = event.id;
    const name = event.name;
    const birthday = event.birthday;

    console.log(name)

    if (!id && !name && !birthday) {
        context.fail('Bad Request');
        return;
    }

    let birthdayObj = null;
    console.log(id)
    if (id) {
        birthdayObj = birthdays.find(birth => {
            return birth.id === id;
        });
    }
    console.log(name)
    if (name) {
        birthdayObj = birthdays.find(birthday => {
            return birthday.name === name;
        });
    }
    console.log(birthday)
    if (birthday) {
        birthdayObj = birthdays.find(day => {
            return day.birthday === birthday;
        });
    }

    console.log(birthdayObj)

    if (!birthdayObj) {
        
        // context.fail('Not Found Error');

        const errorString : string | Error = name as string | Error;
        context.fail(errorString);

        return;
    }
    return birthdayObj;
};

exports.handler = handler;