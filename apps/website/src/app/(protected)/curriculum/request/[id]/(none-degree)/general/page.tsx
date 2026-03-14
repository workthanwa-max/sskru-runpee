import { CurriculumReqGeneralView } from '@src/sections/curriculum';

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  return <CurriculumReqGeneralView activityId={id} />;
}
