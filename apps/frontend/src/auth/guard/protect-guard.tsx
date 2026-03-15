import { paths } from '@src/routes/paths';
import { RoleType } from '@src/types/domain';
import { redirect } from 'next/navigation';
import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  rootPath: string;
  withRedirect?: boolean;
};

export default function ProtectURLGuard({ children, rootPath, withRedirect = false }: Props) {
  const { user } = useAuthContext();

  const can =
    user?.roles.includes(RoleType.ADMIN) || user?.systemUrls.some((url) => url.indexOf(rootPath.slice(1)) > -1);
  console.log({ can, rootPath, user });

  if (can) {
    return children;
  }

  if (withRedirect) {
    return redirect(paths.home);
  }

  return <></>;
}
