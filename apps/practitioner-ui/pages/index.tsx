import { withAuth } from '@practitionermanagement/utils';
import React from 'react';

const index = () => {
  return <div>index</div>;
};

export default withAuth(index);
