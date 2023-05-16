import React from 'react';
import FamilyCard from '@/components/familyCard';

const AllFamilies = ({ data }) => {
  console.log(data);
  return data.map((item) => <div>aaaaa</div>); //<FamilyCard name='test' id='aaaaaaaa' />;
};

export async function getServerSideProps() {
  const data = [1, 2, 3];
  return { props: { data } };
}
export default AllFamilies;
