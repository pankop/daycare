import { Test, TestingModule } from '@nestjs/testing';
import { TakeCareService } from './take-care.service';

describe('TakeCareService', () => {
  let service: TakeCareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TakeCareService],
    }).compile();

    service = module.get<TakeCareService>(TakeCareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
