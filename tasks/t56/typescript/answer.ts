class UniqueDeque<T> {
  private deque: T[];
  private set: Set<T>;

  constructor() {
    this.deque = [];
    this.set = new Set<T>();
  }

  add(item: T): boolean {
    if (!this.set.has(item)) {
      this.deque.push(item);
      this.set.add(item);
      return true;
    }
    return false;
  }

  delete(item: T): boolean {
    if (this.set.has(item)) {
      const index = this.deque.findIndex((x) => x === item);
      if (index !== -1) {
        this.deque.splice(index, 1);
      }
      this.set.delete(item);
      return true;
    }
    return false;
  }

  contains(item: T): boolean {
    return this.set.has(item);
  }

  length(): number {
    return this.deque.length;
  }

  *[Symbol.iterator](): Iterator<T> {
    for (const item of this.deque) {
      yield item;
    }
  }

  toString(): string {
    return `UniqueDeque(${this.deque.toString()})`;
  }
}
