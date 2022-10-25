import { withAuth } from '@practitionermanagement/utils';
import React from 'react';

const index = () => {
  return <div>Landing Page</div>;
};

export default withAuth(index);
