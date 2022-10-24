export type Table = string[][];

export type CreateTable = () => Table;

export type Encode = (input: string, table?: Table) => [string, Table];
export type Decode = (input: string, table: Table) => string;