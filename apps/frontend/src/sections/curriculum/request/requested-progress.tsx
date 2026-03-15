/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button, Card, Menu, Stepper } from '@mantine/core';
import { Activity } from '@src/types/domain';
import { courseImplementationSteps } from '../const';

type CurriculumSectionProgressProps = {
  item: Activity;
};
export default function RequestedProgress({ item }: CurriculumSectionProgressProps) {
  return (
    <Menu withArrow width={200} offset={0} position="bottom-end">
      <Menu.Target>
        <Button variant="subtle">{courseImplementationSteps.get(item.step as any)?.label}</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Card>
          <Stepper
            size="xs"
            active={courseImplementationSteps.get(item.step as any)!.order}
            orientation="vertical"
          >
            {Array.from(courseImplementationSteps.keys()).map((step, i) => (
              <Stepper.Step
                label={`Step ${i + 1}`}
                key={step}
                value={step}
                description={courseImplementationSteps.get(step)?.label}
              />
            ))}
          </Stepper>
        </Card>
      </Menu.Dropdown>
    </Menu>
  );
}
