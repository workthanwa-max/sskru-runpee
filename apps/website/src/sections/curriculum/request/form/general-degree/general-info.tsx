import { Card, Flex, Text } from '@mantine/core';
import RHFTextInput from '@src/components/hook-form/rhf-text-field';
import { CODE_NAME_INPUT } from './constant';

export default function GeneralInfoForm() {
  return (
    <Card.Section p={'md'} px={70}>
      <Flex direction={'column'} gap={'md'} mt={'md'}>
        {CODE_NAME_INPUT.map((input, i) => (
          <Flex key={i}>
            <Text size={'sm'} w={'50%'}>
              {input.label}
            </Text>
            <RHFTextInput w={300} name={input.name} placeholder={input.label} key={i} />
          </Flex>
        ))}
      </Flex>
    </Card.Section>
  );
}
