import Link, { LinkProps } from 'next/link';
import { forwardRef, HTMLAttributeAnchorTarget, PropsWithChildren } from 'react';

// ----------------------------------------------------------------------

// eslint-disable-next-line react/display-name
const RouterLink = forwardRef<
  HTMLAnchorElement,
  LinkProps & PropsWithChildren & { target?: HTMLAttributeAnchorTarget }
>((props, ref) => (
  <Link ref={ref} {...props}>
    {props.children}
  </Link>
));

export default RouterLink;
