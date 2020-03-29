import { QueueService } from './queue.service';
import { TestBed } from '@angular/core/testing';

describe('QueueService', () => {
    let queue: QueueService;
    const testFun = (args: any) => { console.log(args); };
    beforeEach(() => { TestBed.configureTestingModule({ providers: [ QueueService ] }); });
    beforeEach(() => { queue = TestBed.get(QueueService); });

    it('should be created', () => {
        expect(queue).toBeTruthy();
    });

    it('should execute queued task', () => {
        const obj = { task: () => {} };
        const spy = spyOn(obj, 'task');
        queue.enqueue(obj.task);

        queue.dequeue();

        expect(spy).toHaveBeenCalled();
    });

    it('should execute tasks in correct order', () => {
        const obj = {
            t1: () => {},
            t2: () => {}
        };
        const t1Spy = spyOn(obj, 't1');
        const t2Spy = spyOn(obj, 't2');

        queue.enqueue(obj.t1);
        queue.enqueue(obj.t2);

        queue.dequeue();
        expect(t2Spy).toHaveBeenCalled();
        queue.dequeue();
        expect(t1Spy).toHaveBeenCalled();
    });
});
