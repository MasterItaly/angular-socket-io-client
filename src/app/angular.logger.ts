/** * Logger - Angular */
export class AngularLogger {
  private project: string;
  private isDebug: boolean = true;

  constructor(project: string) {
    const fixProject: string = project.startsWith('_') ? project.slice(1) : project;
    this.project = `[${fixProject}]`.padEnd(20, ' ');
  }

  /**
   * * Log
   * @param msg
   * @param obj
   */
  log(msg: string, obj?: Object): void {
    const message: string = `🟡 | ${this.dateTimeString()} | ${this.project} | ${msg}`;
    if (obj) {
      console.groupCollapsed(message);
      console.log(obj);
      console.groupEnd();
    } else {
      console.log(message);
    }
  }

  /**
   * * Information
   * @param msg
   * @param obj
   */
  info(msg: string, obj?: Object): void {
    const message: string = `🔵 | ${this.dateTimeString()} | ${this.project} | ${msg}`;
    if (obj) {
      console.groupCollapsed(message);
      console.log(obj);
      console.groupEnd();
    } else {
      console.log(message);
    }
  }

  /**
   * * Succsess
   * @param msg
   * @param obj
   */
  succsess(msg: string, obj?: Object): void {
    const message: string = `🟢 | ${this.dateTimeString()} | ${this.project} | ${msg}`;
    if (obj) {
      console.groupCollapsed(message);
      console.log(obj);
      console.groupEnd();
    } else {
      console.log(message);
    }
  }

  /**
   * * Debug
   * @param msg
   * @param obj
   */
  debug(msg: string, obj?: Object): void {
    if (this.isDebug) {
      const message: string = `🟣 | ${this.dateTimeString()} | ${this.project} | ${msg}`;
      if (obj) {
        console.groupCollapsed(message);
        console.debug(obj);
        console.groupEnd();
      } else {
        console.debug(message);
      }
    }
  }

  /**
   * * Warning
   * @param msg
   * @param obj
   */
  warn(msg: string, obj?: Object): void {
    const message: string = `🟠 | ${this.dateTimeString()} | ${this.project} | ${msg}`;
    if (obj) {
      console.groupCollapsed(message);
      console.warn(obj);
      console.groupEnd();
    } else {
      console.warn(message);
    }
  }

  /**
   * * Error
   * @param msg
   * @param error
   */
  error(msg: string, error?: any): void {
    const message: string = `🔴 | ${this.dateTimeString()} | ${this.project} | ${msg}`;
    if (error) {
      console.groupCollapsed(message);
      console.error(error);
      console.groupEnd();
    } else {
      console.error(message);
    }
  }

  /** * DateTime String */
  private dateTimeString(): string {
    const date = new Date();
    const iso = date.toISOString();
    const dateTime = iso.replace('T', ' ').replace('Z', '');
    return dateTime;
  }
}
