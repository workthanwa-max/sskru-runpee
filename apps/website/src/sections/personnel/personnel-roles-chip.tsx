import { ActionIcon, Chip, Loader } from '@mantine/core';
import Iconify from '@src/components/iconify';
import { useRestQuery } from '@src/hooks/use-rest';
import { Role } from '@src/types/domain';
import { endpoints } from '@src/utils/axios';
import { useState } from 'react';
import { ModalPersonnelRolesForm } from './personnel-roles-form';

type Props = {
  personnelId: string;
};

export default function PersonnelRoles({ personnelId }: Props) {
  const [editRole, setEditRole] = useState<{ personnelId: string; roleIds: string[] } | null>(null);
  const { data: roles, loading } = useRestQuery<Role[]>(`${endpoints.role.list}?identityId=${personnelId}`);

  if (loading) {
    return <Loader size="xs" />;
  }

  const roleList = roles ?? [];

  return (
    <>
      <ModalPersonnelRolesForm
        item={editRole}
        opened={!!editRole}
        onClose={() => setEditRole(null)}
      />
      {roleList.map((role) => (
        <PersonnelRoleChip
          key={role.id}
          role={role}
          onClick={() => {
            //
          }}
        />
      ))}
      <ActionIcon
        radius={'xl'}
        color="gray"
        size={'sm'}
        variant="subtle"
        onClick={() => setEditRole({ personnelId, roleIds: roleList.map((r) => r.id) })}
      >
        <Iconify icon="tabler:edit" width={16} />
      </ActionIcon>
    </>
  );
}

function PersonnelRoleChip({ role, onClick }: { role: Role; onClick: VoidFunction }) {
  return (
    <Chip size={'xs'} checked={false} key={role.id} onClick={onClick}>
      {role.name}
    </Chip>
  );
}
