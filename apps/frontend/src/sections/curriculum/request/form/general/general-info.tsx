import { Card, Flex, Text } from '@mantine/core';
import RHFRedioGroup from '@src/components/hook-form/rhf-radio-group';
import RHFTextInput from '@src/components/hook-form/rhf-text-field';
import { CODE_NAME_INPUT, CODE_NAME_RADIOS } from './constant';

export default function GeneralInfoForm() {
  return (
    <Card.Section p={'md'} px={70}>
      <RHFRedioGroup
        styles={{
          label: {
            fontSize: 16,
            color: '#D7A126',
            fontWeight: 'bold',
          },
        }}
        name={'general.type'}
        options={CODE_NAME_RADIOS}
      />
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
