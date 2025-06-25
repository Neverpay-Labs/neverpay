import {
  WebhookEventStatus,
  IWebhookEventCreation,
} from '../interfaces/types';
import { prisma } from '../lib/prisma';
import { WebhookEvent } from '@prisma/client';
import { randomBytes } from 'crypto';

class WebhookEventRepository {
  /**
   * Creates and persists a new webhook event record in the database.
   * These events are used to notify external systems about occurrences.
   */
  public async create(
    eventData: IWebhookEventCreation,
  ): Promise<WebhookEvent> {
    // Generate a unique, secure, and readable event ID
    const eventId = `evt_${randomBytes(16).toString('hex')}`;

    const newRecord = await prisma.webhookEvent.create({
      data: {
        ...eventData,
        eventId: eventId,
        status: 'PENDING',
        attempts: 0,
      },
    });

    return newRecord;
  }

  /**
   * Finds a webhook event by its unique eventId.
   */
  public async findById(
    id: string,
  ): Promise<WebhookEvent | null> {
    return prisma.webhookEvent.findUnique({ where: { eventId: id } });
  }

  /**
   * Retrieves all webhook events from the database, newest first.
   */
  public async findAll(): Promise<WebhookEvent[]> {
    return prisma.webhookEvent.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Updates the status of a specific webhook event and increments its attempt count.
   * Useful for tracking delivery attempts and successes/failures.
   */
  public async updateAttempt(
    id: string,
    status: WebhookEventStatus,
  ): Promise<WebhookEvent | null> {
    return prisma.webhookEvent.update({
      where: { eventId: id },
      data: {
        status,
        attempts: {
          increment: 1,
        },
      },
    });
  }

  /**
   * Finds all pending webhook events that need to be dispatched.
   */
  public async findPendingEvents(limit = 50): Promise<WebhookEvent[]> {
    return prisma.webhookEvent.findMany({
      where: { status: 'PENDING' },
      orderBy: { createdAt: 'asc' }, // Process oldest first
      take: limit,
    });
  }
}

export const webhookEventRepository = new WebhookEventRepository();