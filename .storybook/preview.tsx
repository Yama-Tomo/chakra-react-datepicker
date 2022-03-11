import {
  ChakraProvider,
  extendTheme,
  Flex,
  IconButton,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { Parameters, StoryContext } from '@storybook/react';
import qs from 'qs';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

/**
 * Add global context for RTL-LTR switching
 */
export const globalTypes = {
  direction: {
    name: 'Direction',
    description: 'Direction for layout',
    defaultValue: 'LTR',
    toolbar: {
      icon: 'globe',
      items: ['LTR', 'RTL'],
    },
  },
};

const getColorMode = () => {
  const query = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  return 'colormode' in query && query.colormode === 'dark' ? 'dark' : 'light';
};

const ForceSetColorModeContainer: React.FC = ({ children }) => {
  const tick = useRef(0);
  const { colorMode: currentColorMode, setColorMode } = useColorMode();
  const colorMode = getColorMode();

  useEffect(() => {
    if (tick.current > 0) {
      return;
    } else {
      tick.current += 1;
    }

    if (currentColorMode !== colorMode) {
      setColorMode(colorMode);
    }
  }, [setColorMode, colorMode, currentColorMode]);

  return <>{children}</>;
};

const ColorModeToggleBar = () => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const nextMode = useColorModeValue('dark', 'light');

  return (
    <Flex justify="flex-end" mb={4}>
      <IconButton
        size="md"
        fontSize="lg"
        aria-label={`Switch to ${nextMode} mode`}
        variant="ghost"
        color="current"
        marginLeft="2"
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
      />
    </Flex>
  );
};

const withChakra = (StoryFn: Function, context: StoryContext) => {
  const { direction } = context.globals;
  const dir = direction.toLowerCase();

  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);

  return (
    <ChakraProvider theme={extendTheme({ direction: dir })}>
      <ForceSetColorModeContainer>
        <div dir={dir} id="story-wrapper" style={{ minHeight: '100vh' }}>
          <ColorModeToggleBar />
          <StoryFn />
        </div>
      </ForceSetColorModeContainer>
    </ChakraProvider>
  );
};

export const parameters: Parameters = {
  options: {
    storySort: (a: any, b: any) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
};

export const decorators = [withChakra];
