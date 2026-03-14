import { Card } from '@mantine/core';
import RHFRedioGroup from '@src/components/hook-form/rhf-radio-group';
import { MODEL_RADIOS, TYPE_RADIOS } from './constant';

export default function GeneralModelSection() {
  return (
    <>
      <Card.Section p={'md'} px={70}>
        <RHFRedioGroup
          styles={{
            label: {
              fontSize: 16,
              color: '#D7A126',
              fontWeight: 'bold',
            },
          }}
          name={'model'}
          label={'รูปแบบ'}
          options={MODEL_RADIOS}
          vertical
        />
      </Card.Section>
      <Card.Section p={'md'} px={70}>
        <RHFRedioGroup
          styles={{
            label: {
              fontSize: 16,
              color: '#D7A126',
              fontWeight: 'bold',
            },
          }}
          name={'type'}
          label={'ประเภทของหลักสูตร'}
          options={TYPE_RADIOS}
          vertical
        />
      </Card.Section>
    </>
  );
}
