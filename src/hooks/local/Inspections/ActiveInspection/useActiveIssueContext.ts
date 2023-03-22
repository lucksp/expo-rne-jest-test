import { useContext } from 'react';

import { ActiveIssueContext } from './ActiveIssueProvider';

export function useActiveIssueContext() {
  const context = useContext(ActiveIssueContext);

  if (context === undefined) {
    throw new Error('useActiveIssueContext needs to be used within an ActiveIssueProvider');
  }
  return context;
}
