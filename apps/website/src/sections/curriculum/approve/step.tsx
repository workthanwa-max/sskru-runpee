import { Card, Center, Grid, Text } from '@mantine/core';
import { courseImplementationSteps } from '../const';
import { CourseImplementationStep } from './types';

interface CurriculumApproveStepProps {
  tab: CourseImplementationStep;
  onTab: (tab: CourseImplementationStep) => void;
}
export default function CurriculumApproveStep({ tab, onTab }: CurriculumApproveStepProps) {
  return (
    <Grid my={'md'} grow>
      {Array.from(courseImplementationSteps.keys()).map((step) => (
        <Grid.Col key={step} span={12} sm={6} lg={2}>
          <Card
            bg={tab === step ? '#fbf4e5' : undefined}
            sx={{ border: '1px solid #D19509' }}
            onClick={() => onTab(step)}
          >
            <Center h="100%" sx={{ cursor: 'pointer' }}>
              <Text style={{ fontSize: '1rem', textAlign: 'center' }} weight={'bold'} color="#D19509">
                {courseImplementationSteps.get(step)?.label}
              </Text>
            </Center>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}
