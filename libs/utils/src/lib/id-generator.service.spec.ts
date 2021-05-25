import { TestBed } from '@angular/core/testing';
import { IdGeneratorService } from './id-generator.service';

describe('IdGeneratorService', () => {
    let service: IdGeneratorService;
    beforeEach(() => TestBed.configureTestingModule({providers: [IdGeneratorService]}));
    beforeEach(() => service = TestBed.get(IdGeneratorService));

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should generate id', () => {
        const id = service.generate();

        expect(id).toBeDefined();
    });

    it('should generate unique ids', () => {
        const uniqueIds = new Set<string>();
        const numberOfIdsTobeGenerated = 100;

        for ( let i = 0; i < numberOfIdsTobeGenerated; i++ ) {
            uniqueIds.add(service.generate());
        }

        expect(uniqueIds.size).toEqual(numberOfIdsTobeGenerated);
    });
});
