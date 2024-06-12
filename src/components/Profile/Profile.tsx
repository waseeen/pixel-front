import { useEffect, useRef } from 'react';
import classes from './Profile.module.css';
import * as VKID from '@vkid/sdk';
import { Avatar, Box, Button, Flex, Heading } from '@chakra-ui/react';
import InputEditable from '../UI/InputEditable';
import { deleteToken, editNickname, getProfile } from '../../api/services/ProfileService';
import { useAtom } from 'jotai';
import { profileAtom } from '../../molecules/profile';
import { useTranslation } from 'react-i18next';

VKID.Config.set({
  app: import.meta.env.VITE_VK_APP_ID,
  redirectUrl: import.meta.env.VITE_REDIRECT_URL,
});

const Profile = () => {
  const queryParams = new URLSearchParams(window.location.search);
  if (queryParams.get('id') && queryParams.get('token')) {
    localStorage.setItem('id', String(queryParams.get('id')));
    localStorage.setItem('token', String(queryParams.get('token')));
  }

  const { t } = useTranslation();

  const [profileData, setProfileData] = useAtom(profileAtom);
  const mounted = useRef(false);
  const vkidRendered = useRef(false);
  const oneTap = new VKID.OneTap();
  const renderVkid = () => {
    const container = document.getElementById('VkIdSdkOneTap');
    if (!container) return;
    oneTap.render({
      container: container,
      scheme: VKID.Scheme.DARK,
      lang: VKID.Languages.RUS,
      showAlternativeLogin: true,
    });
    vkidRendered.current = true;
  };
  if (vkidRendered.current == false) {
    renderVkid();
  }
  const fetchProfile = async () => {
    await getProfile().then((p) => {
      if (!p) return setProfileData(null);
      return setProfileData(p);
    });
  };

  const submitNick = async (nickname: string) => {
    await editNickname(nickname);
    fetchProfile();
  };

  const logout = async () => {
    await deleteToken();
    localStorage.clear();
    setProfileData(null);
  };
  useEffect(() => {
    if (!mounted.current) {
      fetchProfile();
    }
    return () => {
      mounted.current = true;
      window.history.pushState({}, document.title, window.location.pathname);
    };
  });
  return (
    <Flex direction={'column'} className={classes.profile} gap={'10px'}>
      <>
        {profileData !== null ? (
          <>
            <Flex justify="space-between">
              <Heading size="md">{t('profile')}</Heading>
              <Avatar src={profileData.photo} />
            </Flex>
            <Flex justify="space-between">
              <Box />
              <InputEditable value={profileData.nickname} onSubmit={submitNick} />
            </Flex>
            <Flex justify="space-between">
              <Box />
              <Button size={'sm'} onClick={logout}>
                {t('logout')}
              </Button>
            </Flex>
          </>
        ) : (
          <></>
        )}
        <Box
          sx={{ display: profileData !== null ? 'none' : 'block', width: '250px' }}
          id="VkIdSdkOneTap"
        />
      </>
    </Flex>
  );
};
export default Profile;
