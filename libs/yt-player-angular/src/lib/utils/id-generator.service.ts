import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class IdGeneratorService {
    private readonly charCodes = { a: 65, z: 90 };
    private readonly idLength = 8;

    public generate(): string {
        return [...Array(this.idLength).keys()]
            .reduce( acc => `${acc}${this.getRandomLetter()}`, '');
    }

    private getRandomLetter(): string {
        const charCode = this.getRandomIntInRange(this.charCodes.a, this.charCodes.z);
        return String.fromCharCode(charCode);
    }

    private getRandomIntInRange(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
