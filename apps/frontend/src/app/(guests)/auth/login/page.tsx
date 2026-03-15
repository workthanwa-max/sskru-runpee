'use client';
import { Box, Stack, Text } from '@mantine/core';
import { RouterLink } from '@src/routes/components';
import { useSearchParams } from '@src/routes/hooks';
import { paths } from '@src/routes/paths';
import { JwtLoginView } from '@src/sections/auth/jwt';

export default function Page() {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');

  return (
    <Stack align="center">
      <JwtLoginView />
      {returnTo === paths.admission.root && (
        <Box sx={{ width: 500 }}>
          <Text component={RouterLink} href={paths.admission.register} underline color="indigo">
            ลงทะเบียนผู้สมัคร
          </Text>
        </Box>
      )}
    </Stack>
  );
}
