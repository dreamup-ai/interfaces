export type DatabaseRecord = {
  id: string;
}

export type PaginatedDatabaseResponse = {
  items: DatabaseRecord[];
  last: string;
}

export interface IDatabase {
  /**
   * Retrieves a single record from the database using the id (primary key)
   * as the lookup key. Returns null if the record does not exist.
   * @param id 
   */
  getOne(id: string): Promise<DatabaseRecord>;

  /**
   * Pulls all records from the database
   */
  getAll(last?: string): Promise<PaginatedDatabaseResponse>;

  /**
   * Pulls records from the database using a list of ids.
   * Missing records will be returned as Null. Returns
   * an array of records in the same order as the ids.
   * @param ids 
   */
  getMany(ids: string[]): Promise<PaginatedDatabaseResponse>;

  /**
   * Pulls records from the database using an arbitrary query.
   * @param query An object containing the query parameters
   */
  query(query: any): Promise<PaginatedDatabaseResponse>;

  /**
   * Creates a new record in the database. Fails if the record
   * already exists.
   * @param record 
   */
  create(record: DatabaseRecord): Promise<DatabaseRecord>;

  /**
   * Updates only fields that are present in the record. Fails
   * if the record does not exist.
   * @param record 
   */
  update(record: DatabaseRecord): Promise<DatabaseRecord>;

  /**
   * Updates only fields that are present in the record. Creates
   * the record if it does not exist.
   * @param record 
   */
  upsert(record: DatabaseRecord): Promise<DatabaseRecord>;

  /**
   * Removes a record from the database. Fails if the record
   * does not exist.
   * @param id 
   */
  delete(id: string): Promise<void>;

  /**
   * Atomically increments a number field in the database. Fails
   * if the record does not exist or the field is not a number.
   * If the field does not exist, it will be created.
   * @param id 
   * @param key 
   * @param value 
   */
  increment(id: string, key: string, value: number): Promise<DatabaseRecord>;

  /**
   * Adds a value to a list field in the database. Fails if the
   * record does not exist or the field is not a list. If the field does
   * not exist, it will be created.
   * @param id 
   * @param key 
   * @param value 
   */
  appendToList(id: string, key: string, value: any): Promise<DatabaseRecord>;

  /**
   * Removes a value from a list field in the database. Fails if the
   * record does not exist or the field is not a list. If the field does
   * not exist, it will be created.
   * @param id 
   * @param key 
   * @param value 
   */
  removeFromList(id: string, key: string, value: any): Promise<DatabaseRecord>;

  /**
   * Adds a value to a set field in the database. Fails if the
   * record does not exist or the field is not a set. If the field does
   * not exist, it will be created.
   * @param id 
   * @param key 
   * @param value 
   */
  addToSet(id: string, key: string, value: any): Promise<DatabaseRecord>;

  /**
   * Removes a value from a set field in the database. Fails if the
   * record does not exist or the field is not a set. If the field does
   * not exist, it will be created.
   * @param id 
   * @param key 
   * @param value 
   */
  removeFromSet(id: string, key: string, value: any): Promise<DatabaseRecord>;
}