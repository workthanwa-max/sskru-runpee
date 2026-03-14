export function defaultProps(): Record<string, any> {
  return {
    Modal: {
      defaultProps: {
        size: 'lg',
        centered: true,
      },
    },
    Card: {
      defaultProps: {
        sx: {
          overflow: 'unset !important',
        },
      },
    },
  };
}
