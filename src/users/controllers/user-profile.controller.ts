import {
  Body,
  Controller,
  Inject,
  Patch,
} from '@nestjs/common';
import { Routes, Services } from '../../utils/constants';
import { AuthUser } from '../../utils/decorators';
import { User } from '../../utils/typeorm';
import { UpdateUserProfileParams } from '../../utils/types';
import { UpdateUserProfileDto } from '../dtos/UpdateUserProfile.dto';
import { IUserProfile } from '../interfaces/user-profile';

@Controller(Routes.USERS_PROFILES)
export class UserProfilesController {
  constructor(
    @Inject(Services.USERS_PROFILES)
    private readonly userProfileService: IUserProfile,
  ) {}

  @Patch()
  async updateUserProfile(
    @AuthUser() user: User,
    @Body()
    updateUserProfileDto: UpdateUserProfileDto,
  ) {
    const params: UpdateUserProfileParams = {};
    updateUserProfileDto.about && (params.about = updateUserProfileDto.about);
    return this.userProfileService.createProfileOrUpdate(user, params);
  }
}
