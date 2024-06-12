import httpService from './HttpService';
import { ProfileData } from '../../types/ProfileData';

export const getProfile = async (): Promise<ProfileData | null> => {
  const profile = await httpService.get('/profile');
  if (!profile) return null;
  return profile.data as ProfileData;
};

export const editNickname = async (nickname: string) => {
  await httpService.patch('/profile/nickname', { nickname });
};

export const deleteToken = async () => {
  await httpService.patch('/profile', {
    token: localStorage.getItem('token'),
  });
};
