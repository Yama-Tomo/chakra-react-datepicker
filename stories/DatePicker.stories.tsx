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
    const [startDate, endDate, onChange] = useBasicPropsProvide(opts);
    return (
      <OriginalDatePicker
        {...props}
        selected={startDate}
        startDate={startDate}
        endDate={endDate}
        onChange={onChange}
      />
    );
  };

const DatePicker = WithBasicProps('2022-03-09', { initialStartDate: new Date('2022-03-08') });
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
    waitForSelector: '.react-datepicker',
    queryParams: {
      props: JSON.stringify({ startOpen: true, ...args }),
      ...(isDarkMode ? { colormode: 'dark' } : {}),
    },
  };
};

type Story = ComponentStoryObj<typeof OriginalDatePicker>;
export const BasicUsage: Story = {
  render: DatePicker,
  args: argsFromQs,
  parameters: {
    percy: {
      ...percyArgs({}),
      additionalSnapshots: [{ ...percyArgs({}, true) }],
    },
  },
};

export const WithRootProps: Story = {
  ...BasicUsage,
  args: {
    rootProps: {
      w: '200px',
      p: 3,
      borderColor: 'green.600',
      borderWidth: 1,
      borderStyle: 'solid',
    },
    ...BasicUsage.args,
  },
  parameters: {
    percy: {
      ...percyArgs({}),
    },
  },
};

export const WithDatePickerSize: Story = {
  ...BasicUsage,
  args: {
    datePickerSize: 'xs',
    ...BasicUsage.args,
  },
  parameters: {
    percy: {
      ...percyArgs({}),
      additionalSnapshots: [
        ...['sm', 'md', 'xl']
          .map((datePickerSize) => [
            { suffix: `:light-${datePickerSize}`, ...percyArgs({ datePickerSize }) },
          ])
          .flat(),
      ],
    },
  },
};

export const WithResponsiveSize: Story = {
  ...BasicUsage,
  args: {
    datePickerSize: { base: 'xs', md: 'md', xl: 'xl' },
    ...BasicUsage.args,
  },
};

export const WithDatePickerColorScheme: Story = {
  ...BasicUsage,
  args: {
    datePickerColorSchema: 'red',
    ...BasicUsage.args,
  },
  parameters: {
    percy: {
      ...percyArgs({}),
      additionalSnapshots: [{ ...percyArgs({}, true) }],
    },
  },
};

export const WithInputProps: Story = {
  ...BasicUsage,
  args: {
    inputProps: {
      size: 'sm',
      variant: 'filled',
    },
    ...BasicUsage.args,
  },
};

export const WithExtendDatePickerTheme: Story = {
  ...BasicUsage,
  args: {
    extendDatePickerTheme(colorMode, theme) {
      if (colorMode === 'light') {
        return { ...theme, header: 'teal.400', outsideDay: 'red.400' };
      }

      return { ...theme, header: 'teal.600', outsideDay: 'red.600' };
    },
    ...BasicUsage.args,
  },
  parameters: {
    percy: {
      ...percyArgs({}),
      additionalSnapshots: [{ ...percyArgs({}, true) }],
    },
  },
};

export const WithPopoverPlacement: Story = {
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
    ...BasicUsage.args,
  },
  parameters: {
    percy: {
      ...percyArgs({}),
      additionalSnapshots: [{ ...percyArgs({}, true) }],
    },
  },
};

export const Disabled: Story = {
  ...BasicUsage,
  args: {
    disabled: true,
    ...BasicUsage.args,
  },
};

export const WithClearButton: Story = {
  ...BasicUsage,
  args: {
    isClearable: true,
    ...BasicUsage.args,
  },
  parameters: {
    percy: {
      ...percyArgs({}),
      additionalSnapshots: [
        { ...percyArgs({}, true) },
        ...['xs', 'sm', 'lg']
          .map((size) => [{ suffix: `:light-${size}`, ...percyArgs({ inputProps: { size } }) }])
          .flat(),
      ],
    },
  },
};

export const WithTimeSelect: Story = {
  ...BasicUsage,
  args: {
    showTimeSelect: true,
    dateFormat: 'MM/dd/yyyy h:mm aa',
    ...BasicUsage.args,
  },
  parameters: {
    percy: {
      ...percyArgs({}),
      additionalSnapshots: [{ ...percyArgs({}, true) }],
    },
  },
};

export const WithTimeInput: Story = {
  ...BasicUsage,
  args: {
    showTimeInput: true,
    customTimeInput: <Input type={'time'} />,
    dateFormat: 'MM/dd/yyyy h:mm aa',
    ...BasicUsage.args,
  },
  parameters: {
    percy: {
      ...percyArgs({}),
      additionalSnapshots: [{ ...percyArgs({}, true) }],
    },
  },
};

export const WithYearAndMonthPicker: Story = {
  ...BasicUsage,
  args: {
    ...BasicUsage.args,
    showMonthDropdown: true,
    showYearDropdown: true,
  },
  parameters: {
    percy: {
      ...percyArgs({}),
      additionalSnapshots: [{ ...percyArgs({}, true) }],
    },
  },
};

export const WithPortal: Story = {
  ...BasicUsage,
  args: {
    withPortal: true,
    ...BasicUsage.args,
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
  ...BasicUsage,
  args: {
    excludeDates: [addDays(1), addDays(2), addDays(3)],
    ...BasicUsage.args,
  },
  parameters: {
    percy: {
      ...percyArgs({}),
    },
  },
};

export const RangeDays: Story = {
  ...BasicUsage,
  args: {
    selectsRange: true,
    ...BasicUsage.args,
  },
};

export const Invalid: Story = {
  ...BasicUsage,
  args: {
    inputProps: {
      isInvalid: true,
    },
    ...BasicUsage.args,
  },
  parameters: {
    percy: {
      ...percyArgs({}),
    },
  },
};

export const InvalidWithFormControl: Story = {
  render: (props) => (
    <FormControl isInvalid isRequired>
      <FormLabel htmlFor="date">date</FormLabel>
      <DatePicker id={'date'} {...props} />
      <FormErrorMessage>example error message.</FormErrorMessage>
    </FormControl>
  ),
  args: {
    ...BasicUsage.args,
  },
};

export const WithLeftIcons: Story = {
  render: (props) => (
    <Stack spacing={'400px'}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <CalendarIcon color="gray.300" />
        </InputLeftElement>
        <DatePicker inputProps={{ paddingInlineStart: 10 }} isClearable {...props} />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>
          <CalendarIcon />
        </InputLeftAddon>
        <DatePicker
          inputProps={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          popperPlacement={'bottom-end'}
          {...props}
        />
      </InputGroup>
      <div />
    </Stack>
  ),
  args: {
    selectsRange: true,
    showTimeSelect: true,
    isClearable: true,
    excludeDates: [addDays(1), addDays(2), addDays(3)],
    dateFormat: 'MM/dd/yyyy h:mm aa',
    ...BasicUsage.args,
  },
  parameters: {
    percy: {
      ...percyArgs({}),
    },
  },
};

export default { title: 'DatePicker', component: OriginalDatePicker } as ComponentMeta<
  typeof OriginalDatePicker
>;
