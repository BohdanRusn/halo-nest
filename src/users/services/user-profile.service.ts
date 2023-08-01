import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile, User } from '../../utils/typeorm';
import { UpdateUserProfileParams } from '../../utils/types';
import { IUserProfile } from '../interfaces/user-profile';

@Injectable()
export class UserProfileService implements IUserProfile {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  createProfile() {
    const newProfile = this.profileRepository.create();
    return this.profileRepository.save(newProfile);
  }

  async createProfileOrUpdate(user: User, params: UpdateUserProfileParams) {
    console.log('CreateProfileOrUpdate');
    if (!user.profile) {
      console.log('User has no profile. Creating...');
      user.profile = await this.createProfile();
      return this.updateProfile(user, params);
    }
    console.log('User has profile');
    return this.updateProfile(user, params);
  }

  async updateProfile(user: User, params: UpdateUserProfileParams) {
    console.log(params);
    if (params.about) user.profile.about = params.about;
    return this.userRepository.save(user);
  }
}
