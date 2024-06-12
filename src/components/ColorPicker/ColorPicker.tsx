import { Button, Flex } from '@chakra-ui/react';
import { Colors } from '../../types/Colors';
import TileBlock from '../Tile/TileBlock';
import classes from './ColorPicker.module.css';
import { useEffect, useMemo, useState } from 'react';
import HttpService from '../../api/services/HttpService';
import { useAtom } from 'jotai';
import {
  cooldownAtom,
  nextCooldownAtom,
  selectedColorAtom,
  selectedTileAtom,
} from '../../molecules/canvas';
import getTimeout from '../../utils/getTimeout';
import { useTranslation } from 'react-i18next';

const ColorPicker = () => {
  const { t } = useTranslation();

  const [nextCooldown, setNextCooldown] = useAtom(nextCooldownAtom);
  const [selectedColor, setSelectedColor] = useAtom(selectedColorAtom);
  const [selectedTile] = useAtom(selectedTileAtom);
  const [cooldown] = useAtom(cooldownAtom);
  const [loading, setLoading] = useState(false);
  const isButtonDisabled = useMemo(() => nextCooldown > 0, [nextCooldown]);
  const buttonText = useMemo(() => {
    return isButtonDisabled ? (
      <>{new Date(nextCooldown * 1000).toISOString().substring(14, 19)}</>
    ) : (
      <>{t('paint')}</>
    );
  }, [t, isButtonDisabled, nextCooldown]);
  const submit = async () => {
    setLoading(true);
    const res = await HttpService.post('/', {
      type: 'tile_update',
      payload: {
        color: selectedColor,
        number: selectedTile,
      },
    });
    res?.status === 200 && localStorage.setItem('cooldown', String(Date.now() + cooldown));
    setNextCooldown(getTimeout());
    setLoading(false);
  };

  useEffect(() => {
    const i = setInterval(() => {
      setNextCooldown(getTimeout());
    }, 100);
    return () => {
      clearInterval(i);
    };
  });

  return (
    <Flex className={classes.colorPicker} justifyContent="space-between" alignItems={'center'}>
      <Flex>
        {(Object.keys(Colors) as (keyof typeof Colors)[]).map((c, i) => (
          <TileBlock
            key={c + i}
            tile={{ color: Colors[c], number: i }}
            onClick={() => setSelectedColor(Colors[c])}
            selected={selectedColor == Colors[c]}
          />
        ))}
      </Flex>
      ㅤ
      <Button
        onClick={() => {
          submit();
        }}
        size="sm"
        width={100}
        isLoading={loading}
        isDisabled={isButtonDisabled}
        sx={{ ':disabled': { cursor: 'default' }, '&:hover': { cursor: 'default' } }}
      >
        {buttonText}
      </Button>
    </Flex>
  );
};

export default ColorPicker;
