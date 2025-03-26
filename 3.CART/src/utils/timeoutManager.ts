export class TimeoutManager {
  private timeoutId: NodeJS.Timeout | null = null;

  wait(ms: number): Promise<void> {
    return new Promise((resolve) => {
      this.timeoutId = setTimeout(resolve, ms);
    });
  }

  clear(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}
