import { Chip } from '@mantine/core';
import axiosInstance, { endpoints } from '@src/utils/axios';
import { Permission } from '@src/types/domain';

type Props = {
  permissions: Permission[];
  onClick?: (info: Permission) => void;
};

export default function PermissionChipList({ permissions, onClick }: Props) {
  const onPermissionInfo = async (info: Permission) => {
    if (!onClick) return;

    try {
      const response = await axiosInstance.get(endpoints.permission.details(info.id));
      if (response.data) {
        onClick(response.data);
      }
    } catch (error) {
      console.error('Fetch permission error:', error);
    }
  };

  return (
    <>
      {permissions.map((node) => (
        <Chip size={'xs'} checked={false} key={node.id} onClick={() => onPermissionInfo(node)}>
          {node.name}
        </Chip>
      ))}
    </>
  );
}
