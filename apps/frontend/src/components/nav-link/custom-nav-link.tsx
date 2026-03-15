import { NavLink, NavLinkProps } from '@mantine/core';
type CustomNavlinkProps = NavLinkProps & {
  isChild?: boolean;
  onClick?: VoidFunction;
};
export default function CustomNavlink({ isChild, onClick, ...props }: CustomNavlinkProps) {
  return (
    <NavLink
      {...props}
      onClick={onClick}
      variant="filled"
      color={'sskruGold'}
      sx={(theme) => ({
        borderRadius: theme.radius.md,
        transition: 'all 0.2s ease',
        fontWeight: props.active ? 800 : 500,
        color: props.active ? theme.colors.sskruGold[9] : theme.colors.gray[7],
        backgroundColor: props.active ? theme.colors.sskruGold[1] : 'transparent',
        borderLeft: props.active && !isChild ? `4px solid ${theme.colors.sskruGold[7]}` : '4px solid transparent',
        '&:hover': {
          backgroundColor: theme.colors.sskruGold[0],
          color: theme.colors.sskruGold[9],
        },
        '&[data-active]': {
          backgroundColor: theme.colors.sskruGold[1],
          color: theme.colors.sskruGold[9],
          fontWeight: 800,
          '&:hover': {
            backgroundColor: theme.colors.sskruGold[2],
          },
        },
        paddingLeft: isChild ? theme.spacing.xl : theme.spacing.md,
      })}
    />
  );
}
