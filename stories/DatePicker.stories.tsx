import { CalendarIcon } from '@chakra-ui/icons';
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Stack,
} from '@chakra-ui/react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import mockdate from 'mockdate';
import qs from 'qs';
import * as React from 'react';
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import { DatePicker as OriginalDatePicker } from '../src';

const useBasicPropsProvide = (opts?: { initialStartDate?: Date }) => {
  const [startDate, setStartDate] = React.useState<null | Date>(opts?.initialStartDate ?? null);
  const [endDate, setEndDate] = React.useState<null | Date>(null);
  const onChange = (dates: Date | null | [Date | null, Date | null]) => {
    if (!Array.isArray(dates)) {
      setStartDate(dates);
      return;
    }

    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return [startDate, endDate, onChange] as const;
};

type OmittedProps = Omit<
  Parameters<NonNullable<ComponentStoryObj<typeof OriginalDatePicker>['render']>>[0],
  'onChange'
>;
const WithBasicProps = (mockToday: string, opts?: { initialStartDate?: Date }) =>
  function DatePickerWithBasicProps(props: OmittedProps) {
    mockdate.set(mockToday);
    const [tick, setTick] = useState(0);
    const [startDate, endDate, onChange] = useBasicPropsProvide(opts);

    useEffect(() => {
      setTimeout(() => {
        setTick((v) => v + 1);
      }, 1500);
    }, []);

    return (
      <>
        {tick > 0 && (
          <div className={'delayed-take-percy-screenshot'} style={{ height: 0, width: 0 }} />
        )}
        <OriginalDatePicker
          {...props}
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          onChange={onChange}
        />
      </>
    );
  };

const DatePicker = WithBasicProps('2022-03-09 01:00:00', {
  initialStartDate: new Date('2022-03-08 10:00:00'),
});
const argsFromQs = (() => {
  const params = qs.parse(window.location.search, { ignoreQueryPrefix: true });

  try {
    return JSON.parse(String(params.props));
  } catch {
    return {};
  }
})();

const percyArgs = (args: Record<string, unknown>, isDarkMode?: boolean) => {
  return {
    ...(isDarkMode ? { prefix: '[Dark mode] ' } : {}),
    waitForSelector: '.delayed-take-percy-screenshot',
    queryParams: {
      props: JSON.stringify({ startOpen: true, ...args }),
      ...(isDarkMode ? { colormode: 'dark' } : {}),
    },
  };
};

type Story = ComponentStoryObj<typeof OriginalDatePicker>;
const baseStory: Story = {
  render: DatePicker,
  args: argsFromQs,
  parameters: {
    percy: {
      skip: true,
    },
  },
};

export const BasicUsage: Story = {
  ...baseStory,
  parameters: {
    percy: {
      ...percyArgs({}),
      additionalSnapshots: [{ ...percyArgs({}, true) }],
    },
  },
};

export const WithRootProps: Story = {
  ...baseStory,
  args: {
    rootProps: {
      w: '200px',
      p: 3,
      borderColor: 'green.600',
      borderWidth: 1,
      borderStyle: 'solid',
    },
    ...baseStory.args,
  },
};

export const WithDatePickerSize: Story = {
  ...baseStory,
  args: {
    datePickerSize: 'xs',
    ...baseStory.args,
  },
  parameters: {
    percy: {
      ...percyArgs({}),
    },
  },
};

export const WithResponsiveSize: Story = {
  ...baseStory,
  args: {
    datePickerSize: { base: 'xs', md: 'md', xl: 'xl' },
    ...baseStory.args,
  },
};

export const WithDatePickerColorScheme: Story = {
  ...baseStory,
  args: {
    datePickerColorSchema: 'red',
    ...baseStory.args,
  },
};

export const WithInputProps: Story = {
  ...baseStory,
  args: {
    inputProps: {
      size: 'sm',
      variant: 'filled',
    },
    ...baseStory.args,
  },
};

export const WithExtendDatePickerTheme: Story = {
  ...baseStory,
  args: {
    extendDatePickerTheme(colorMode, theme) {
      if (colorMode === 'light') {
        return { ...theme, header: 'teal.400', outsideDay: 'red.400' };
      }

      return { ...theme, header: 'teal.600', outsideDay: 'red.600' };
    },
    ...baseStory.args,
  },
};

export const WithPopoverPlacement: Story = {
  ...baseStory,
  render: (props) => (
    <>
      <div style={{ height: '300px' }} />
      <Flex justifyContent={'center'}>
        <DatePicker {...props} />
      </Flex>
    </>
  ),
  args: {
    rootProps: { w: 500 },
    popperPlacement: 'top-end',
    ...baseStory.args,
  },
};

export const Disabled: Story = {
  ...baseStory,
  args: {
    disabled: true,
    ...baseStory.args,
  },
};

export const WithClearButton: Story = {
  ...baseStory,
  args: {
    isClearable: true,
    ...baseStory.args,
  },
};

export const WithTimeSelect: Story = {
  ...baseStory,
  args: {
    showTimeSelect: true,
    dateFormat: 'MM/dd/yyyy h:mm aa',
    ...baseStory.args,
  },
};

export const WithTimeInput: Story = {
  ...baseStory,
  args: {
    showTimeInput: true,
    customTimeInput: <Input type={'time'} />,
    dateFormat: 'MM/dd/yyyy h:mm aa',
    ...baseStory.args,
  },
};

export const WithYearAndMonthPicker: Story = {
  ...baseStory,
  args: {
    ...baseStory.args,
    showMonthDropdown: true,
    showYearDropdown: true,
  },
};

export const WithPortal: Story = {
  ...baseStory,
  args: {
    withPortal: true,
    ...baseStory.args,
  },
  parameters: {
    percy: {
      ...percyArgs({}),
    },
  },
};

const addDays = (add: number) => {
  mockdate.set('2022-03-09');
  const today = new Date();
  today.setDate(today.getDate() + add);
  return today;
};

export const ExcludeDays: Story = {
  ...baseStory,
  args: {
    excludeDates: [addDays(1), addDays(2), addDays(3)],
    ...baseStory.args,
  },
};

export const RangeDays: Story = {
  ...baseStory,
  args: {
    selectsRange: true,
    ...baseStory.args,
  },
};

export const Invalid: Story = {
  ...baseStory,
  args: {
    inputProps: {
      isInvalid: true,
    },
    ...baseStory.args,
  },
  parameters: {
    percy: {
      ...percyArgs({}),
    },
  },
};

export const InvalidWithFormControl: Story = {
  ...baseStory,
  render: (props) => (
    <FormControl isInvalid isRequired>
      <FormLabel htmlFor="date">date</FormLabel>
      <DatePicker id={'date'} {...props} />
      <FormErrorMessage>example error message.</FormErrorMessage>
    </FormControl>
  ),
};

export const WithLeftIcons: Story = {
  ...baseStory,
  render: (props) => (
    <Stack spacing={'400px'}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <CalendarIcon color="gray.300" />
        </InputLeftElement>
        <DatePicker inputProps={{ paddingInlineStart: 10 }} {...props} />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>
          <CalendarIcon />
        </InputLeftAddon>
        <DatePicker
          inputProps={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          popperPlacement={'top-end'}
          {...props}
        />
      </InputGroup>
      <div />
    </Stack>
  ),
};

export const PassVariousProps: Story = {
  ...baseStory,
  render: (props) => (
    <Stack spacing={'490px'}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <CalendarIcon color="gray.300" />
        </InputLeftElement>
        <DatePicker
          inputProps={{ paddingInlineStart: 10 }}
          showTimeInput
          customTimeInput={<Input type={'time'} />}
          rootProps={{
            w: '300px',
          }}
          {...props}
        />
      </InputGroup>
      <InputGroup size={'xs'}>
        <InputLeftAddon>
          <CalendarIcon />
        </InputLeftAddon>
        <DatePicker
          inputProps={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            size: 'xs',
          }}
          datePickerColorSchema={'red'}
          showMonthDropdown
          showYearDropdown
          showTimeSelect
          extendDatePickerTheme={(colorMode, theme) => {
            if (colorMode === 'light') {
              return { ...theme, header: 'teal.400', outsideDay: 'red.400' };
            }

            return { ...theme, header: 'teal.600', outsideDay: 'red.600' };
          }}
          popperPlacement={'top-end'}
          {...props}
        />
      </InputGroup>
      <div />
    </Stack>
  ),
  args: {
    selectsRange: true,
    isClearable: true,
    excludeDates: [addDays(1), addDays(2), addDays(3)],
    dateFormat: 'MM/dd/yyyy h:mm aa',
    ...baseStory.args,
  },
  parameters: {
    percy: {
      ...percyArgs({}),
      additionalSnapshots: [{ ...percyArgs({}, true) }],
    },
  },
};

export default { title: 'DatePicker', component: OriginalDatePicker } as ComponentMeta<
  typeof OriginalDatePicker
>;
