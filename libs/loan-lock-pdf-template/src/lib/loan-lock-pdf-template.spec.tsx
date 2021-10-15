import { render } from '@testing-library/react';

import LoanLockPdfTemplate from './loan-lock-pdf-template';

describe('LoanLockPdfTemplate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LoanLockPdfTemplate />);
    expect(baseElement).toBeTruthy();
  });
});
