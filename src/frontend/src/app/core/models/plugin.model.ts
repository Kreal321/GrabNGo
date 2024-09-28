import { Status } from "../enums/status.enum";

export interface Plugin {
  name: string;
  url: string;
  username: string;
  password: string;
  token: string;
  status: Status;
  message: string;
  updated: Date;
  created: Date;
}
