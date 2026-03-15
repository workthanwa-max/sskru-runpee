import AddressInput from './inputs/address-input';
import ParentInput from './inputs/parent-input';

export default function ParentInfoForm() {
  return (
    <>
      <ParentInput prefixInputObjectName="parentInfo" guardianType={'father'} />
      <ParentInput prefixInputObjectName="parentInfo" guardianType={'mother'} />
      <ParentInput prefixInputObjectName="parentInfo" guardianType={'guardian'} />
      <AddressInput prefixInputObjectName="parentInfo.address" />
    </>
  );
}
