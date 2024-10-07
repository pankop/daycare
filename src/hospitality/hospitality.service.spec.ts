import { Test, TestingModule } from '@nestjs/testing';
import { HospitalityService } from './hospitality.service';

describe('HospitalityService', () => {
  let service: HospitalityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HospitalityService],
    }).compile();

    service = module.get<HospitalityService>(HospitalityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
