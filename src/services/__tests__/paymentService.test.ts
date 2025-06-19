import { paymentService } from '../paymentService';
import { paymentRepository } from '../../repositories/paymentRepository';
import { PaymentRequest, AcknowledgedRequest } from '../../interfaces/types';

// Mock the repository layer to isolate the service for unit testing
jest.mock('../../repositories/paymentRepository');

const mockPaymentRepository = paymentRepository as jest.Mocked<typeof paymentRepository>;

describe('PaymentService', () => {

  beforeEach(() => {
    // Clear mock history before each test
    jest.clearAllMocks();
  });

  it('observe method should call repository.create and return the result', async () => {
    const request: PaymentRequest = {
      amount: 100.5,
      creditor: 'MegaCorp',
    };
    
    const expectedResult: AcknowledgedRequest = {
      ...request,
      requestId: 'req_12345',
      status: 'DEFERRED',
      observedAt: Date.now(),
    };

    // Configure the mock to return our expected result
    mockPaymentRepository.create.mockResolvedValue(expectedResult);

    const result = await paymentService.observe(request);

    // Verify that the repository's create method was called correctly
    expect(mockPaymentRepository.create).toHaveBeenCalledWith(request);
    expect(mockPaymentRepository.create).toHaveBeenCalledTimes(1);
    
    // Verify that the service returned the data from the repository
    expect(result).toEqual(expectedResult);
  });

  it('getStatus should return a request if found by the repository', async () => {
    const requestId = 'req_12345';
    const expectedRequest: AcknowledgedRequest = {
      requestId,
      amount: 50,
      creditor: 'TestCorp',
      status: 'DEFERRED',
      observedAt: Date.now(),
    };
    
    mockPaymentRepository.findById.mockResolvedValue(expectedRequest);

    const result = await paymentService.getStatus(requestId);

    expect(mockPaymentRepository.findById).toHaveBeenCalledWith(requestId);
    expect(mockPaymentRepository.findById).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedRequest);
  });

  it('getStatus should return null if not found by the repository', async () => {
    const requestId = 'req_not_found';
    mockPaymentRepository.findById.mockResolvedValue(undefined);

    const result = await paymentService.getStatus(requestId);

    expect(mockPaymentRepository.findById).toHaveBeenCalledWith(requestId);
    expect(result).toBeNull();
  });
});