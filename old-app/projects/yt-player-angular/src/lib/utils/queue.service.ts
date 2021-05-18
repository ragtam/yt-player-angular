import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class QueueService {

  private queue = new Map<number, (arg?: any) => void>();

  public enqueue(task: (arg?: any) => void): any {
    const key = this.generateKey();
    this.addTask(key, task);
  }

  public dequeue(): void {
    const task = this.getAndRemoveFromQueue();
    this.execute(task);
  }

  private addTask(key: number, task: (arg?: any) => void): void {
    this.queue.set(key, task);
  }

  private generateKey(): number {
    return this.queue.size + 1;
  }

  private getAndRemoveFromQueue(): (arg?: any) => void {
    const latestKey = this.queue.size;
    const task = this.queue.get(latestKey);
    this.queue.delete(latestKey);
    return task;
  }

  private execute( task: (arg?: any) => void ): void {
      if ( task && typeof task === 'function' ) {
          task();
      }
  }
}
