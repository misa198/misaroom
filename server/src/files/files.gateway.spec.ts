import { Test, TestingModule } from '@nestjs/testing';
import { FilesGateway } from './files.gateway';

describe('FilesGateway', () => {
  let gateway: FilesGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesGateway],
    }).compile();

    gateway = module.get<FilesGateway>(FilesGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
