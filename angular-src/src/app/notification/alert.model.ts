export interface Alert {
    message?: string;
    type?: NOTIFICATION_TYPE;
  }

  export enum NOTIFICATION_TYPE { SUCCESS, WARNING, ERROR }
