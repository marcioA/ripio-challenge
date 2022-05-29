import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
const request = require('supertest');
const { validate } = require('uuid');

describe('AccountController', () => {

  /**
   * Should create an account
   * Should delete an account
   * Should change some data
   */

  let controller: AccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [AccountService],
    }).compile();

    controller = module.get<AccountController>(AccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an account', async () => {
      const result = await controller.create({
        agency: "0001",
        number: 0,
        credit_value: 0,
        balance_value: 0,
      })

      expect(result).toEqual({
        agency: "0001",
        number: 0,
        credit_value: 0,
        balance_value: 0,
      })
    })
  })

});
