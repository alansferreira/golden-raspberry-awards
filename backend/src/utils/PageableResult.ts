import { QueryRunner } from "typeorm";

export interface PageableResult<T>{
  totalItems: number;
  page: number;
  items: T[]
}
