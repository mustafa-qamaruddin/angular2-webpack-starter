/**
 * @author Mustafa Qamar-ud-Din <m.qamaruddin@mQuBits.com>
 */
export class User {

    constructor(
        public id: number,
        public email: string,
        public mobile: string,
        public password: string,
        public premiseId: number,
        public age: number,
        public gender: string,
        public name: string,
    ) { }
}

export const genders = ['Male', 'Female'];
