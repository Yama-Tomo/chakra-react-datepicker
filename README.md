# chakra react datepicker

Integration of chakra-ui and react-datepicker

[storybook](https://yama-tomo.github.io/chakra-react-datepicker/)

![screenshot](https://user-images.githubusercontent.com/4970917/158121665-c88132a3-4066-40d9-be25-cd595c795c70.png)

## getting started

```bash
yarn add @yamatomo/chakra-react-datepicker react-datepicker
```

If you use typescript, also install the following packages.

```bash
yarn add -D @types/react-datepicker
```

You also need chakra-ui. See the [docs](https://chakra-ui.com/guides/first-steps) for the installation

## usage

```tsx
import { DatePicker } from '@yamatomo/chakra-react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
// or using CSS Modules
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const Component = (props) => (
  <DatePicker {...props} />
);
```

Usage is the same as `react-datepicker`. See the [docs](https://reactdatepicker.com/) for details.

## theme

You can customize the datepicker style with `extendDatePickerTheme` props.

```tsx
<DatePicker
  extendDatePickerTheme={(colorMode, theme) => {
    if (colorMode === 'light') {
      // customize header and outside day color
      return { ...theme, header: 'pink.400', outsideDay: '#828282' };
    }

    // dark mode color
    return ...
  }}
/>  
```

### default theme

| key             | light mode value | dark mode value |
|-----------------|------------------|-----------------|
| gray100         | gray.100         | gray.700        |
| gray200         | gray.200         | gray.600        |
| gray300         | gray.300         | gray.500        |
| gray400         | gray.400         | gray.400        |
| gray500         | gray.500         | gray.400        |
| color300        | blue.300         | blue.200        |
| color500        | blue.500         | blue.300        |
| color600        | blue.600         | blue.500        |
| header          | white            | gray.700        |
| text            | gray.800         | whiteAlpha.900  |
| negativeText    | whiteAlpha.900   | whiteAlpha.900  |
| monthBackground | white            | gray.700        |
| outsideDay      | #9f9696          | #9f9696         |

## props

| name                      | type                                                                                                                                                                                                                                                                                             | description                                                                                                             |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| ...react-datepicker props | `ReactDatePickerProps`                                                                                                                                                                                                                                                                           | `react-datepicker` props<br/>(Does not support `todayButton`, will be ignored)                                          |
| rootProps                 | `undefined \| BoxProps`                                                                                                                                                                                                                                                                                       | for root element props                                                                                                  |
| inputProps                | `undefined \| Omit<InputProps, 'isDisabled' \| 'onChange'>`                                                                                                                                                                                                                                               | input props                                                                                                             |
| datePickerSize            | `undefined \| ResponsiveValue<'xs' \| 'sm' \| 'md' \| 'xl'>`                                                                                                                                                 | datepicker size.<br/>supported [responsive styles](https://chakra-ui.com/docs/styled-system/features/responsive-styles) |
| datePickerColorSchema     | `undefined \| "whiteAlpha" \| "blackAlpha" \| "gray" \| "red" \| "orange" \| "yellow" \| "green" \| "teal" \| "blue" \| "cyan" \| "purple" \| "pink" \| "linkedin" \| "facebook" \| "messenger" \| "whatsapp" \| "twitter" \| "telegram"` |                                                                                                                         |
| extendDatePickerTheme     | `undefined \| (colorMode: 'light' \| 'dark', theme: DatePickerTheme) => DatePickerTheme`                                                                                                                                                                                                                      |                                                                                                                         |


