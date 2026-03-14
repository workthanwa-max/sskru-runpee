import { Icon } from '@iconify/react';
import { Box, BoxProps } from '@mantine/core';
import { forwardRef } from 'react';

// Define types for the icon prop
interface Props extends BoxProps {
  icon: string; // Iconify expects a string for the icon name
  width?: number | string;
}

// eslint-disable-next-line react/display-name
const Iconify = forwardRef<SVGElement, Props>(({ icon, sx, width = 20, ...other }, ref) => (
  <Box
    ref={ref as React.Ref<SVGSVGElement>}
    component={Icon}
    icon={icon}
    sx={{ ...sx, width, height: width }}
    {...other}
  />
));

export default Iconify;
