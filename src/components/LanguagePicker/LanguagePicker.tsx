import { Flex } from '@chakra-ui/react';
import classes from './LanguagePicker.module.css';
import { changeLanguageHandler } from '../../i18n';
import { languageAtom } from '../../molecules/settings';
import { useAtom } from 'jotai';
import RadioButtonGroup from '../UI/RadioButtonGroup';
import Flag from 'react-world-flags';

const LanguagePicker = () => {
  const [lang, setLang] = useAtom(languageAtom);
  return (
    <Flex className={classes.languagePicker} justifyContent="space-between" alignItems={'center'}>
      <RadioButtonGroup
        options={[
          {
            value: 'ru',
            renderValue: <Flag code="RUS" style={{ width: '2rem' }} />,
          },
          { value: 'en', renderValue: <Flag code="GBR" style={{ width: '2rem' }} /> },
        ]}
        selected={lang}
        setSelected={(v) => {
          setLang(v);
          changeLanguageHandler(v);
        }}
      />
    </Flex>
  );
};

export default LanguagePicker;
