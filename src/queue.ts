export interface IQueueMessage {
  /**
   * The body of the message. This can be any JSON-serializable object.
   */
  body: any;

  /**
   * Remove the message from the queue. This method should be called
   * after the message has been processed.
   */
  delete(): Promise<void>;
}

export interface IQueue {
  /**
   * The name of the queue
   */
  name: string;

  /**
   * Send a message to the queue
   * @param message The message to send to the queue. This can be any JSON-serializable object.
   */
  sendMessage(message: any): Promise<void>;

  /**
   * Receive an array of message from the queue. This method will block until a message is available, or
   * the timeout is reached. Each message should be deleted after it has been processed.
   * @returns The messages that were received. returns an empty array if the timeout is reached.
   * @throws Error if the queue is not found
   */
  receiveMessages(
    num?: number,
    timeoutSeconds?: number
  ): Promise<IQueueMessage[]>;

  /**
   * Delete the queue. This method should be called when the queue is no longer needed.
   */
  delete(): Promise<void>;
}

export interface IQueueManager {
  /**
   * Create a new queue with the given name. If the queue already exists, it will be returned.
   * @param queueName The name of the queue to create
   * @returns The queue that was created
   * @throws Error if the queue could not be created
   */
  createQueue(queueName: string, opts: QueueOptions): Promise<IQueue>;

  /**
   *
   * @param queueName The name of the queue to retrieve
   */
  getQueue(queueName: string): Promise<IQueue>;

  /**
   * Return all queues that are currently managed by this queue manager
   */
  listQueues(prefix?: string): Promise<IQueue[]>;
}

export type QueueOptions = {
  delaySeconds?: number;
  messageRetentionSeconds?: number;
  deadLetterQueue?: string;
  maxReceiveCount?: number;
  visibilityTimeoutSeconds?: number;
  receiveMessageWaitTimeSeconds?: number;
  encrypted?: boolean;
  fifo?: boolean;
};
