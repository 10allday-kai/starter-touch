import { Subject } from "../lib/subject";

export interface ToastServiceEmit {
  message: string;
  duration: number;
}

interface ToastProps {
  message: string;
  duration?: number;
}

class ToastService {
  public service = new Subject();

  public show({ message, duration }: ToastProps) {
    this.service.emit({ message, duration: duration || 3000 });
  }

  public queue(messages: ToastProps[]) {
    let waitTime = 0;
    messages.forEach(message => {
      setTimeout(() => {
        this.show(message);
      }, waitTime)
      waitTime += message.duration + 200;
    });
  }
}

export const toast = new ToastService();