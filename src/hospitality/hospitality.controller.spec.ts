import { Test, TestingModule } from '@nestjs/testing';
import { HospitalityController } from './hospitality.controller';
import { HospitalityService } from './hospitality.service';

describe('HospitalityController', () => {
  let controller: HospitalityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HospitalityController],
      providers: [HospitalityService],
    }).compile();

    controller = module.get<HospitalityController>(HospitalityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
