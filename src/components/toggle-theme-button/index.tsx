import { useColorMode, useColorModeValue, Switch, FormControl, FormLabel } from '@chakra-ui/react';
import { MdBrightness5 as SunIcon, MdBrightness4 as MoonIcon } from 'react-icons/md';

export default function ToggleThemeButton() {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(SunIcon, MoonIcon);

  return (
    <FormControl aria-label={`Switch to ${text} mode`} display="flex" alignItems="center">
      <FormLabel htmlFor="switch-theme" mb="0">
        <SwitchIcon />
      </FormLabel>
      <Switch id="switch-theme" colorScheme="purple" onChange={toggleColorMode} />
    </FormControl>
  );
}
