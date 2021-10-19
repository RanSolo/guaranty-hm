/* eslint-disable-next-line */
import { payload } from './payload'

interface Item {
  isprimary: boolean;
  borrower_sort: null;
  borrower_id: null;
  last_name: string,
  first_name: string
  }

interface Borrower {
  item: Item[]
}

export const getLoanData = () => {
  console.log('payload', payload);
  
    return payload;
};
export const getPrimaryBorrower = (borrower:Borrower) => {
    let primaryBorrower = ''

    borrower.item.forEach((i) => {
      if (i.isprimary) primaryBorrower = `${i.first_name}  ${i.last_name}`
    })
    return primaryBorrower;
};

