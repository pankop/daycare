import { Test, TestingModule } from '@nestjs/testing';
import { TakeCareController } from './take-care.controller';
import { TakeCareService } from './take-care.service';

describe('TakeCareController', () => {
  let controller: TakeCareController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TakeCareController],
      providers: [TakeCareService],
    }).compile();

    controller = module.get<TakeCareController>(TakeCareController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
