import { Alert, List } from '@mantine/core';
import { FieldErrors } from 'react-hook-form';

interface AlertFormErrorsProps {
  items: FieldErrors;
}

function RenderErrorList({ errors }: { errors: FieldErrors }) {
  return (
    <List>
      {Object.keys(errors).map((key) => {
        const error = errors[key];

        if (error && typeof error === 'object' && !('message' in error)) {
          return (
            <List.Item key={key}>
              {key}
              <List withPadding>
                <RenderErrorList errors={error as FieldErrors} />
              </List>
            </List.Item>
          );
        }

        return error && 'message' in error && typeof error.message === 'string' ? (
          <List.Item key={key}>{error.message}</List.Item>
        ) : null;
      })}
    </List>
  );
}

export default function AlertFormErrors({ items }: AlertFormErrorsProps) {
  if (!Object.values(items).length) {
    return <></>;
  }
  return (
    <Alert title="Something went wrong!" color="red">
      <RenderErrorList errors={items} />
    </Alert>
  );
}
