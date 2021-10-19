import React from 'react';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { getLoanData, getPrimaryBorrower } from '@guaranty/services'
import ReactPDF, { Page, Text, Image, View, Document } from '@react-pdf/renderer';
import { styles } from './styles';
import { number, string } from 'prop-types';
interface Column {
  text: string;
  value: string | number | null;
}
interface RowProps {
  columnOne: Column;
  columnTwo?: Column | undefined;
}
export function LoanlockPdfTemplate() {
  const {data} = getLoanData();
  const {lender} = data;
  const {Loan} = lender;
  const {product, borrower, property, secondary, origination} = Loan;

  const primaryBorrower = getPrimaryBorrower(Loan.borrower)
  const {
    dd,
    dt,
    dl,
    col1,
    col2Data,
    col2Key,
    img,
    createdAtTag
  } = styles;
  const no = "No Field";
  const today = new Date();
  const Row = ({columnOne, columnTwo}:RowProps) => (
    <View style={dl}>
      <Text style={dt}>{columnOne.text}:</Text>
      <Text style={[dd, col1]}>{columnOne.value || 'none'}</Text>
      {columnTwo && <>
        <Text style={[dt, col2Key]}>{columnTwo?.text}:</Text>
        <Text style={[dd, col2Data]}>{columnTwo?.value || 'none'}</Text>
      </>}
    </View>
  )
  return (
    <Document title={secondary.lock_expiration_date ? 'Lock Confirmation' : 'Float Confirmation'}>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>

          <View>
            <Text style={styles.title}>
              {secondary.lock_expiration_date 
                ? 'Lock Confirmation' 
                : 'Float Confirmation'}
            </Text>
            <Image style={img} src='https://los.ghmloans.com/design/GuarantyHome/loginpage_logo.png' />
          </View>

          <View style={styles.body}>
            <View >
              <Text style={styles.sectionHeader}>Loan Information</Text>
            </View>

            <Row 
              columnOne={{text: 'Loan Number', value:Loan.loan_number }}
              columnTwo={{text: 'Product', value: product.product_description}}
            />

            <Row 
              columnOne={{text: 'Primary Borrower', value: primaryBorrower }}
              columnTwo={{text: 'Purpose', value: Loan.loan_purpose_type}}
            />

            <Row 
              columnOne={{text: 'Lien Position', value: Loan.lien_priority_type }}
              columnTwo={{text: 'Refi Purpose', value: Loan.refinance_purpose_type}}
            />

            <Row 
              columnOne={{text: 'Base Loan Amount', value: Loan.base_loan_amount }}
              columnTwo={{text: 'Front/Back DTI', value: no}}
            />

            <Row 
              columnOne={{text: 'Total Loan Amount', value: Loan.loan_amount }}
              columnTwo={{text: 'LTV', value: Loan.ltv}}
            />

            <Row 
              columnOne={{text: 'Subordinate Financing', value: Loan.subordinate_financing_amount }}
              columnTwo={{text: 'CLTV', value: Loan.cltv}}
            />

            <Row 
              columnOne={{text: 'HELOC Max Amount', value: Loan.heloc_maximum_balance_amount }}
              columnTwo={{text: 'HCLTV', value: Loan.hcltv}}
            />

            <Row 
              columnOne={{text: 'Est Closing Date', value: no }}
              columnTwo={{text: 'FICO', value: Loan.fico_calc}}
            />

            <Row 
              columnOne={{text: 'Cash Out Amt', value: Loan.refinance_cash_out_amount }}
              columnTwo={{text: 'Doc Type', value: Loan.documentation_type}}
            />

            <Row 
              columnOne={{text: 'Escrow Waiver', value: Loan.escrow_indicator || 'No Escrows Waived' }}
              columnTwo={{text: 'Mortgage Ins', value: Loan.mortgage_insurance}}
            />

            <Row 
              columnOne={{text: 'MI Coverage %', value: no }}
              columnTwo={{text: 'MI Paid By', value: no}}
            />

            <Row 
              columnOne={{text: 'Channel', value: Loan.business_channel_type }}
              columnTwo={{text: 'Rate', value: Loan.note_rate_percent.toFixed(3)}}
            />

            <View style={styles.sectionHeader}>
              <Text>Property Information</Text>
            </View>

            <Row 
              columnOne={{text: 'Subject Address', value: property.address_line_text }}
              columnTwo={{text: 'Units', value: property.financed_units_count}}
            />

            <Row columnOne={{
                text: 'Subject City, State, Zip',
                value: `${property.city_name}, ${property.state} ${property.postal_code}`
            }}
              columnTwo={{text: 'Occupancy', value: property.property_usage_type}}
            />

            <Row 
              columnOne={{text: 'Subject County', value: property.county }}
              columnTwo={{text: 'Appraisal Waiver', value: no}}
            />

            <Row columnOne={{text: 'Appraisal Value', value: property.appraised_value }}
              columnTwo={{text: 'Property Type', value: property.property_type}}
            />

            <View style={dl}>
              <Text style={dt}>Sales Price:</Text>
              <Text style={[dd, col1]}>{property.sales_contract_amount}</Text>
            </View>

            <View style={styles.sectionHeader}>
              <Text>Originator</Text>
            </View>

            <Row columnOne={{
              text: 'Originator', 
              value: `${origination.originator_first_name} ${origination.originator_last_name}` }}
              columnTwo={{text: 'Company', value: origination.origination_company_full_name}}
            />

            <Row columnOne={{
              text: 'NMLS', 
              value: origination.originator_license_id }}
            />

            <View style={styles.sectionHeader}>
              <Text>Lock Information</Text>
            </View>

            <Row columnOne={{ text: "Lock Req'd By", 
              value: `${origination.originator_first_name} ${origination.originator_last_name}` }}
              columnTwo={{ text: 'Compensation Type', value: secondary.comp_plan_type }}
            />

            <Row columnOne={{ text: "Lock Req Date", value: no }}
              columnTwo={{ text: 'Lock Period', value: secondary.lock_days }}
            />

            <Row columnOne={{ text: "Lock Confirm Date", value: no }}
              columnTwo={{ text: 'Rate Sheet Id', value: no }}
            />

            <Row columnOne={{ text: "Lock Expiration Date", value: secondary.lock_expiration_date }}
              columnTwo={{ text: 'LO Comp Amt', value: secondary.lender_paid_comp_amount }}
            />

            <Row columnOne={{ text: "Price", value: Loan.sales_price.toFixed(3) }}
              columnTwo={{ text: 'Discount Points', value: no }}
            />

            <View style={styles.sectionHeader}>
              <Text>Pricing Information</Text>
            </View>

            <View style={dl}>
              <Text style={dt}>Base Price:</Text>
              <Text style={[dd, col2Key]}>No Field</Text>
            </View>

            <View style={dl}>
              <Text style={dt}>FHA Tier Adj Loan Amount:</Text>
              <Text style={[dd, col2Key]}>No Field</Text>
            </View>

            <View style={dl}>
              <Text style={[dt]}>FHA FICO 680-699 (74775760):</Text>
              <Text style={[dd, col2Key]}>No Field</Text>
            </View>

            <View style={dl}>
              <Text style={[dt]}>Net Price</Text>
              <Text style={[dd, col2Key]}>No Field</Text>
            </View>
          </View>
        </View>

        <View style={createdAtTag}>
          <Text>Created {today.toLocaleDateString()}</Text>
        </View>

      </Page>
    </Document>
  );
}

export default LoanlockPdfTemplate;


