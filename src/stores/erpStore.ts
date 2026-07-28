import { defineStore } from 'pinia'

export interface NavItem {
  key: string
  label: string
  path?: string
}

export interface NavGroup {
  title: string
  icon: string
  items: NavItem[]
}

export interface ModuleField {
  key: string
  label: string
  type?: 'text' | 'number' | 'date' | 'select' | 'textarea'
  options?: string[]
  required?: boolean
}

export interface ModuleColumn {
  key: string
  label: string
  format?: 'status' | 'currency' | 'number0' | 'total' | 'quantity'
  type?: string
  required?: boolean
}

export interface ModuleConfig {
  type: 'master' | 'workflow' | 'document' | 'gatepass' | 'voucher' | 'journal' | 'report' | 'analytics' | 'settings'
  title: string
  entity?: string
  dataset?: string
  fields?: ModuleField[]
  columns?: ModuleColumn[]
  stages?: string[]
  direction?: 'sales' | 'purchase' | 'payment' | 'receipt'
  taxMode?: 'tax' | 'nonTax'
  partyDataset?: string
  prefix?: string
  convertActions?: string[]
  mode?: 'bank' | 'cash'
  reportType?: string
}

export interface CompanyInfo {
  name: string
  shortName: string
  address: string
  phone: string
  ntn: string
  strn: string
  financialYear: string
  currency: string
  theme: string
}

const STORAGE_KEY = 'pure-petroleum-erp-offline-v3'

export const ERP_BOOTSTRAP = {
  navGroups: [
    {
      title: 'Overview',
      icon: '◫',
      items: [{ key: 'dashboard', label: 'Dashboard', path: '/dashboard' }]
    },
    {
      title: 'Master Data',
      icon: '◆',
      items: [
        { key: 'customers', label: 'Customers & Dealers' },
        { key: 'vendors', label: 'Vendors & Suppliers' },
        { key: 'items', label: 'Products & Materials' },
        { key: 'depots', label: 'Depots & Terminals' },
        { key: 'outlets', label: 'Retail Outlets' },
        { key: 'vehicles', label: 'Tankers & Vehicles' },
        { key: 'drivers', label: 'Drivers' },
        { key: 'employees', label: 'Employees' }
      ]
    },
    {
      title: 'SD · Sales & Distribution',
      icon: '↗',
      items: [
        { key: 'salesQuotations', label: 'Sales Quotations' },
        { key: 'salesOrders', label: 'Sales Orders' },
        { key: 'deliveryChallans', label: 'Delivery Challans' },
        { key: 'outwardGatePasses', label: 'Outward Gate Passes' },
        { key: 'salesTaxInvoices', label: 'Sales Tax Invoices' },
        { key: 'salesNonTaxInvoices', label: 'Sales Invoices (Non Tax)' },
        { key: 'pricing', label: 'Pricing & Margins' },
        { key: 'creditControls', label: 'Dealer Credit Control' },
        { key: 'salesReport', label: 'Sales Reports' }
      ]
    },
    {
      title: 'MM · Materials Management',
      icon: '▦',
      items: [
        { key: 'purchaseRequisitions', label: 'Purchase Requisitions' },
        { key: 'rfqs', label: 'Requests for Quotation' },
        { key: 'purchaseOrders', label: 'Purchase Orders' },
        { key: 'inwardGatePasses', label: 'Inward Gate Passes' },
        { key: 'purchasesSalesTax', label: 'Purchases (Sales Tax)' },
        { key: 'purchasesNonTax', label: 'Purchases (Non Tax)' },
        { key: 'goodsReceipts', label: 'Goods Receipt Notes' },
        { key: 'stockTransfers', label: 'Stock Transfers' },
        { key: 'stockAdjustments', label: 'Stock Adjustments' },
        { key: 'inventoryBalance', label: 'Inventory Balance' },
        { key: 'inventoryLedger', label: 'Inventory Ledgers' },
        { key: 'purchaseReport', label: 'Purchase Reports' }
      ]
    },
    {
      title: 'FI · Financial Accounting',
      icon: '₨',
      items: [
        { key: 'chartOfAccounts', label: 'Chart of Accounts' },
        { key: 'journalVouchers', label: 'Journal Vouchers' },
        { key: 'bankPayments', label: 'Bank Payments' },
        { key: 'bankReceipts', label: 'Bank Receipts' },
        { key: 'cashPayments', label: 'Cash Payments' },
        { key: 'cashReceipts', label: 'Cash Receipts' },
        { key: 'accountsLedger', label: 'Accounts Ledger' },
        { key: 'customerBalance', label: 'Customer Balance' },
        { key: 'vendorBalance', label: 'Vendor Balance' },
        { key: 'trialBalance', label: 'Trial Balance' },
        { key: 'profitLoss', label: 'Profit & Loss' },
        { key: 'balanceSheet', label: 'Balance Sheet' }
      ]
    },
    {
      title: 'CO · Controlling',
      icon: '◎',
      items: [
        { key: 'costCenters', label: 'Cost Centres' },
        { key: 'profitCenters', label: 'Profit Centres' },
        { key: 'budgets', label: 'Budgets' },
        { key: 'costAllocations', label: 'Cost Allocations' },
        { key: 'budgetVariance', label: 'Budget vs Actual' },
        { key: 'profitability', label: 'Product & Depot Profitability' }
      ]
    },
    {
      title: 'Import Management',
      icon: '⌁',
      items: [
        { key: 'importContracts', label: 'Import Contracts' },
        { key: 'lettersOfCredit', label: 'Letters of Credit' },
        { key: 'shipments', label: 'Shipment Tracking' },
        { key: 'clearingCosts', label: 'Customs & Clearing Costs' },
        { key: 'landedCosts', label: 'Landed Cost Allocation' },
        { key: 'importDocuments', label: 'Import Documents' }
      ]
    },
    {
      title: 'OMC Operations',
      icon: '◉',
      items: [
        { key: 'tanks', label: 'Depot Tanks' },
        { key: 'tankerDispatches', label: 'Tanker Dispatches' },
        { key: 'dipReadings', label: 'Daily Dip Readings' },
        { key: 'tankReconciliation', label: 'Tank Reconciliation' },
        { key: 'productMovements', label: 'Product Movements' },
        { key: 'lossGainAnalysis', label: 'Loss / Gain Analysis' },
        { key: 'priceNotifications', label: 'Price Notifications' }
      ]
    },
    {
      title: 'Administration',
      icon: '⚙',
      items: [
        { key: 'users', label: 'Users & Roles' },
        { key: 'approvals', label: 'Approval Workflows' },
        { key: 'auditTrail', label: 'Audit Trail' },
        { key: 'companySettings', label: 'Company Settings' }
      ]
    }
  ] as NavGroup[],

  moduleConfigs: {
    customers: {
      type: 'master',
      title: 'Customers & Dealers',
      entity: 'Customer',
      dataset: 'customers',
      fields: [
        { key: 'code', label: 'Dealer Code', required: true },
        { key: 'name', label: 'Dealer / Customer Name', required: true },
        { key: 'type', label: 'Customer Type', type: 'select', options: ['Retail Dealer', 'Bulk Commercial', 'Distributor', 'Walk-in Cash'] },
        { key: 'region', label: 'Main Region', type: 'select', options: ['Karachi', 'Lahore', 'Central Punjab', 'North', 'South Punjab', 'Balochistan'] },
        { key: 'address', label: 'Address', type: 'textarea' },
        { key: 'phone', label: 'Telephone' },
        { key: 'contactPerson', label: 'Contact Person' },
        { key: 'ntn', label: 'NTN' },
        { key: 'strn', label: 'STRN' },
        { key: 'creditLimit', label: 'Credit Limit', type: 'number' },
        { key: 'balance', label: 'Current Balance', type: 'number' },
        { key: 'status', label: 'Status', type: 'select', options: ['Active', 'On Hold', 'Suspended'] }
      ],
      columns: [
        { key: 'code', label: 'Code' },
        { key: 'name', label: 'Customer / Dealer' },
        { key: 'type', label: 'Type' },
        { key: 'region', label: 'Region' },
        { key: 'phone', label: 'Telephone' },
        { key: 'creditLimit', label: 'Credit Limit', format: 'currency' },
        { key: 'balance', label: 'Balance', format: 'currency' },
        { key: 'status', label: 'Status', format: 'status' }
      ]
    },
    vendors: {
      type: 'master',
      title: 'Vendors & Suppliers',
      entity: 'Vendor',
      dataset: 'vendors',
      fields: [
        { key: 'code', label: 'Vendor Code', required: true },
        { key: 'name', label: 'Vendor / Supplier Name', required: true },
        { key: 'type', label: 'Vendor Type', type: 'select', options: ['Petroleum Supplier', 'Transport Contractor', 'Clearing Agent', 'Service Provider', 'Equipment Supplier'] },
        { key: 'address', label: 'Address', type: 'textarea' },
        { key: 'phone', label: 'Telephone' },
        { key: 'contactPerson', label: 'Contact Person' },
        { key: 'ntn', label: 'NTN' },
        { key: 'strn', label: 'STRN' },
        { key: 'paymentTerms', label: 'Payment Terms' },
        { key: 'balance', label: 'Current Balance', type: 'number' },
        { key: 'status', label: 'Status', type: 'select', options: ['Active', 'On Hold', 'Blocked'] }
      ],
      columns: [
        { key: 'code', label: 'Code' },
        { key: 'name', label: 'Vendor / Supplier' },
        { key: 'type', label: 'Type' },
        { key: 'phone', label: 'Telephone' },
        { key: 'paymentTerms', label: 'Terms' },
        { key: 'balance', label: 'Balance', format: 'currency' },
        { key: 'status', label: 'Status', format: 'status' }
      ]
    },
    items: {
      type: 'master',
      title: 'Products & Materials',
      entity: 'Product',
      dataset: 'items',
      fields: [
        { key: 'code', label: 'Item Code', required: true },
        { key: 'description', label: 'Description', required: true },
        { key: 'category', label: 'Category', type: 'select', options: ['Motor Spirit', 'High Speed Diesel', 'HOBC', 'Kerosene', 'Furnace Oil', 'Lubricants', 'Consumables'] },
        { key: 'unit', label: 'Unit', type: 'select', options: ['Ltr', 'MT', 'Drum', 'Carton', 'Pcs'] },
        { key: 'salesRate', label: 'Sales Rate', type: 'number' },
        { key: 'purchaseRate', label: 'Purchase Rate', type: 'number' },
        { key: 'taxRate', label: 'Sales Tax %', type: 'number' },
        { key: 'furtherTaxRate', label: 'Further Tax %', type: 'number' },
        { key: 'reorderLevel', label: 'Reorder Level', type: 'number' },
        { key: 'stock', label: 'Current Stock', type: 'number' },
        { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] }
      ],
      columns: [
        { key: 'code', label: 'Code' },
        { key: 'description', label: 'Product / Material' },
        { key: 'category', label: 'Category' },
        { key: 'unit', label: 'Unit' },
        { key: 'salesRate', label: 'Sales Rate', format: 'currency' },
        { key: 'purchaseRate', label: 'Purchase Rate', format: 'currency' },
        { key: 'stock', label: 'Stock' },
        { key: 'status', label: 'Status', format: 'status' }
      ]
    },
    depots: {
      type: 'master',
      title: 'Depots & Terminals',
      entity: 'Depot',
      dataset: 'depots',
      fields: [
        { key: 'code', label: 'Depot Code', required: true },
        { key: 'name', label: 'Depot / Terminal Name', required: true },
        { key: 'city', label: 'City' },
        { key: 'address', label: 'Address', type: 'textarea' },
        { key: 'manager', label: 'Depot Manager' },
        { key: 'phone', label: 'Telephone' },
        { key: 'capacity', label: 'Total Capacity (Ltr)', type: 'number' },
        { key: 'status', label: 'Status', type: 'select', options: ['Operational', 'Maintenance', 'Inactive'] }
      ],
      columns: [
        { key: 'code', label: 'Code' },
        { key: 'name', label: 'Depot / Terminal' },
        { key: 'city', label: 'City' },
        { key: 'manager', label: 'Manager' },
        { key: 'capacity', label: 'Capacity (Ltr)', format: 'number0' },
        { key: 'status', label: 'Status', format: 'status' }
      ]
    },
    outlets: {
      type: 'master',
      title: 'Retail Outlets',
      entity: 'Retail Outlet',
      dataset: 'outlets',
      fields: [
        { key: 'code', label: 'Outlet Code', required: true },
        { key: 'name', label: 'Outlet Name', required: true },
        { key: 'dealer', label: 'Dealer' },
        { key: 'city', label: 'City' },
        { key: 'address', label: 'Address', type: 'textarea' },
        { key: 'phone', label: 'Telephone' },
        { key: 'commissioningDate', label: 'Commissioning Date', type: 'date' },
        { key: 'monthlyVolume', label: 'Monthly Volume (Ltr)', type: 'number' },
        { key: 'status', label: 'Status', type: 'select', options: ['Operational', 'Under Renovation', 'Planned', 'Suspended'] }
      ],
      columns: [
        { key: 'code', label: 'Code' },
        { key: 'name', label: 'Retail Outlet' },
        { key: 'dealer', label: 'Dealer' },
        { key: 'city', label: 'City' },
        { key: 'monthlyVolume', label: 'Monthly Volume', format: 'number0' },
        { key: 'status', label: 'Status', format: 'status' }
      ]
    },
    vehicles: {
      type: 'master',
      title: 'Tankers & Vehicles',
      entity: 'Vehicle',
      dataset: 'vehicles',
      fields: [
        { key: 'registration', label: 'Registration No.', required: true },
        { key: 'type', label: 'Vehicle Type', type: 'select', options: ['Oil Tanker', 'Lube Delivery Truck', 'Pool Car'] },
        { key: 'capacity', label: 'Capacity (Ltr)', type: 'number' },
        { key: 'transporter', label: 'Transport Contractor' },
        { key: 'trackerId', label: 'Tracker ID' },
        { key: 'fitnessExpiry', label: 'Fitness Expiry', type: 'date' },
        { key: 'status', label: 'Status', type: 'select', options: ['Available', 'In Transit', 'Maintenance', 'Blocked'] }
      ],
      columns: [
        { key: 'registration', label: 'Registration' },
        { key: 'type', label: 'Type' },
        { key: 'capacity', label: 'Capacity', format: 'number0' },
        { key: 'transporter', label: 'Transporter' },
        { key: 'trackerId', label: 'Tracker' },
        { key: 'status', label: 'Status', format: 'status' }
      ]
    },
    drivers: {
      type: 'master',
      title: 'Drivers',
      entity: 'Driver',
      dataset: 'drivers',
      fields: [
        { key: 'code', label: 'Driver Code', required: true },
        { key: 'name', label: 'Driver Name', required: true },
        { key: 'cnic', label: 'CNIC' },
        { key: 'phone', label: 'Mobile' },
        { key: 'license', label: 'Driving Licence' },
        { key: 'licenseExpiry', label: 'Licence Expiry', type: 'date' },
        { key: 'transporter', label: 'Transporter' },
        { key: 'status', label: 'Status', type: 'select', options: ['Active', 'On Trip', 'On Leave', 'Blocked'] }
      ],
      columns: [
        { key: 'code', label: 'Driver Code' },
        { key: 'name', label: 'Driver Name' },
        { key: 'cnic', label: 'CNIC' },
        { key: 'phone', label: 'Mobile' },
        { key: 'license', label: 'Licence' },
        { key: 'transporter', label: 'Transporter' },
        { key: 'status', label: 'Status', format: 'status' }
      ]
    },
    employees: {
      type: 'master',
      title: 'Employees',
      entity: 'Employee',
      dataset: 'employees',
      fields: [
        { key: 'code', label: 'Employee Code', required: true },
        { key: 'name', label: 'Employee Name', required: true },
        { key: 'department', label: 'Department', type: 'select', options: ['Finance', 'Sales', 'Supply Chain', 'Depot Operations', 'Imports', 'IT', 'Administration'] },
        { key: 'designation', label: 'Designation' },
        { key: 'location', label: 'Location' },
        { key: 'phone', label: 'Mobile' },
        { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] }
      ],
      columns: [
        { key: 'code', label: 'Code' },
        { key: 'name', label: 'Name' },
        { key: 'department', label: 'Department' },
        { key: 'designation', label: 'Designation' },
        { key: 'location', label: 'Location' },
        { key: 'phone', label: 'Mobile' },
        { key: 'status', label: 'Status', format: 'status' }
      ]
    },
    chartOfAccounts: {
      type: 'master',
      title: 'Chart of Accounts',
      entity: 'Account',
      dataset: 'chartOfAccounts',
      fields: [
        { key: 'code', label: 'Account Code', required: true },
        { key: 'name', label: 'Account Name', required: true },
        { key: 'group', label: 'Account Group', type: 'select', options: ['Assets', 'Liabilities', 'Equity', 'Revenue', 'Cost of Sales', 'Operating Expense', 'Tax'] },
        { key: 'type', label: 'Account Type', type: 'select', options: ['Control', 'Detail', 'Bank', 'Cash', 'Customer', 'Vendor', 'Inventory'] },
        { key: 'openingDebit', label: 'Opening Debit', type: 'number' },
        { key: 'openingCredit', label: 'Opening Credit', type: 'number' },
        { key: 'balance', label: 'Current Balance', type: 'number' },
        { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Blocked'] }
      ],
      columns: [
        { key: 'code', label: 'Account Code' },
        { key: 'name', label: 'Account Name' },
        { key: 'group', label: 'Group' },
        { key: 'type', label: 'Type' },
        { key: 'openingDebit', label: 'Opening Debit', format: 'currency' },
        { key: 'openingCredit', label: 'Opening Credit', format: 'currency' },
        { key: 'balance', label: 'Balance', format: 'currency' }
      ]
    },
    costCenters: {
      type: 'master',
      title: 'Cost Centres',
      entity: 'Cost Centre',
      dataset: 'costCenters',
      fields: [
        { key: 'code', label: 'Cost Centre Code', required: true },
        { key: 'name', label: 'Cost Centre Name', required: true },
        { key: 'manager', label: 'Responsible Manager' },
        { key: 'location', label: 'Location' },
        { key: 'annualBudget', label: 'Annual Budget', type: 'number' },
        { key: 'actual', label: 'Actual Spend', type: 'number' },
        { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] }
      ],
      columns: [
        { key: 'code', label: 'Code' },
        { key: 'name', label: 'Cost Centre' },
        { key: 'manager', label: 'Manager' },
        { key: 'annualBudget', label: 'Budget', format: 'currency' },
        { key: 'actual', label: 'Actual', format: 'currency' },
        { key: 'status', label: 'Status', format: 'status' }
      ]
    },
    profitCenters: {
      type: 'master',
      title: 'Profit Centres',
      entity: 'Profit Centre',
      dataset: 'profitCenters',
      fields: [
        { key: 'code', label: 'Profit Centre Code', required: true },
        { key: 'name', label: 'Profit Centre Name', required: true },
        { key: 'manager', label: 'Responsible Manager' },
        { key: 'revenue', label: 'Revenue', type: 'number' },
        { key: 'cost', label: 'Cost', type: 'number' },
        { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] }
      ],
      columns: [
        { key: 'code', label: 'Code' },
        { key: 'name', label: 'Profit Centre' },
        { key: 'manager', label: 'Manager' },
        { key: 'revenue', label: 'Revenue', format: 'currency' },
        { key: 'cost', label: 'Cost', format: 'currency' },
        { key: 'status', label: 'Status', format: 'status' }
      ]
    },
    tanks: {
      type: 'master',
      title: 'Depot Tanks',
      entity: 'Tank',
      dataset: 'tanks',
      fields: [
        { key: 'code', label: 'Tank Code', required: true },
        { key: 'depot', label: 'Depot', required: true },
        { key: 'product', label: 'Product' },
        { key: 'capacity', label: 'Safe Capacity (Ltr)', type: 'number' },
        { key: 'bookStock', label: 'Book Stock (Ltr)', type: 'number' },
        { key: 'dipStock', label: 'Dip Stock (Ltr)', type: 'number' },
        { key: 'temperature', label: 'Temperature °C', type: 'number' },
        { key: 'status', label: 'Status', type: 'select', options: ['Operational', 'Maintenance', 'Isolated'] }
      ],
      columns: [
        { key: 'code', label: 'Tank' },
        { key: 'depot', label: 'Depot' },
        { key: 'product', label: 'Product' },
        { key: 'capacity', label: 'Capacity', format: 'number0' },
        { key: 'bookStock', label: 'Book Stock', format: 'number0' },
        { key: 'dipStock', label: 'Dip Stock', format: 'number0' },
        { key: 'status', label: 'Status', format: 'status' }
      ]
    },
    salesTaxInvoices: {
      type: 'document',
      title: 'Sales Tax Invoices',
      dataset: 'salesTaxInvoices',
      entity: 'Sales Tax Invoice',
      direction: 'sales',
      taxMode: 'tax',
      partyDataset: 'customers',
      prefix: 'STI',
      convertActions: ['deliveryChallans', 'outwardGatePasses']
    },
    salesNonTaxInvoices: {
      type: 'document',
      title: 'Sale Invoices (Non Tax)',
      dataset: 'salesNonTaxInvoices',
      entity: 'Sale Invoice',
      direction: 'sales',
      taxMode: 'nonTax',
      partyDataset: 'customers',
      prefix: 'SNI',
      convertActions: ['deliveryChallans', 'outwardGatePasses']
    },
    purchasesSalesTax: {
      type: 'document',
      title: 'Purchases (Sales Tax)',
      dataset: 'purchasesSalesTax',
      entity: 'Purchase Invoice',
      direction: 'purchase',
      taxMode: 'tax',
      partyDataset: 'vendors',
      prefix: 'PTI',
      convertActions: []
    },
    purchasesNonTax: {
      type: 'document',
      title: 'Purchases (Non Tax)',
      dataset: 'purchasesNonTax',
      entity: 'Purchase Invoice',
      direction: 'purchase',
      taxMode: 'nonTax',
      partyDataset: 'vendors',
      prefix: 'PNI',
      convertActions: []
    },
    deliveryChallans: {
      type: 'gatepass',
      title: 'Delivery Challans',
      dataset: 'deliveryChallans',
      entity: 'Delivery Challan',
      direction: 'sales',
      partyDataset: 'customers',
      prefix: 'DC',
      convertActions: ['salesTaxInvoices', 'salesNonTaxInvoices', 'outwardGatePasses']
    },
    inwardGatePasses: {
      type: 'gatepass',
      title: 'Inward Gate Passes',
      dataset: 'inwardGatePasses',
      entity: 'Inward Gate Pass',
      direction: 'purchase',
      partyDataset: 'vendors',
      prefix: 'IGP',
      convertActions: ['purchasesSalesTax', 'purchasesNonTax']
    },
    outwardGatePasses: {
      type: 'gatepass',
      title: 'Outward Gate Passes',
      dataset: 'outwardGatePasses',
      entity: 'Outward Gate Pass',
      direction: 'sales',
      partyDataset: 'customers',
      prefix: 'OGP',
      convertActions: ['salesTaxInvoices', 'salesNonTaxInvoices']
    },
    bankPayments: {
      type: 'voucher',
      title: 'Bank Payments',
      dataset: 'bankPayments',
      entity: 'Bank Payment',
      direction: 'payment',
      mode: 'bank',
      partyDataset: 'vendors',
      prefix: 'BPV'
    },
    bankReceipts: {
      type: 'voucher',
      title: 'Bank Receipts',
      dataset: 'bankReceipts',
      entity: 'Bank Receipt',
      direction: 'receipt',
      mode: 'bank',
      partyDataset: 'customers',
      prefix: 'BRV'
    },
    cashPayments: {
      type: 'voucher',
      title: 'Cash Payments',
      dataset: 'cashPayments',
      entity: 'Cash Payment',
      direction: 'payment',
      mode: 'cash',
      partyDataset: 'vendors',
      prefix: 'CPV'
    },
    cashReceipts: {
      type: 'voucher',
      title: 'Cash Receipts',
      dataset: 'cashReceipts',
      entity: 'Cash Receipt',
      direction: 'receipt',
      mode: 'cash',
      partyDataset: 'customers',
      prefix: 'CRV'
    },
    journalVouchers: {
      type: 'journal',
      title: 'Journal Vouchers',
      dataset: 'journalVouchers',
      entity: 'Journal Voucher',
      prefix: 'JV'
    },
    salesQuotations: {
      type: 'workflow',
      title: 'Sales Quotations',
      entity: 'Sales Quotation',
      dataset: 'salesQuotations',
      fields: [
        { key: 'number', label: 'Quotation No.', required: true },
        { key: 'date', label: 'Date', type: 'date' },
        { key: 'customer', label: 'Customer / Dealer', required: true },
        { key: 'product', label: 'Product' },
        { key: 'quantity', label: 'Quantity (Ltr)', type: 'number' },
        { key: 'rate', label: 'Rate / Ltr', type: 'number' },
        { key: 'validUntil', label: 'Valid Until', type: 'date' },
        { key: 'status', label: 'Status', type: 'select', options: ['Draft', 'Submitted', 'Approved', 'Converted', 'Expired'] }
      ],
      columns: [
        { key: 'number', label: 'Quotation No.' },
        { key: 'date', label: 'Date' },
        { key: 'customer', label: 'Customer / Dealer' },
        { key: 'product', label: 'Product' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'rate', label: 'Rate', format: 'currency' },
        { key: 'status', label: 'Status', format: 'status' }
      ],
      stages: ['Draft', 'Submitted', 'Approved', 'Converted']
    },
    salesOrders: {
      type: 'workflow',
      title: 'Sales Orders',
      entity: 'Sales Order',
      dataset: 'salesOrders',
      fields: [
        { key: 'number', label: 'Sales Order No.', required: true },
        { key: 'date', label: 'Date', type: 'date' },
        { key: 'customer', label: 'Customer / Dealer', required: true },
        { key: 'depot', label: 'Supply Depot' },
        { key: 'product', label: 'Product' },
        { key: 'quantity', label: 'Quantity (Ltr)', type: 'number' },
        { key: 'rate', label: 'Rate / Ltr', type: 'number' },
        { key: 'creditStatus', label: 'Credit Check', type: 'select', options: ['Passed', 'Override Required', 'Blocked'] },
        { key: 'deliveryDate', label: 'Delivery Date', type: 'date' },
        { key: 'status', label: 'Status', type: 'select', options: ['Draft', 'Credit Checked', 'Approved', 'Dispatched', 'Invoiced', 'Cancelled'] }
      ],
      columns: [
        { key: 'number', label: 'Sales Order' },
        { key: 'date', label: 'Date' },
        { key: 'customer', label: 'Customer' },
        { key: 'depot', label: 'Depot' },
        { key: 'product', label: 'Product' },
        { key: 'quantity', label: 'Qty (Ltr)', format: 'number0' },
        { key: 'creditStatus', label: 'Credit Check', format: 'status' },
        { key: 'status', label: 'Status', format: 'status' }
      ],
      stages: ['Draft', 'Credit Checked', 'Approved', 'Dispatched', 'Invoiced']
    },
    pricing: {
      type: 'master',
      title: 'Pricing & Margins',
      entity: 'Price Record',
      dataset: 'pricing',
      fields: [
        { key: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
        { key: 'product', label: 'Product', required: true },
        { key: 'exDepotPrice', label: 'Ex-Depot Price / Ltr', type: 'number' },
        { key: 'dealerMargin', label: 'Dealer Margin / Ltr', type: 'number' },
        { key: 'freight', label: 'Freight / Ltr', type: 'number' },
        { key: 'retailPrice', label: 'Retail Price / Ltr', type: 'number' },
        { key: 'status', label: 'Status', type: 'select', options: ['Current', 'Superseded', 'Draft'] }
      ],
      columns: [
        { key: 'effectiveDate', label: 'Effective Date' },
        { key: 'product', label: 'Product' },
        { key: 'exDepotPrice', label: 'Ex-Depot Price / Ltr', format: 'currency' },
        { key: 'dealerMargin', label: 'Dealer Margin / Ltr', format: 'currency' },
        { key: 'freight', label: 'Freight / Ltr', format: 'currency' },
        { key: 'retailPrice', label: 'Retail Price / Ltr', format: 'currency' },
        { key: 'status', label: 'Status', format: 'status' }
      ]
    },
    creditControls: {
      type: 'master',
      title: 'Dealer Credit Control',
      entity: 'Credit Profile',
      dataset: 'creditControls',
      fields: [
        { key: 'dealerCode', label: 'Dealer Code', required: true },
        { key: 'dealer', label: 'Dealer', required: true },
        { key: 'creditLimit', label: 'Credit Limit', type: 'number' },
        { key: 'outstanding', label: 'Outstanding', type: 'number' },
        { key: 'available', label: 'Available Credit', type: 'number' },
        { key: 'overdueDays', label: 'Max Overdue Days', type: 'number' },
        { key: 'riskClass', label: 'Risk Class', type: 'select', options: ['A', 'B', 'C', 'Blocked'] },
        { key: 'status', label: 'Status', type: 'select', options: ['Open', 'On Hold', 'Blocked'] }
      ],
      columns: [
        { key: 'dealerCode', label: 'Dealer Code' },
        { key: 'dealer', label: 'Dealer' },
        { key: 'creditLimit', label: 'Credit Limit', format: 'currency' },
        { key: 'outstanding', label: 'Outstanding', format: 'currency' },
        { key: 'available', label: 'Available Credit', format: 'currency' },
        { key: 'overdueDays', label: 'Max Overdue Days' },
        { key: 'riskClass', label: 'Risk Class' },
        { key: 'status', label: 'Status', format: 'status' }
      ]
    },
    purchaseRequisitions: {
      type: 'workflow',
      title: 'Purchase Requisitions',
      entity: 'Purchase Requisition',
      dataset: 'purchaseRequisitions',
      fields: [
        { key: 'number', label: 'PR No.', required: true },
        { key: 'date', label: 'Date', type: 'date' },
        { key: 'requestingDepartment', label: 'Requesting Department' },
        { key: 'material', label: 'Material / Product' },
        { key: 'quantity', label: 'Quantity', type: 'number' },
        { key: 'requiredDate', label: 'Required Date', type: 'date' },
        { key: 'estimatedValue', label: 'Estimated Value', type: 'number' },
        { key: 'status', label: 'Status', type: 'select', options: ['Draft', 'Submitted', 'Approved', 'Converted to RFQ', 'Rejected'] }
      ],
      columns: [
        { key: 'number', label: 'PR No.' },
        { key: 'date', label: 'Date' },
        { key: 'requestingDepartment', label: 'Department' },
        { key: 'material', label: 'Material / Product' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'estimatedValue', label: 'Estimated Value', format: 'currency' },
        { key: 'status', label: 'Status', format: 'status' }
      ],
      stages: ['Draft', 'Submitted', 'Approved', 'Converted to RFQ']
    },
    rfqs: {
      type: 'workflow',
      title: 'Requests for Quotation',
      entity: 'RFQ',
      dataset: 'rfqs',
      fields: [
        { key: 'number', label: 'RFQ No.', required: true },
        { key: 'date', label: 'Issue Date', type: 'date' },
        { key: 'material', label: 'Material / Product' },
        { key: 'quantity', label: 'Quantity', type: 'number' },
        { key: 'vendorsInvited', label: 'Vendors Invited', type: 'number' },
        { key: 'closingDate', label: 'Closing Date', type: 'date' },
        { key: 'bestBid', label: 'Best Bid', type: 'number' },
        { key: 'status', label: 'Status', type: 'select', options: ['Draft', 'Issued', 'Bids Received', 'Evaluated', 'Awarded'] }
      ],
      columns: [
        { key: 'number', label: 'RFQ No.' },
        { key: 'date', label: 'Issue Date' },
        { key: 'material', label: 'Material' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'vendorsInvited', label: 'Vendors Invited' },
        { key: 'closingDate', label: 'Closing Date' },
        { key: 'status', label: 'Status', format: 'status' }
      ],
      stages: ['Draft', 'Issued', 'Bids Received', 'Evaluated', 'Awarded']
    },
    purchaseOrders: {
      type: 'workflow',
      title: 'Purchase Orders',
      entity: 'Purchase Order',
      dataset: 'purchaseOrders',
      fields: [
        { key: 'number', label: 'PO No.', required: true },
        { key: 'date', label: 'Date', type: 'date' },
        { key: 'vendor', label: 'Vendor / Supplier' },
        { key: 'material', label: 'Material / Product' },
        { key: 'quantity', label: 'Quantity', type: 'number' },
        { key: 'unitRate', label: 'Unit Rate', type: 'number' },
        { key: 'deliveryDepot', label: 'Delivery Depot' },
        { key: 'deliveryDate', label: 'Delivery Date', type: 'date' },
        { key: 'status', label: 'Status', type: 'select', options: ['Draft', 'Approved', 'Partially Received', 'Completed', 'Cancelled'] }
      ],
      columns: [
        { key: 'number', label: 'PO No.' },
        { key: 'date', label: 'Date' },
        { key: 'vendor', label: 'Vendor' },
        { key: 'material', label: 'Material' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'unitRate', label: 'Unit Rate', format: 'currency' },
        { key: 'status', label: 'Status', format: 'status' }
      ],
      stages: ['Draft', 'Approved', 'Partially Received', 'Completed']
    },
    goodsReceipts: {
      type: 'workflow',
      title: 'Goods Receipt Notes',
      entity: 'Goods Receipt Note',
      dataset: 'goodsReceipts',
      fields: [
        { key: 'number', label: 'GRN No.', required: true },
        { key: 'date', label: 'Receipt Date', type: 'date' },
        { key: 'poNumber', label: 'Purchase Order No.' },
        { key: 'vendor', label: 'Vendor' },
        { key: 'depot', label: 'Receiving Depot' },
        { key: 'product', label: 'Product' },
        { key: 'receivedQty', label: 'Received Quantity', type: 'number' },
        { key: 'acceptedQty', label: 'Accepted Quantity', type: 'number' },
        { key: 'status', label: 'Status', type: 'select', options: ['Draft', 'Quality Check', 'Accepted', 'Rejected', 'Posted'] }
      ],
      columns: [
        { key: 'number', label: 'GRN No.' },
        { key: 'date', label: 'Date' },
        { key: 'poNumber', label: 'PO No.' },
        { key: 'vendor', label: 'Vendor' },
        { key: 'depot', label: 'Depot' },
        { key: 'product', label: 'Product' },
        { key: 'receivedQty', label: 'Received Qty' },
        { key: 'status', label: 'Status', format: 'status' }
      ],
      stages: ['Draft', 'Quality Check', 'Accepted', 'Posted']
    },
    stockTransfers: {
      type: 'workflow',
      title: 'Stock Transfers',
      entity: 'Stock Transfer',
      dataset: 'stockTransfers',
      fields: [
        { key: 'number', label: 'Transfer No.', required: true },
        { key: 'date', label: 'Date', type: 'date' },
        { key: 'fromDepot', label: 'From Depot' },
        { key: 'toDepot', label: 'To Depot' },
        { key: 'product', label: 'Product' },
        { key: 'quantity', label: 'Quantity (Ltr)', type: 'number' },
        { key: 'vehicle', label: 'Tanker / Vehicle' },
        { key: 'status', label: 'Status', type: 'select', options: ['Draft', 'Dispatched', 'In Transit', 'Received', 'Closed'] }
      ],
      columns: [
        { key: 'number', label: 'Transfer No.' },
        { key: 'date', label: 'Date' },
        { key: 'fromDepot', label: 'From Depot' },
        { key: 'toDepot', label: 'To Depot' },
        { key: 'product', label: 'Product' },
        { key: 'quantity', label: 'Qty (Ltr)', format: 'number0' },
        { key: 'status', label: 'Status', format: 'status' }
      ],
      stages: ['Draft', 'Dispatched', 'In Transit', 'Received', 'Closed']
    },
    stockAdjustments: {
      type: 'workflow',
      title: 'Stock Adjustments',
      entity: 'Stock Adjustment',
      dataset: 'stockAdjustments',
      fields: [
        { key: 'number', label: 'Adjustment No.', required: true },
        { key: 'date', label: 'Date', type: 'date' },
        { key: 'depot', label: 'Depot' },
        { key: 'product', label: 'Product' },
        { key: 'quantity', label: 'Adjustment Quantity', type: 'number' },
        { key: 'reason', label: 'Reason', type: 'select', options: ['Dip Variance', 'Temperature Correction', 'Evaporation Loss', 'Calibration', 'Damage', 'Other'] },
        { key: 'approvedBy', label: 'Approved By' },
        { key: 'status', label: 'Status', type: 'select', options: ['Draft', 'Submitted', 'Approved', 'Posted'] }
      ],
      columns: [
        { key: 'number', label: 'Adjustment No.' },
        { key: 'date', label: 'Date' },
        { key: 'depot', label: 'Depot' },
        { key: 'product', label: 'Product' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'reason', label: 'Reason' },
        { key: 'status', label: 'Status', format: 'status' }
      ],
      stages: ['Draft', 'Submitted', 'Approved', 'Posted']
    },
    budgets: {
      type: 'master',
      title: 'Budgets',
      entity: 'Budget',
      dataset: 'budgets',
      fields: [
        { key: 'year', label: 'Financial Year', required: true },
        { key: 'costCenter', label: 'Cost Centre', required: true },
        { key: 'account', label: 'Expense / Revenue Account' },
        { key: 'annualBudget', label: 'Annual Budget', type: 'number' },
        { key: 'actual', label: 'Actual to Date', type: 'number' },
        { key: 'committed', label: 'Committed', type: 'number' },
        { key: 'status', label: 'Status', type: 'select', options: ['Draft', 'Approved', 'Locked'] }
      ],
      columns: [
        { key: 'year', label: 'Year' },
        { key: 'costCenter', label: 'Cost Centre' },
        { key: 'account', label: 'Account' },
        { key: 'annualBudget', label: 'Budget', format: 'currency' },
        { key: 'actual', label: 'Actual', format: 'currency' },
        { key: 'status', label: 'Status', format: 'status' }
      ]
    },
    costAllocations: {
      type: 'workflow',
      title: 'Cost Allocations',
      entity: 'Cost Allocation',
      dataset: 'costAllocations',
      fields: [
        { key: 'number', label: 'Allocation No.', required: true },
        { key: 'period', label: 'Period' },
        { key: 'sourceCostCenter', label: 'Source Cost Centre' },
        { key: 'targetCostCenter', label: 'Target Cost Centre' },
        { key: 'basis', label: 'Allocation Basis', type: 'select', options: ['Volume', 'Headcount', 'Revenue', 'Fixed Percentage'] },
        { key: 'amount', label: 'Amount', type: 'number' },
        { key: 'status', label: 'Status', type: 'select', options: ['Draft', 'Calculated', 'Approved', 'Posted'] }
      ],
      columns: [
        { key: 'number', label: 'Allocation No.' },
        { key: 'period', label: 'Period' },
        { key: 'sourceCostCenter', label: 'Source CC' },
        { key: 'targetCostCenter', label: 'Target CC' },
        { key: 'amount', label: 'Amount', format: 'currency' },
        { key: 'status', label: 'Status', format: 'status' }
      ],
      stages: ['Draft', 'Calculated', 'Approved', 'Posted']
    },
    importContracts: {
      type: 'workflow',
      title: 'Import Contracts',
      entity: 'Import Contract',
      dataset: 'importContracts',
      fields: [
        { key: 'number', label: 'Contract No.', required: true },
        { key: 'contractDate', label: 'Contract Date', type: 'date' },
        { key: 'supplier', label: 'Overseas Supplier' },
        { key: 'product', label: 'Product / Grade' },
        { key: 'quantityMT', label: 'Quantity (MT)', type: 'number' },
        { key: 'priceUSD', label: 'Price (USD / MT)', type: 'number' },
        { key: 'incoterm', label: 'Incoterm', type: 'select', options: ['CFR Karachi', 'CIF Karachi', 'FOB', 'DAP'] },
        { key: 'port', label: 'Destination Port' },
        { key: 'status', label: 'Status', type: 'select', options: ['Draft', 'Signed', 'LC Opened', 'Shipped', 'Completed'] }
      ],
      columns: [
        { key: 'number', label: 'Contract No.' },
        { key: 'contractDate', label: 'Date' },
        { key: 'supplier', label: 'Supplier' },
        { key: 'product', label: 'Product' },
        { key: 'quantityMT', label: 'Qty (MT)' },
        { key: 'priceUSD', label: 'Price (USD)', format: 'currency' },
        { key: 'status', label: 'Status', format: 'status' }
      ],
      stages: ['Draft', 'Signed', 'LC Opened', 'Shipped', 'Completed']
    },
    lettersOfCredit: {
      type: 'workflow',
      title: 'Letters of Credit',
      entity: 'Letter of Credit',
      dataset: 'lettersOfCredit',
      fields: [
        { key: 'lcNumber', label: 'LC Number', required: true },
        { key: 'openingDate', label: 'Opening Date', type: 'date' },
        { key: 'bank', label: 'Opening Bank' },
        { key: 'supplier', label: 'Beneficiary' },
        { key: 'currency', label: 'Currency', type: 'select', options: ['USD', 'AED', 'EUR'] },
        { key: 'amount', label: 'LC Amount', type: 'number' },
        { key: 'expiryDate', label: 'Expiry Date', type: 'date' },
        { key: 'contractNumber', label: 'Import Contract' },
        { key: 'status', label: 'Status', type: 'select', options: ['Draft', 'Opened', 'Amended', 'Documents Received', 'Retired', 'Closed'] }
      ],
      columns: [
        { key: 'lcNumber', label: 'LC Number' },
        { key: 'openingDate', label: 'Opening Date' },
        { key: 'bank', label: 'Bank' },
        { key: 'supplier', label: 'Beneficiary' },
        { key: 'amount', label: 'Amount', format: 'currency' },
        { key: 'status', label: 'Status', format: 'status' }
      ],
      stages: ['Draft', 'Opened', 'Documents Received', 'Retired', 'Closed']
    },
    shipments: {
      type: 'workflow',
      title: 'Shipment Tracking',
      entity: 'Shipment',
      dataset: 'shipments',
      fields: [
        { key: 'shipmentNo', label: 'Shipment No.', required: true },
        { key: 'contractNumber', label: 'Contract No.' },
        { key: 'vessel', label: 'Vessel' },
        { key: 'billOfLading', label: 'Bill of Lading' },
        { key: 'product', label: 'Product' },
        { key: 'quantityMT', label: 'Quantity (MT)', type: 'number' },
        { key: 'portOfLoading', label: 'Port of Loading' },
        { key: 'destinationPort', label: 'Destination Port' },
        { key: 'eta', label: 'ETA', type: 'date' },
        { key: 'status', label: 'Status', type: 'select', options: ['Nominated', 'Loading', 'Sailed', 'At Port', 'Discharged', 'Customs Cleared', 'Received at Depot'] }
      ],
      columns: [
        { key: 'shipmentNo', label: 'Shipment No.' },
        { key: 'vessel', label: 'Vessel' },
        { key: 'product', label: 'Product' },
        { key: 'quantityMT', label: 'Qty (MT)' },
        { key: 'eta', label: 'ETA' },
        { key: 'status', label: 'Status', format: 'status' }
      ],
      stages: ['Nominated', 'Loading', 'Sailed', 'At Port', 'Discharged', 'Customs Cleared', 'Received at Depot']
    },
    clearingCosts: {
      type: 'master',
      title: 'Customs & Clearing Costs',
      entity: 'Clearing Cost',
      dataset: 'clearingCosts',
      fields: [
        { key: 'shipmentNo', label: 'Shipment No.', required: true },
        { key: 'costType', label: 'Cost Type', type: 'select', options: ['Customs Duty', 'Sales Tax', 'Port Charges', 'Wharfage', 'Demurrage', 'Clearing Fee', 'Survey Fee', 'Other'] },
        { key: 'vendor', label: 'Vendor / Authority' },
        { key: 'documentNo', label: 'Document / Challan No.' },
        { key: 'date', label: 'Date', type: 'date' },
        { key: 'amount', label: 'Amount (PKR)', type: 'number' },
        { key: 'status', label: 'Status', type: 'select', options: ['Estimated', 'Accrued', 'Invoiced', 'Paid'] }
      ],
      columns: [
        { key: 'shipmentNo', label: 'Shipment No.' },
        { key: 'costType', label: 'Cost Type' },
        { key: 'vendor', label: 'Vendor' },
        { key: 'amount', label: 'Amount (PKR)', format: 'currency' },
        { key: 'status', label: 'Status', format: 'status' }
      ]
    },
    landedCosts: {
      type: 'master',
      title: 'Landed Cost Allocation',
      entity: 'Landed Cost',
      dataset: 'landedCosts',
      fields: [
        { key: 'shipmentNo', label: 'Shipment No.', required: true },
        { key: 'product', label: 'Product' },
        { key: 'invoiceValue', label: 'Invoice Value', type: 'number' },
        { key: 'freight', label: 'Ocean Freight', type: 'number' },
        { key: 'dutiesTaxes', label: 'Duties & Taxes', type: 'number' },
        { key: 'portClearing', label: 'Port & Clearing', type: 'number' },
        { key: 'inlandFreight', label: 'Inland Freight', type: 'number' },
        { key: 'landedCostPerLtr', label: 'Landed Cost / Ltr', type: 'number' },
        { key: 'status', label: 'Status', type: 'select', options: ['Estimated', 'Finalized', 'Posted'] }
      ],
      columns: [
        { key: 'shipmentNo', label: 'Shipment No.' },
        { key: 'product', label: 'Product' },
        { key: 'invoiceValue', label: 'Invoice Value', format: 'currency' },
        { key: 'landedCostPerLtr', label: 'Landed Cost / Ltr', format: 'currency' },
        { key: 'status', label: 'Status', format: 'status' }
      ]
    },
    importDocuments: {
      type: 'master',
      title: 'Import Documents',
      entity: 'Import Document',
      dataset: 'importDocuments',
      fields: [
        { key: 'shipmentNo', label: 'Shipment No.', required: true },
        { key: 'documentType', label: 'Document Type', type: 'select', options: ['Commercial Invoice', 'Bill of Lading', 'Certificate of Origin', 'Quality Certificate', 'Packing List', 'GD', 'Duty Challan', 'Insurance Certificate'] },
        { key: 'documentNo', label: 'Document No.' },
        { key: 'issueDate', label: 'Issue Date', type: 'date' },
        { key: 'receivedDate', label: 'Received Date', type: 'date' },
        { key: 'remarks', label: 'Remarks', type: 'textarea' },
        { key: 'status', label: 'Status', type: 'select', options: ['Expected', 'Received', 'Verified', 'Missing'] }
      ],
      columns: [
        { key: 'shipmentNo', label: 'Shipment No.' },
        { key: 'documentType', label: 'Type' },
        { key: 'documentNo', label: 'Document No.' },
        { key: 'receivedDate', label: 'Received Date' },
        { key: 'status', label: 'Status', format: 'status' }
      ]
    },
    tanks: {
      type: 'master',
      title: 'Depot Tanks',
      entity: 'Tank',
      dataset: 'tanks',
      fields: [
        { key: 'code', label: 'Tank Code', required: true },
        { key: 'depot', label: 'Depot', required: true },
        { key: 'product', label: 'Product' },
        { key: 'capacity', label: 'Safe Capacity (Ltr)', type: 'number' },
        { key: 'bookStock', label: 'Book Stock (Ltr)', type: 'number' },
        { key: 'dipStock', label: 'Dip Stock (Ltr)', type: 'number' },
        { key: 'temperature', label: 'Temperature °C', type: 'number' },
        { key: 'status', label: 'Status', type: 'select', options: ['Operational', 'Maintenance', 'Isolated'] }
      ],
      columns: [
        { key: 'code', label: 'Tank' },
        { key: 'depot', label: 'Depot' },
        { key: 'product', label: 'Product' },
        { key: 'capacity', label: 'Capacity', format: 'number0' },
        { key: 'bookStock', label: 'Book Stock', format: 'number0' },
        { key: 'dipStock', label: 'Dip Stock', format: 'number0' },
        { key: 'status', label: 'Status', format: 'status' }
      ]
    },
    tankerDispatches: {
      type: 'workflow',
      title: 'Tanker Dispatches',
      entity: 'Tanker Dispatch',
      dataset: 'tankerDispatches',
      fields: [
        { key: 'dispatchNo', label: 'Dispatch No.', required: true },
        { key: 'date', label: 'Dispatch Date', type: 'date' },
        { key: 'salesOrder', label: 'Sales Order' },
        { key: 'depot', label: 'Loading Depot' },
        { key: 'customer', label: 'Customer / Outlet' },
        { key: 'product', label: 'Product' },
        { key: 'quantity', label: 'Quantity (Ltr)', type: 'number' },
        { key: 'vehicle', label: 'Tanker' },
        { key: 'driver', label: 'Driver' },
        { key: 'sealNumbers', label: 'Seal Numbers' },
        { key: 'status', label: 'Status', type: 'select', options: ['Planned', 'Loading', 'Dispatched', 'Delivered', 'Closed'] }
      ],
      columns: [
        { key: 'dispatchNo', label: 'Dispatch No.' },
        { key: 'date', label: 'Date' },
        { key: 'customer', label: 'Customer' },
        { key: 'quantity', label: 'Qty (Ltr)', format: 'number0' },
        { key: 'vehicle', label: 'Tanker' },
        { key: 'status', label: 'Status', format: 'status' }
      ],
      stages: ['Planned', 'Loading', 'Dispatched', 'Delivered', 'Closed']
    },
    dipReadings: {
      type: 'master',
      title: 'Daily Dip Readings',
      entity: 'Dip Reading',
      dataset: 'dipReadings',
      fields: [
        { key: 'date', label: 'Date', type: 'date', required: true },
        { key: 'time', label: 'Time' },
        { key: 'depot', label: 'Depot' },
        { key: 'tank', label: 'Tank' },
        { key: 'product', label: 'Product' },
        { key: 'dipMM', label: 'Dip (mm)', type: 'number' },
        { key: 'temperature', label: 'Temperature °C', type: 'number' },
        { key: 'observedVolume', label: 'Observed Volume (Ltr)', type: 'number' },
        { key: 'standardVolume', label: 'Standard Volume (Ltr)', type: 'number' },
        { key: 'recordedBy', label: 'Recorded By' }
      ],
      columns: [
        { key: 'date', label: 'Date' },
        { key: 'depot', label: 'Depot' },
        { key: 'tank', label: 'Tank' },
        { key: 'product', label: 'Product' },
        { key: 'dipMM', label: 'Dip (mm)' },
        { key: 'observedVolume', label: 'Observed Vol', format: 'number0' },
        { key: 'recordedBy', label: 'Recorded By' }
      ]
    },
    tankReconciliation: {
      type: 'workflow',
      title: 'Tank Reconciliation',
      entity: 'Tank Reconciliation',
      dataset: 'tankReconciliation',
      fields: [
        { key: 'number', label: 'Reconciliation No.', required: true },
        { key: 'date', label: 'Date', type: 'date' },
        { key: 'depot', label: 'Depot' },
        { key: 'tank', label: 'Tank' },
        { key: 'product', label: 'Product' },
        { key: 'openingStock', label: 'Opening Stock', type: 'number' },
        { key: 'receipts', label: 'Receipts', type: 'number' },
        { key: 'issues', label: 'Issues', type: 'number' },
        { key: 'bookClosing', label: 'Book Closing', type: 'number' },
        { key: 'physicalClosing', label: 'Physical Closing', type: 'number' },
        { key: 'variance', label: 'Variance', type: 'number' },
        { key: 'status', label: 'Status', type: 'select', options: ['Draft', 'Reviewed', 'Approved', 'Posted'] }
      ],
      columns: [
        { key: 'number', label: 'Reconciliation No.' },
        { key: 'depot', label: 'Depot' },
        { key: 'tank', label: 'Tank' },
        { key: 'bookClosing', label: 'Book Closing', format: 'number0' },
        { key: 'physicalClosing', label: 'Physical Closing', format: 'number0' },
        { key: 'variance', label: 'Variance' },
        { key: 'status', label: 'Status', format: 'status' }
      ],
      stages: ['Draft', 'Reviewed', 'Approved', 'Posted']
    },
    productMovements: {
      type: 'master',
      title: 'Product Movements',
      entity: 'Product Movement',
      dataset: 'productMovements',
      fields: [
        { key: 'movementNo', label: 'Movement No.', required: true },
        { key: 'date', label: 'Date', type: 'date' },
        { key: 'movementType', label: 'Movement Type', type: 'select', options: ['Import Receipt', 'Local Purchase', 'Depot Transfer In', 'Depot Transfer Out', 'Dealer Dispatch', 'Adjustment'] },
        { key: 'depot', label: 'Depot' },
        { key: 'product', label: 'Product' },
        { key: 'quantity', label: 'Quantity (Ltr)', type: 'number' },
        { key: 'reference', label: 'Reference Document' },
        { key: 'status', label: 'Status', type: 'select', options: ['Posted', 'Reversed'] }
      ],
      columns: [
        { key: 'movementNo', label: 'Movement No.' },
        { key: 'date', label: 'Date' },
        { key: 'movementType', label: 'Type' },
        { key: 'depot', label: 'Depot' },
        { key: 'product', label: 'Product' },
        { key: 'quantity', label: 'Qty (Ltr)', format: 'number0' },
        { key: 'status', label: 'Status', format: 'status' }
      ]
    },
    lossGainAnalysis: { type: 'analytics', title: 'Loss / Gain Analysis', reportType: 'lossGainAnalysis' },
    priceNotifications: {
      type: 'master',
      title: 'Price Notifications',
      entity: 'Price Notification',
      dataset: 'priceNotifications',
      fields: [
        { key: 'notificationNo', label: 'Notification No.', required: true },
        { key: 'effectiveDate', label: 'Effective Date', type: 'date' },
        { key: 'product', label: 'Product' },
        { key: 'oldPrice', label: 'Old Price / Ltr', type: 'number' },
        { key: 'newPrice', label: 'New Price / Ltr', type: 'number' },
        { key: 'change', label: 'Change / Ltr', type: 'number' },
        { key: 'approvedBy', label: 'Approved By' },
        { key: 'status', label: 'Status', type: 'select', options: ['Draft', 'Approved', 'Published'] }
      ],
      columns: [
        { key: 'notificationNo', label: 'Notification No.' },
        { key: 'effectiveDate', label: 'Effective Date' },
        { key: 'product', label: 'Product' },
        { key: 'oldPrice', label: 'Old Price', format: 'currency' },
        { key: 'newPrice', label: 'New Price', format: 'currency' },
        { key: 'status', label: 'Status', format: 'status' }
      ]
    },
    users: {
      type: 'master',
      title: 'Users & Roles',
      entity: 'User',
      dataset: 'users',
      fields: [
        { key: 'name', label: 'User Name', required: true },
        { key: 'email', label: 'Email', required: true },
        { key: 'role', label: 'Role', type: 'select', options: ['System Administrator', 'Finance Manager', 'Sales Manager', 'Supply Chain Manager', 'Depot Manager', 'Data Entry Operator', 'Auditor'] },
        { key: 'location', label: 'Location / Depot' },
        { key: 'lastLogin', label: 'Last Login' },
        { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Locked', 'Inactive'] }
      ],
      columns: [
        { key: 'name', label: 'User Name' },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role' },
        { key: 'location', label: 'Location' },
        { key: 'lastLogin', label: 'Last Login' },
        { key: 'status', label: 'Status', format: 'status' }
      ]
    },
    approvals: {
      type: 'workflow',
      title: 'Approval Workflows',
      entity: 'Approval Rule',
      dataset: 'approvals',
      fields: [
        { key: 'documentType', label: 'Document Type', required: true },
        { key: 'threshold', label: 'Amount Threshold', type: 'number' },
        { key: 'level1', label: 'Level 1 Approver' },
        { key: 'level2', label: 'Level 2 Approver' },
        { key: 'level3', label: 'Level 3 Approver' },
        { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] }
      ],
      columns: [
        { key: 'documentType', label: 'Document Type' },
        { key: 'threshold', label: 'Threshold', format: 'currency' },
        { key: 'level1', label: 'Level 1' },
        { key: 'level2', label: 'Level 2' },
        { key: 'level3', label: 'Level 3' },
        { key: 'status', label: 'Status', format: 'status' }
      ],
      stages: []
    },
    auditTrail: { type: 'report', title: 'Audit Trail', reportType: 'auditTrail' },
    companySettings: { type: 'settings', title: 'Company Settings' },
    salesReport: { type: 'report', title: 'Sales Report', reportType: 'sales' },
    purchaseReport: { type: 'report', title: 'Purchase Report', reportType: 'purchase' },
    accountsLedger: { type: 'report', title: 'Accounts Ledger', reportType: 'accountsLedger' },
    customerBalance: { type: 'report', title: 'Customer Balance', reportType: 'customerBalance' },
    vendorBalance: { type: 'report', title: 'Vendor Balance', reportType: 'vendorBalance' },
    inventoryBalance: { type: 'report', title: 'Inventory Balance', reportType: 'inventoryBalance' },
    inventoryLedger: { type: 'report', title: 'Inventory Ledgers', reportType: 'inventoryLedger' },
    trialBalance: { type: 'report', title: 'Trial Balance', reportType: 'trialBalance' },
    profitLoss: { type: 'analytics', title: 'Profit & Loss Statement', reportType: 'profitLoss' },
    balanceSheet: { type: 'analytics', title: 'Balance Sheet', reportType: 'balanceSheet' },
    budgetVariance: { type: 'analytics', title: 'Budget vs Actual', reportType: 'budgetVariance' },
    profitability: { type: 'analytics', title: 'Product & Depot Profitability', reportType: 'profitability' }
  } as Record<string, ModuleConfig>,

  initialData: {
    customers: [
      { id: 'CUS-001', code: 'DLR-0001', name: 'Rahbar Filling Station', type: 'Retail Dealer', region: 'Central Punjab', address: 'Main GT Road, Sahiwal, Punjab', phone: '0300-0001101', contactPerson: 'Ahsan Raza', ntn: '0000001-0', strn: '00-00-0000-001-00', creditLimit: 18000000, balance: 6235000, status: 'Active' },
      { id: 'CUS-002', code: 'DLR-0002', name: 'Mehran Highway Petroleum', type: 'Retail Dealer', region: 'Karachi', address: 'Super Highway Link Road, Karachi', phone: '0300-0001102', contactPerson: 'Fahad Memon', ntn: '0000002-0', strn: '00-00-0000-002-00', creditLimit: 12000000, balance: 3480000, status: 'Active' },
      { id: 'CUS-003', code: 'BLK-0001', name: 'Sultan Logistics & Fuels', type: 'Bulk Commercial', region: 'South Punjab', address: 'Industrial Estate, Multan', phone: '0300-0001103', contactPerson: 'Naveed Sultan', ntn: '0000003-0', strn: '00-00-0000-003-00', creditLimit: 25000000, balance: 9150000, status: 'Active' },
      { id: 'CUS-004', code: 'DLR-0003', name: 'Pak Frontier Fuel Point', type: 'Retail Dealer', region: 'North', address: 'Havelian Road, Abbottabad', phone: '0300-0001104', contactPerson: 'Bilal Khan', ntn: '0000004-0', strn: '00-00-0000-004-00', creditLimit: 10000000, balance: 2100000, status: 'On Hold' },
      { id: 'CUS-005', code: 'DST-0001', name: 'Al-Hamd Energy Distributors', type: 'Distributor', region: 'Lahore', address: 'Kot Lakhpat Industrial Area, Lahore', phone: '0300-0001105', contactPerson: 'Usman Tariq', ntn: '0000005-0', strn: '00-00-0000-005-00', creditLimit: 30000000, balance: 12750000, status: 'Active' }
    ],
    vendors: [
      { id: 'VEN-001', code: 'SUP-0001', name: 'Crescent Base Oils (Pvt.) Ltd.', type: 'Petroleum Supplier', address: 'Keamari Industrial Zone, Karachi', phone: '021-00001001', contactPerson: 'Haris Qureshi', ntn: '1000001-0', strn: '10-00-0000-001-00', paymentTerms: '30 Days', balance: 54800000, status: 'Active' },
      { id: 'VEN-002', code: 'TRN-0001', name: 'Indus Tanker Services', type: 'Transport Contractor', address: 'Mauripur Road, Karachi', phone: '021-00001002', contactPerson: 'Imran Baloch', ntn: '1000002-0', strn: '10-00-0000-002-00', paymentTerms: '15 Days', balance: 8650000, status: 'Active' },
      { id: 'VEN-003', code: 'CLR-0001', name: 'Portlink Clearing Services', type: 'Clearing Agent', address: 'West Wharf, Karachi Port', phone: '021-00001003', contactPerson: 'Saad Ahmed', ntn: '1000003-0', strn: '10-00-0000-003-00', paymentTerms: 'Against Invoice', balance: 1950000, status: 'Active' },
      { id: 'VEN-004', code: 'SUP-0002', name: 'Meridian Additives Pakistan', type: 'Petroleum Supplier', address: 'SITE Area, Karachi', phone: '021-00001004', contactPerson: 'Adeel Farooq', ntn: '1000004-0', strn: '10-00-0000-004-00', paymentTerms: '45 Days', balance: 12750000, status: 'Active' },
      { id: 'VEN-005', code: 'EQP-0001', name: 'Eastern Depot Equipment Co.', type: 'Equipment Supplier', address: 'Bund Road, Lahore', phone: '042-00001005', contactPerson: 'Kamran Ali', ntn: '1000005-0', strn: '10-00-0000-005-00', paymentTerms: '30 Days', balance: 2250000, status: 'Active' }
    ],
    items: [
      { id: 'ITM-001', code: 'MS-92', description: 'Motor Spirit (RON 92)', category: 'Motor Spirit', unit: 'Ltr', salesRate: 274.5, purchaseRate: 249.2, taxRate: 18, furtherTaxRate: 4, reorderLevel: 500000, stock: 2850000, status: 'Active' },
      { id: 'ITM-002', code: 'HSD-50', description: 'High Speed Diesel (50 PPM)', category: 'High Speed Diesel', unit: 'Ltr', salesRate: 286.8, purchaseRate: 262.4, taxRate: 18, furtherTaxRate: 4, reorderLevel: 750000, stock: 4120000, status: 'Active' },
      { id: 'ITM-003', code: 'HOBC-97', description: 'High Octane Blending Component', category: 'HOBC', unit: 'Ltr', salesRate: 329.9, purchaseRate: 301.1, taxRate: 18, furtherTaxRate: 4, reorderLevel: 120000, stock: 460000, status: 'Active' },
      { id: 'ITM-004', code: 'SKO', description: 'Superior Kerosene Oil', category: 'Kerosene', unit: 'Ltr', salesRate: 214.2, purchaseRate: 198.6, taxRate: 18, furtherTaxRate: 4, reorderLevel: 100000, stock: 280000, status: 'Active' },
      { id: 'ITM-005', code: 'FO-180', description: 'Furnace Oil 180 CST', category: 'Furnace Oil', unit: 'MT', salesRate: 171500, purchaseRate: 158200, taxRate: 18, furtherTaxRate: 4, reorderLevel: 500, stock: 1450, status: 'Active' },
      { id: 'ITM-006', code: 'LUBE-20W50-1L', description: 'Premium Engine Oil 20W-50 (1 Litre)', category: 'Lubricants', unit: 'Carton', salesRate: 16800, purchaseRate: 13950, taxRate: 18, furtherTaxRate: 0, reorderLevel: 250, stock: 1160, status: 'Active' },
      { id: 'ITM-007', code: 'DRUM-200', description: 'New Steel Drum 200 Litre', category: 'Consumables', unit: 'Pcs', salesRate: 8900, purchaseRate: 7600, taxRate: 18, furtherTaxRate: 0, reorderLevel: 100, stock: 420, status: 'Active' }
    ],
    depots: [
      { id: 'DEP-KHI', code: 'KHI', name: 'Karachi Keamari Depot', city: 'Karachi', address: 'Oil Installation Area, Keamari, Karachi', manager: 'Shahid Mehmood', phone: '021-00002001', capacity: 18000000, status: 'Operational' },
      { id: 'DEP-SWL', code: 'SWL', name: 'Sahiwal Depot', city: 'Sahiwal', address: 'Industrial Estate Link Road, Sahiwal', manager: 'Aamir Iqbal', phone: '040-00002002', capacity: 12000000, status: 'Operational' },
      { id: 'DEP-HTR', code: 'HTR', name: 'Hattar Depot', city: 'Haripur', address: 'Hattar Industrial Estate, Haripur', manager: 'Waqas Khan', phone: '0995-0002003', capacity: 9000000, status: 'Operational' },
      { id: 'DEP-LHE', code: 'LHE', name: 'Lahore Distribution Terminal', city: 'Lahore', address: 'Sundar Industrial Estate, Lahore', manager: 'Rashid Latif', phone: '042-00002004', capacity: 5500000, status: 'Maintenance' }
    ],
    outlets: [
      { id: 'OUT-001', code: 'PP-001', name: 'Rahbar Filling Station', dealer: 'Ahsan Raza', city: 'Sahiwal', address: 'Main GT Road, Sahiwal', phone: '040-00003001', commissioningDate: '2026-08-15', monthlyVolume: 650000, status: 'Planned' },
      { id: 'OUT-002', code: 'PP-002', name: 'Mehran Highway Petroleum', dealer: 'Fahad Memon', city: 'Karachi', address: 'Super Highway Link Road, Karachi', phone: '021-00003002', commissioningDate: '2026-07-01', monthlyVolume: 850000, status: 'Operational' },
      { id: 'OUT-003', code: 'PP-003', name: 'Frontier Fuel Point', dealer: 'Bilal Khan', city: 'Abbottabad', address: 'Havelian Road, Abbottabad', phone: '0992-0003003', commissioningDate: '2026-09-01', monthlyVolume: 420000, status: 'Under Renovation' },
      { id: 'OUT-004', code: 'PP-004', name: 'Canal View Petroleum', dealer: 'Hamza Nadeem', city: 'Lahore', address: 'Canal Bank Road, Lahore', phone: '042-00003004', commissioningDate: '2026-06-10', monthlyVolume: 720000, status: 'Operational' }
    ],
    vehicles: [
      { id: 'VEH-001', registration: 'TKA-001', type: 'Oil Tanker', capacity: 50000, transporter: 'Indus Tanker Services', trackerId: 'TRK-OMC-001', fitnessExpiry: '2027-01-31', status: 'Available' },
      { id: 'VEH-002', registration: 'TKA-002', type: 'Oil Tanker', capacity: 40000, transporter: 'Indus Tanker Services', trackerId: 'TRK-OMC-002', fitnessExpiry: '2026-12-15', status: 'In Transit' },
      { id: 'VEH-003', registration: 'TKA-003', type: 'Oil Tanker', capacity: 25000, transporter: 'Falcon Fuel Carriers', trackerId: 'TRK-OMC-003', fitnessExpiry: '2027-03-20', status: 'Available' },
      { id: 'VEH-004', registration: 'LUB-101', type: 'Lube Delivery Truck', capacity: 8000, transporter: 'Company Owned', trackerId: 'TRK-OMC-004', fitnessExpiry: '2026-11-30', status: 'Maintenance' }
    ],
    drivers: [
      { id: 'DRV-001', code: 'DRV-001', name: 'Nadeem Akhtar', cnic: '00000-0000001-0', phone: '0300-0002101', license: 'DL-000001', licenseExpiry: '2027-05-31', transporter: 'Indus Tanker Services', status: 'Active' },
      { id: 'DRV-002', code: 'DRV-002', name: 'Javed Iqbal', cnic: '00000-0000002-0', phone: '0300-0002102', license: 'DL-000002', licenseExpiry: '2026-12-20', transporter: 'Indus Tanker Services', status: 'On Trip' },
      { id: 'DRV-003', code: 'DRV-003', name: 'Shahbaz Ali', cnic: '00000-0000003-0', phone: '0300-0002103', license: 'DL-000003', licenseExpiry: '2027-02-15', transporter: 'Falcon Fuel Carriers', status: 'Active' }
    ],
    employees: [
      { id: 'EMP-001', code: 'EMP-001', name: 'Jamal Nasir', department: 'Finance', designation: 'Finance Manager', location: 'Lahore Head Office', phone: '0300-0003101', status: 'Active' },
      { id: 'EMP-002', code: 'EMP-002', name: 'Aamir Iqbal', department: 'Depot Operations', designation: 'Depot Manager', location: 'Sahiwal Depot', phone: '0300-0003102', status: 'Active' },
      { id: 'EMP-003', code: 'EMP-003', name: 'Waqas Khan', department: 'Depot Operations', designation: 'Depot Manager', location: 'Hattar Depot', phone: '0300-0003103', status: 'Active' },
      { id: 'EMP-004', code: 'EMP-004', name: 'Hina Farooq', department: 'Imports', designation: 'Import Officer', location: 'Karachi Office', phone: '0300-0003104', status: 'Active' },
      { id: 'EMP-005', code: 'EMP-005', name: 'Saad Raza', department: 'Sales', designation: 'Regional Sales Manager', location: 'Lahore', phone: '0300-0003105', status: 'Active' }
    ],
    chartOfAccounts: [
      { id: 'ACC-10001001', code: '10001001', name: 'Cash in Hand', group: 'Assets', type: 'Cash', openingDebit: 8500000, openingCredit: 0, balance: 10850000, status: 'Active' },
      { id: 'ACC-11002001', code: '11002001', name: 'Meezan Bank - Main Collection', group: 'Assets', type: 'Bank', openingDebit: 25000000, openingCredit: 0, balance: 37650000, status: 'Active' },
      { id: 'ACC-11002002', code: '11002002', name: 'HBL - Import Account', group: 'Assets', type: 'Bank', openingDebit: 12000000, openingCredit: 0, balance: 8250000, status: 'Active' },
      { id: 'ACC-12001001', code: '12001001', name: 'Trade Receivables - Dealers', group: 'Assets', type: 'Customer', openingDebit: 24500000, openingCredit: 0, balance: 33715000, status: 'Active' },
      { id: 'ACC-13001001', code: '13001001', name: 'Inventory - Motor Spirit', group: 'Assets', type: 'Inventory', openingDebit: 545000000, openingCredit: 0, balance: 709000000, status: 'Active' },
      { id: 'ACC-13001002', code: '13001002', name: 'Inventory - High Speed Diesel', group: 'Assets', type: 'Inventory', openingDebit: 690000000, openingCredit: 0, balance: 1081000000, status: 'Active' },
      { id: 'ACC-21002001', code: '21002001', name: 'Trade Payables - Suppliers', group: 'Liabilities', type: 'Vendor', openingDebit: 0, openingCredit: 68000000, balance: -80500000, status: 'Active' },
      { id: 'ACC-22001001', code: '22001001', name: 'Sales Tax Payable', group: 'Liabilities', type: 'Detail', openingDebit: 0, openingCredit: 14500000, balance: -19650000, status: 'Active' },
      { id: 'ACC-30001001', code: '30001001', name: 'Share Capital', group: 'Equity', type: 'Control', openingDebit: 0, openingCredit: 500000000, balance: -500000000, status: 'Active' },
      { id: 'ACC-40001001', code: '40001001', name: 'Sales - Petroleum Products', group: 'Revenue', type: 'Detail', openingDebit: 0, openingCredit: 0, balance: -865500000, status: 'Active' },
      { id: 'ACC-40001002', code: '40001002', name: 'Sales - Lubricants', group: 'Revenue', type: 'Detail', openingDebit: 0, openingCredit: 0, balance: -48500000, status: 'Active' },
      { id: 'ACC-50001002', code: '50001002', name: 'Purchases - Petroleum Products', group: 'Cost of Sales', type: 'Detail', openingDebit: 0, openingCredit: 0, balance: 755000000, status: 'Active' },
      { id: 'ACC-51001001', code: '51001001', name: 'Freight & Carriage', group: 'Cost of Sales', type: 'Detail', openingDebit: 0, openingCredit: 0, balance: 18500000, status: 'Active' },
      { id: 'ACC-61001001', code: '61001001', name: 'Depot Operating Expenses', group: 'Operating Expense', type: 'Detail', openingDebit: 0, openingCredit: 0, balance: 12500000, status: 'Active' },
      { id: 'ACC-61001002', code: '61001002', name: 'Salaries & Benefits', group: 'Operating Expense', type: 'Detail', openingDebit: 0, openingCredit: 0, balance: 16200000, status: 'Active' }
    ],
    costCenters: [
      { id: 'CC-001', code: 'CC-KHI', name: 'Karachi Depot Operations', manager: 'Shahid Mehmood', location: 'Karachi', annualBudget: 84000000, actual: 38200000, status: 'Active' },
      { id: 'CC-002', code: 'CC-SWL', name: 'Sahiwal Depot Operations', manager: 'Aamir Iqbal', location: 'Sahiwal', annualBudget: 56000000, actual: 25100000, status: 'Active' },
      { id: 'CC-003', code: 'CC-HTR', name: 'Hattar Depot Operations', manager: 'Waqas Khan', location: 'Haripur', annualBudget: 48000000, actual: 21450000, status: 'Active' },
      { id: 'CC-004', code: 'CC-IMP', name: 'Imports & Logistics', manager: 'Hina Farooq', location: 'Karachi', annualBudget: 125000000, actual: 64700000, status: 'Active' },
      { id: 'CC-005', code: 'CC-HO', name: 'Corporate Head Office', manager: 'Jamal Nasir', location: 'Lahore', annualBudget: 72000000, actual: 33800000, status: 'Active' }
    ],
    profitCenters: [
      { id: 'PC-001', code: 'PC-MS', name: 'Motor Spirit', manager: 'Saad Raza', revenue: 385000000, cost: 332000000, status: 'Active' },
      { id: 'PC-002', code: 'PC-HSD', name: 'High Speed Diesel', manager: 'Saad Raza', revenue: 456000000, cost: 397500000, status: 'Active' },
      { id: 'PC-003', code: 'PC-LUBE', name: 'Lubricants', manager: 'Saad Raza', revenue: 48500000, cost: 33700000, status: 'Active' },
      { id: 'PC-004', code: 'PC-RTL', name: 'Retail Network', manager: 'Saad Raza', revenue: 129000000, cost: 112500000, status: 'Active' }
    ],
    tanks: [
      { id: 'TNK-001', code: 'KHI-T01', depot: 'Karachi Keamari Depot', product: 'Motor Spirit (RON 92)', capacity: 5000000, bookStock: 2520000, dipStock: 2512500, temperature: 31.5, status: 'Operational' },
      { id: 'TNK-002', code: 'KHI-T02', depot: 'Karachi Keamari Depot', product: 'High Speed Diesel (50 PPM)', capacity: 7000000, bookStock: 3280000, dipStock: 3291000, temperature: 30.2, status: 'Operational' },
      { id: 'TNK-003', code: 'SWL-T01', depot: 'Sahiwal Depot', product: 'Motor Spirit (RON 92)', capacity: 4000000, bookStock: 1180000, dipStock: 1176500, temperature: 34.1, status: 'Operational' },
      { id: 'TNK-004', code: 'SWL-T02', depot: 'Sahiwal Depot', product: 'High Speed Diesel (50 PPM)', capacity: 5000000, bookStock: 1640000, dipStock: 1647800, temperature: 33, status: 'Operational' },
      { id: 'TNK-005', code: 'HTR-T01', depot: 'Hattar Depot', product: 'High Speed Diesel (50 PPM)', capacity: 4200000, bookStock: 1220000, dipStock: 1215200, temperature: 28.4, status: 'Operational' }
    ],
    salesTaxInvoices: [
      {
        id: '03f31ebf-3a12-4c66-b8ce-eef18f2862a2',
        serialNo: 'STI-2026-00019',
        date: '2026-07-22',
        status: 'Posted',
        canceled: false,
        partyId: 'CUS-001',
        purchaseOrderNo: 'PO-RFS-0726-18',
        purchaseOrderDate: '2026-07-20',
        deliveryChallanNo: 'DC-2026-00017',
        deliveryChallanDate: '2026-07-22',
        vendorInvoiceNo: '',
        vendorInvoiceDate: '',
        terms: '15 Days Credit',
        accountCode: '40001001',
        accountName: 'Sales - Petroleum Products',
        inventoryLocation: 'DEP-SWL',
        jobNo: 'Sahiwal Dealer Supply',
        employeeRef: 'EMP-005',
        remarks: 'Bulk HSD supply against approved dealer credit.',
        freight: 85000,
        amountSettled: 2500000,
        convertedTo: [],
        lines: [
          { id: '8385d331-29cb-41ef-a083-eca16a01a8d2', itemCode: 'HSD-50', description: 'High Speed Diesel (50 PPM)', quantity: 25000, unit: 'Ltr', rate: 286.8, taxRate: 18, furtherTaxRate: 4, discountPercent: 0, packingDetail: '' },
          { id: '67a84b0a-644a-49b3-bc48-25ffab68007c', itemCode: 'MS-92', description: 'Motor Spirit (RON 92)', quantity: 12000, unit: 'Ltr', rate: 274.5, taxRate: 18, furtherTaxRate: 4, discountPercent: 0, packingDetail: '' }
        ],
        createdAt: '2026-07-24T13:04:11.999Z'
      },
      {
        id: '5bbd4250-0156-4f76-85a3-05c2037343f2',
        serialNo: 'STI-2026-00018',
        date: '2026-07-21',
        status: 'Posted',
        canceled: false,
        partyId: 'CUS-002',
        purchaseOrderNo: 'MHP-0719',
        purchaseOrderDate: '',
        deliveryChallanNo: '',
        deliveryChallanDate: '',
        vendorInvoiceNo: '',
        vendorInvoiceDate: '',
        terms: '15 Days Credit',
        accountCode: '40001001',
        accountName: 'Sales - Petroleum Products',
        inventoryLocation: 'DEP-KHI',
        jobNo: 'Karachi Dealer Supply',
        employeeRef: 'EMP-005',
        remarks: 'Dealer replenishment.',
        freight: 45000,
        amountSettled: 1500000,
        convertedTo: [],
        lines: [
          { id: '696f418a-3a60-4f05-9078-061cc11b3bdb', itemCode: 'MS-92', description: 'Motor Spirit (RON 92)', quantity: 18000, unit: 'Ltr', rate: 274.5, taxRate: 18, furtherTaxRate: 4, discountPercent: 0, packingDetail: '' }
        ],
        createdAt: '2026-07-24T13:04:11.999Z'
      },
      {
        id: '5f6c2c8a-5316-4ce1-b0ab-9a3ee88b1bee',
        serialNo: 'STI-2026-00017',
        date: '2026-07-20',
        status: 'Posted',
        canceled: false,
        partyId: 'CUS-003',
        purchaseOrderNo: 'SLF-2098',
        purchaseOrderDate: '',
        deliveryChallanNo: '',
        deliveryChallanDate: '',
        vendorInvoiceNo: '',
        vendorInvoiceDate: '',
        terms: '15 Days Credit',
        accountCode: '40001001',
        accountName: 'Sales - Petroleum Products',
        inventoryLocation: 'DEP-SWL',
        jobNo: 'Bulk Commercial Supply',
        employeeRef: 'EMP-005',
        remarks: 'Commercial fleet supply.',
        freight: 125000,
        amountSettled: 3000000,
        convertedTo: [],
        lines: [
          { id: 'cf739ac3-762e-424c-b58c-8431370c0700', itemCode: 'HSD-50', description: 'High Speed Diesel (50 PPM)', quantity: 40000, unit: 'Ltr', rate: 284.9, taxRate: 18, furtherTaxRate: 4, discountPercent: 0, packingDetail: '' }
        ],
        createdAt: '2026-07-24T13:04:11.999Z'
      }
    ],
    salesNonTaxInvoices: [
      {
        id: '577e996d-4c59-47b8-aabf-da300f8f2057',
        serialNo: 'SNI-2026-00003',
        date: '2026-07-22',
        status: 'Posted',
        canceled: false,
        partyId: 'CUS-005',
        purchaseOrderNo: '',
        purchaseOrderDate: '',
        deliveryChallanNo: '',
        deliveryChallanDate: '',
        vendorInvoiceNo: '',
        vendorInvoiceDate: '',
        terms: 'Cash',
        accountCode: '40001002',
        accountName: 'Sales - Lubricants',
        inventoryLocation: 'DEP-LHE',
        jobNo: 'Lube Distribution',
        employeeRef: 'EMP-005',
        remarks: 'Lubricant cartons supplied to distributor.',
        freight: 0,
        amountSettled: 1120000,
        convertedTo: [],
        lines: [
          { id: '6d93bee0-b187-4a70-a685-27ad3846b0df', itemCode: 'LUBE-20W50-1L', description: 'Premium Engine Oil 20W-50 (1 Litre)', quantity: 80, unit: 'Carton', rate: 16800, taxRate: 0, furtherTaxRate: 0, discountPercent: 2, packingDetail: '' }
        ],
        createdAt: '2026-07-24T13:04:12.000Z'
      },
      {
        id: '6610799b-584d-47b4-a652-d53f131ff8a2',
        serialNo: 'SNI-2026-00002',
        date: '2026-07-19',
        status: 'Posted',
        canceled: false,
        partyId: 'CUS-002',
        purchaseOrderNo: '',
        purchaseOrderDate: '',
        deliveryChallanNo: '',
        deliveryChallanDate: '',
        vendorInvoiceNo: '',
        vendorInvoiceDate: '',
        terms: 'Cash',
        accountCode: '40001002',
        accountName: 'Sales - Lubricants',
        inventoryLocation: 'DEP-KHI',
        jobNo: 'Retail Outlet Lube Supply',
        employeeRef: 'EMP-005',
        remarks: '',
        freight: 0,
        amountSettled: 495000,
        convertedTo: [],
        lines: [
          { id: '4e748b3c-6812-4860-b1d5-f1f20afc28cd', itemCode: 'LUBE-20W50-1L', description: 'Premium Engine Oil 20W-50 (1 Litre)', quantity: 30, unit: 'Carton', rate: 16800, taxRate: 0, furtherTaxRate: 0, discountPercent: 1.5, packingDetail: '' }
        ],
        createdAt: '2026-07-24T13:04:12.000Z'
      }
    ],
    purchasesSalesTax: [
      {
        id: 'b0943c6a-f0b1-45b7-a4fd-d265bd19efcb',
        serialNo: 'PTI-2026-00009',
        date: '2026-07-22',
        status: 'Posted',
        canceled: false,
        partyId: 'VEN-001',
        purchaseOrderNo: 'PO-IMP-2026-041',
        purchaseOrderDate: '2026-06-18',
        deliveryChallanNo: '',
        deliveryChallanDate: '',
        vendorInvoiceNo: 'CBO-INV-0726-123',
        vendorInvoiceDate: '2026-07-21',
        terms: '30 Days',
        accountCode: '50001002',
        accountName: 'Purchases - Petroleum Products',
        inventoryLocation: 'DEP-KHI',
        jobNo: 'Local Product Procurement',
        employeeRef: 'EMP-004',
        remarks: 'Local HSD procurement received at Keamari.',
        freight: 250000,
        amountSettled: 0,
        convertedTo: [],
        lines: [
          { id: 'bbe437c0-b405-46de-8a0e-4af362c283dc', itemCode: 'HSD-50', description: 'High Speed Diesel (50 PPM)', quantity: 150000, unit: 'Ltr', rate: 262.4, taxRate: 18, furtherTaxRate: 0, discountPercent: 0, packingDetail: '' }
        ],
        createdAt: '2026-07-24T13:04:12.000Z'
      },
      {
        id: 'f1365361-e523-4eb3-bf44-cf77e3ac9f79',
        serialNo: 'PTI-2026-00008',
        date: '2026-07-20',
        status: 'Posted',
        canceled: false,
        partyId: 'VEN-004',
        purchaseOrderNo: 'PO-LUBE-2026-018',
        purchaseOrderDate: '',
        deliveryChallanNo: '',
        deliveryChallanDate: '',
        vendorInvoiceNo: 'MAP-2678',
        vendorInvoiceDate: '',
        terms: '15 Days Credit',
        accountCode: '50001002',
        accountName: 'Purchases - Petroleum Products',
        inventoryLocation: 'DEP-KHI',
        jobNo: 'Lubricant Procurement',
        employeeRef: 'EMP-004',
        remarks: '',
        freight: 0,
        amountSettled: 0,
        convertedTo: [],
        lines: [
          { id: '758dfce8-5fbe-4306-beee-9708dcd66c72', itemCode: 'LUBE-20W50-1L', description: 'Premium Engine Oil 20W-50 (1 Litre)', quantity: 400, unit: 'Carton', rate: 13950, taxRate: 18, furtherTaxRate: 0, discountPercent: 0, packingDetail: '' }
        ],
        createdAt: '2026-07-24T13:04:12.000Z'
      }
    ],
    purchasesNonTax: [
      {
        id: '8f4a8d0b-bcca-405e-8b04-afa8fecb698a',
        serialNo: 'PNI-2026-00006',
        date: '2026-07-22',
        status: 'Posted',
        canceled: false,
        partyId: 'VEN-002',
        purchaseOrderNo: '',
        purchaseOrderDate: '',
        deliveryChallanNo: '',
        deliveryChallanDate: '',
        vendorInvoiceNo: 'ITS-0726-088',
        vendorInvoiceDate: '',
        terms: '15 Days',
        accountCode: '51001001',
        accountName: 'Freight & Carriage',
        inventoryLocation: 'DEP-KHI',
        jobNo: 'Inter-depot Freight',
        employeeRef: 'EMP-004',
        remarks: 'Tanker freight for Karachi to Sahiwal transfer.',
        freight: 0,
        amountSettled: 400000,
        convertedTo: [],
        lines: [
          { id: '56e2c85a-0d64-4d25-97a8-d804ded26504', itemCode: 'FRT-TRIP', description: 'Inter-depot tanker freight', quantity: 8, unit: 'Pcs', rate: 185000, taxRate: 0, furtherTaxRate: 0, discountPercent: 0, packingDetail: '' }
        ],
        createdAt: '2026-07-24T13:04:12.000Z'
      }
    ],
    deliveryChallans: [
      {
        id: 'de69f9c9-1755-49ce-b8f7-ac6600d8ba97',
        serialNo: 'DC-2026-00017',
        date: '2026-07-22',
        status: 'Saved',
        canceled: false,
        partyId: 'CUS-001',
        purchaseOrderNo: 'PO-RFS-0726-18',
        purchaseOrderDate: '2026-07-20',
        deliveryChallanNo: '',
        deliveryChallanDate: '',
        jobNo: 'Sahiwal Dealer Supply',
        inventoryLocation: 'DEP-SWL',
        vehicleDescription: 'TKA-003 · 25,000 Ltr Oil Tanker',
        driverName: 'Shahbaz Ali',
        supplyTime: '15:10',
        remarks: '',
        lines: [
          { id: 'c1fc471e-148d-4329-8e77-ed3c369e084c', itemCode: 'HSD-50', description: 'High Speed Diesel (50 PPM)', quantity: 25000, unit: 'Ltr', rate: 0, taxRate: 0, furtherTaxRate: 0, discountPercent: 0, packingDetail: '5 compartments sealed' }
        ],
        convertedTo: ['STI-2026-00019'],
        createdAt: '2026-07-24T13:04:12.000Z'
      },
      {
        id: 'b70f2a23-b1b1-48bd-b14e-cba7d5e75ff9',
        serialNo: 'DC-2026-00016',
        date: '2026-07-21',
        status: 'Saved',
        canceled: false,
        partyId: 'CUS-002',
        purchaseOrderNo: '',
        purchaseOrderDate: '',
        deliveryChallanNo: '',
        deliveryChallanDate: '',
        jobNo: 'Karachi Dealer Supply',
        inventoryLocation: 'DEP-KHI',
        vehicleDescription: 'TKA-002 · 40,000 Ltr Oil Tanker',
        driverName: 'Javed Iqbal',
        supplyTime: '11:20',
        remarks: '',
        lines: [
          { id: '11cde1ec-1a74-4102-bc17-41471e2242cf', itemCode: 'MS-92', description: 'Motor Spirit (RON 92)', quantity: 18000, unit: 'Ltr', rate: 0, taxRate: 0, furtherTaxRate: 0, discountPercent: 0, packingDetail: '3 compartments sealed' }
        ],
        convertedTo: [],
        createdAt: '2026-07-24T13:04:12.000Z'
      }
    ],
    inwardGatePasses: [
      {
        id: 'ddde8cba-ca58-4481-bfbb-c2f5c8058673',
        serialNo: 'IGP-2026-00003',
        date: '2026-07-22',
        status: 'Saved',
        canceled: false,
        partyId: 'VEN-001',
        purchaseOrderNo: 'PO-IMP-2026-041',
        purchaseOrderDate: '2026-06-18',
        deliveryChallanNo: 'CBO-DC-881',
        deliveryChallanDate: '2026-07-22',
        jobNo: 'Local Product Procurement',
        inventoryLocation: 'DEP-KHI',
        vehicleDescription: 'TKA-001 · 50,000 Ltr Oil Tanker',
        driverName: 'Nadeem Akhtar',
        supplyTime: '09:40',
        remarks: 'Sample passed initial density check.',
        lines: [
          { id: '5b6a71c6-1ff9-4250-b1d9-a5107cfe4718', itemCode: 'HSD-50', description: 'High Speed Diesel (50 PPM)', quantity: 50000, unit: 'Ltr', rate: 0, taxRate: 0, furtherTaxRate: 0, discountPercent: 0, packingDetail: '10 compartments / seals verified' }
        ],
        convertedTo: ['PTI-2026-00009'],
        createdAt: '2026-07-24T13:04:12.000Z'
      }
    ],
    outwardGatePasses: [
      {
        id: '59ec2f26-77aa-4b31-840f-af70e1629de3',
        serialNo: 'OGP-2026-00019',
        date: '2026-07-22',
        status: 'Saved',
        canceled: false,
        partyId: 'CUS-001',
        purchaseOrderNo: 'PO-RFS-0726-18',
        purchaseOrderDate: '2026-07-20',
        deliveryChallanNo: 'DC-2026-00017',
        deliveryChallanDate: '2026-07-22',
        jobNo: 'Sahiwal Dealer Supply',
        inventoryLocation: 'DEP-SWL',
        vehicleDescription: 'TKA-003 · 25,000 Ltr Oil Tanker',
        driverName: 'Shahbaz Ali',
        supplyTime: '15:25',
        remarks: 'Security gate exit verified.',
        lines: [
          { id: '7c41096a-87ac-495a-9ecf-e29d651b95fd', itemCode: 'HSD-50', description: 'High Speed Diesel (50 PPM)', quantity: 25000, unit: 'Ltr', rate: 0, taxRate: 0, furtherTaxRate: 0, discountPercent: 0, packingDetail: '5 compartments sealed' }
        ],
        convertedTo: ['STI-2026-00019'],
        createdAt: '2026-07-24T13:04:12.000Z'
      }
    ],
    bankPayments: [
      {
        id: '31c02046-6bcc-4dea-abfd-930399e790cd',
        serialNo: 'BPV-2026-00010',
        date: '2026-07-22',
        status: 'Posted',
        canceled: false,
        paymentType: 'Party Settlement',
        jobNo: 'Local Product Procurement',
        employeeRef: 'EMP-001',
        accountCode: '11002001',
        partyId: 'VEN-001',
        chequeNo: '00012345',
        chequeDate: '2026-07-24',
        prepayment: 0,
        remarks: 'Part payment against petroleum product invoices.',
        lines: [
          { id: '8e9a4800-bf01-43bd-942c-8d27e6bd3aef', invoiceNo: 'PTI-2026-00009', invoiceDate: '2026-07-22', amount: 15000000, whtRate: 4, whtAmount: 600000, gstRate: 0, gstAmount: 0, advance: 0, discount: 0 }
        ],
        createdAt: '2026-07-24T13:04:12.000Z'
      },
      {
        id: 'b64a720c-d5e0-49da-a9cd-672e2c8c9713',
        serialNo: 'BPV-2026-00009',
        date: '2026-07-20',
        status: 'Posted',
        canceled: false,
        paymentType: 'Party Settlement',
        jobNo: 'Import Shipment IMP-2607-01',
        employeeRef: 'EMP-004',
        accountCode: '11002002',
        partyId: 'VEN-003',
        chequeNo: '00012331',
        chequeDate: '2026-07-20',
        prepayment: 0,
        remarks: 'Port and clearing charges.',
        lines: [
          { id: '3e4b9727-d597-443f-a5ad-21f5fbfc8668', invoiceNo: 'PCS-0726-044', invoiceDate: '2026-07-19', amount: 1250000, whtRate: 8, whtAmount: 100000, gstRate: 0, gstAmount: 0, advance: 0, discount: 0 }
        ],
        createdAt: '2026-07-24T13:04:12.000Z'
      }
    ],
    bankReceipts: [
      {
        id: '10c6f2df-b867-4073-9c6b-3d5586a25f13',
        serialNo: 'BRV-2026-00014',
        date: '2026-07-22',
        status: 'Posted',
        canceled: false,
        paymentType: 'Party Settlement',
        jobNo: 'Dealer Collections',
        employeeRef: 'EMP-001',
        accountCode: '11002001',
        partyId: 'CUS-001',
        chequeNo: 'RFS-CHQ-019',
        chequeDate: '2026-07-22',
        prepayment: 0,
        remarks: 'Receipt against sales tax invoice.',
        lines: [
          { id: '00325d3d-a1b9-460a-9435-970541123967', invoiceNo: 'STI-2026-00019', invoiceDate: '2026-07-22', amount: 2500000, whtRate: 0.5, whtAmount: 12500, gstRate: 0, gstAmount: 0, advance: 0, discount: 0 }
        ],
        createdAt: '2026-07-24T13:04:12.000Z'
      }
    ],
    cashPayments: [
      {
        id: '9b57d02e-88b7-479f-a735-b68e6f54d197',
        serialNo: 'CPV-2026-00010',
        date: '2026-07-22',
        status: 'Posted',
        canceled: false,
        paymentType: 'Petty Payment',
        jobNo: 'Depot Operations',
        employeeRef: 'EMP-002',
        accountCode: '10001001',
        partyId: 'VEN-002',
        chequeNo: '',
        chequeDate: '',
        prepayment: 0,
        remarks: 'Loading labour and local handling.',
        lines: [
          { id: '5cc239d7-e3b9-4d5b-8fa0-91421aaa617d', invoiceNo: 'PETTY-0722', invoiceDate: '2026-07-22', amount: 85000, whtRate: 0, whtAmount: 0, gstRate: 0, gstAmount: 0, advance: 0, discount: 0 }
        ],
        createdAt: '2026-07-24T13:04:12.000Z'
      }
    ],
    cashReceipts: [
      {
        id: '804a65e8-3ddb-4cb7-87e6-6abbd168587c',
        serialNo: 'CRV-2026-00008',
        date: '2026-07-22',
        status: 'Posted',
        canceled: false,
        paymentType: 'Party Settlement',
        jobNo: 'Dealer Collections',
        employeeRef: 'EMP-001',
        accountCode: '10001001',
        partyId: 'CUS-002',
        chequeNo: '',
        chequeDate: '',
        prepayment: 0,
        remarks: 'Cash collection for lubricant invoice.',
        lines: [
          { id: '8fed488b-3229-4b15-b68e-c617701c5951', invoiceNo: 'SNI-2026-00002', invoiceDate: '2026-07-19', amount: 495000, whtRate: 0, whtAmount: 0, gstRate: 0, gstAmount: 0, advance: 0, discount: 0 }
        ],
        createdAt: '2026-07-24T13:04:12.000Z'
      }
    ],
    journalVouchers: [
      {
        id: '8ea3148a-beab-47fd-91a1-715ff6407a5a',
        serialNo: 'JV-2026-00007',
        date: '2026-07-22',
        status: 'Posted',
        narration: 'Month-end freight accrual for unbilled tanker trips.',
        lines: [
          { id: 'f85eb3fe-7eb8-472e-bd31-3cb87de9ed7f', accountCode: '51001001', accountName: 'Freight & Carriage', debit: 1250000, credit: 0, costCenter: 'CC-IMP', description: 'Freight accrual' },
          { id: '0c274340-8fc5-4c81-80af-4b3f05607880', accountCode: '21002001', accountName: 'Trade Payables - Suppliers', debit: 0, credit: 1250000, costCenter: 'CC-IMP', description: 'Accrued payable' }
        ],
        createdAt: '2026-07-24T13:04:12.000Z'
      }
    ],
    inventoryTransactions: [
      { id: '3a1bc67b-fd7c-41d7-89ef-d6694fb8e2a5', date: '2026-07-22', document: 'IGP-2026-00003', type: 'Receipt', depot: 'Karachi Keamari Depot', itemCode: 'HSD-50', description: 'High Speed Diesel (50 PPM)', quantityIn: 50000, quantityOut: 0, balance: 3291000, rate: 262.4 },
      { id: 'aafae65a-3cb7-47b9-b995-97238746b876', date: '2026-07-22', document: 'OGP-2026-00019', type: 'Issue', depot: 'Sahiwal Depot', itemCode: 'HSD-50', description: 'High Speed Diesel (50 PPM)', quantityIn: 0, quantityOut: 25000, balance: 1640000, rate: 286.8 },
      { id: 'ddd3b8e2-1e84-41a2-a5d9-0e9d0d3b9f1e', date: '2026-07-21', document: 'ST-2026-0024', type: 'Transfer Out', depot: 'Karachi Keamari Depot', itemCode: 'HSD-50', description: 'High Speed Diesel (50 PPM)', quantityIn: 0, quantityOut: 40000, balance: 3241000, rate: 262.4 },
      { id: 'e2811f56-a698-42ba-9104-df6ae1e93d9d', date: '2026-07-20', document: 'PTI-2026-00008', type: 'Receipt', depot: 'Karachi Keamari Depot', itemCode: 'LUBE-20W50-1L', description: 'Premium Engine Oil 20W-50 (1 Litre)', quantityIn: 400, quantityOut: 0, balance: 1160, rate: 13950 }
    ],
    ledgerEntries: [
      { id: '950ec810-84e9-40f7-829d-04e1dcf27495', date: '2026-07-22', voucher: 'STI-2026-00019', accountCode: '12001001', accountName: 'Trade Receivables - Dealers', description: 'Rahbar Filling Station - sales invoice', debit: 12676320, credit: 0, balance: 33715000 },
      { id: '67f7fd1c-c422-4969-b0e5-5ec09204b427', date: '2026-07-22', voucher: 'BRV-2026-00014', accountCode: '12001001', accountName: 'Trade Receivables - Dealers', description: 'Receipt from Rahbar Filling Station', debit: 0, credit: 2512500, balance: 31202500 },
      { id: 'cdaa6a47-7bd4-40ca-8711-d72eebc304bd', date: '2026-07-22', voucher: 'PTI-2026-00009', accountCode: '21002001', accountName: 'Trade Payables - Suppliers', description: 'Crescent Base Oils purchase invoice', debit: 0, credit: 46611500, balance: -80500000 },
      { id: '57d36df7-2816-42e6-ac9a-7d0a5a45b1c2', date: '2026-07-22', voucher: 'BPV-2026-00010', accountCode: '21002001', accountName: 'Trade Payables - Suppliers', description: 'Payment to Crescent Base Oils', debit: 15600000, credit: 0, balance: -64900000 },
      { id: '883d1a7d-8f8e-476e-acd1-d23412036aac', date: '2026-07-22', voucher: 'JV-2026-00007', accountCode: '51001001', accountName: 'Freight & Carriage', description: 'Month-end freight accrual', debit: 1250000, credit: 0, balance: 18500000 }
    ],
    auditTrail: [
      { id: '814c32fd-700c-4325-adee-240819782412', dateTime: '2026-07-24 16:10', user: 'System Administrator', action: 'LOGIN', module: 'Security', reference: 'WEB-SESSION-8821', details: 'Successful login from Lahore Head Office' },
      { id: '139755b3-c0d5-4ab2-8d77-6833dd7a7519', dateTime: '2026-07-24 15:58', user: 'Jamal Nasir', action: 'POST', module: 'Bank Payments', reference: 'BPV-2026-00010', details: 'Bank payment posted' },
      { id: '2a81fdf2-4270-4b35-bc32-1c327894d8b2', dateTime: '2026-07-24 15:42', user: 'Aamir Iqbal', action: 'UPDATE', module: 'Tank Reconciliation', reference: 'TR-2026-0722-KHI-T01', details: 'Variance reviewed and comments added' },
      { id: '6d37bca2-9fbc-4a34-b592-1fd30a12118e', dateTime: '2026-07-24 15:05', user: 'Saad Raza', action: 'APPROVE', module: 'Sales Orders', reference: 'SO-2026-0089', details: 'Credit-approved sales order released' }
    ],
    salesQuotations: [
      { id: '28fed6ec-0e86-4f2f-ab2d-292efce8d0b0', number: 'SQ-2026-0041', date: '2026-07-22', customer: 'Sultan Logistics & Fuels', product: 'High Speed Diesel (50 PPM)', quantity: 100000, rate: 284.5, validUntil: '2026-07-26', status: 'Approved' },
      { id: '58ea530c-eaeb-48ae-ae1e-5529893910da', number: 'SQ-2026-0042', date: '2026-07-23', customer: 'Al-Hamd Energy Distributors', product: 'Motor Spirit (RON 92)', quantity: 75000, rate: 273.8, validUntil: '2026-07-27', status: 'Submitted' }
    ],
    salesOrders: [
      { id: 'dd219157-30c6-492d-8733-485b899d0e8e', number: 'SO-2026-0088', date: '2026-07-22', customer: 'Rahbar Filling Station', depot: 'Sahiwal Depot', product: 'High Speed Diesel (50 PPM)', quantity: 25000, rate: 286.8, creditStatus: 'Passed', deliveryDate: '2026-07-22', status: 'Invoiced' },
      { id: '3afe3946-97ce-4840-af97-6de3cb3812af', number: 'SO-2026-0089', date: '2026-07-23', customer: 'Mehran Highway Petroleum', depot: 'Karachi Keamari Depot', product: 'Motor Spirit (RON 92)', quantity: 30000, rate: 274.5, creditStatus: 'Passed', deliveryDate: '2026-07-24', status: 'Approved' }
    ],
    pricing: [
      { id: '3688decc-a4f7-496b-876b-5d95416729d6', effectiveDate: '2026-07-16', product: 'Motor Spirit (RON 92)', exDepotPrice: 267.4, dealerMargin: 5.2, freight: 1.9, retailPrice: 274.5, status: 'Current' },
      { id: '82c25b83-6a9c-4696-8174-92759c4c4a30', effectiveDate: '2026-07-16', product: 'High Speed Diesel (50 PPM)', exDepotPrice: 278.7, dealerMargin: 5.8, freight: 2.3, retailPrice: 286.8, status: 'Current' },
      { id: '4d4a2fac-274a-4ba5-9be2-244d3bd9f0d1', effectiveDate: '2026-07-16', product: 'High Octane Blending Component', exDepotPrice: 320.6, dealerMargin: 6.8, freight: 2.5, retailPrice: 329.9, status: 'Current' }
    ],
    creditControls: [
      { id: 'a7fd01ed-b8ba-44c4-b9f1-f8ea906614a2', dealerCode: 'DLR-0001', dealer: 'Rahbar Filling Station', creditLimit: 18000000, outstanding: 6235000, available: 11765000, overdueDays: 8, riskClass: 'A', status: 'Open' },
      { id: '8303d883-6253-4634-bfae-3da3795fddae', dealerCode: 'DLR-0002', dealer: 'Mehran Highway Petroleum', creditLimit: 12000000, outstanding: 3480000, available: 8520000, overdueDays: 8, riskClass: 'A', status: 'Open' },
      { id: 'aea4e61b-c20b-448a-b146-c90863793087', dealerCode: 'BLK-0001', dealer: 'Sultan Logistics & Fuels', creditLimit: 25000000, outstanding: 9150000, available: 15850000, overdueDays: 8, riskClass: 'A', status: 'Open' },
      { id: '12d99d4d-6b92-4529-b12e-2fed9596db41', dealerCode: 'DLR-0003', dealer: 'Pak Frontier Fuel Point', creditLimit: 10000000, outstanding: 2100000, available: 7900000, overdueDays: 35, riskClass: 'C', status: 'On Hold' },
      { id: '669dbe34-1c93-4bfc-a523-9a12bf1cb048', dealerCode: 'DST-0001', dealer: 'Al-Hamd Energy Distributors', creditLimit: 30000000, outstanding: 12750000, available: 17250000, overdueDays: 8, riskClass: 'A', status: 'Open' }
    ],
    purchaseRequisitions: [
      { id: 'dc302d7a-dc0a-47f9-a59d-781c0755951e', number: 'PR-2026-0038', date: '2026-07-21', requestingDepartment: 'Depot Operations', material: 'High Speed Diesel (50 PPM)', quantity: 1000000, requiredDate: '2026-07-30', estimatedValue: 262400000, status: 'Approved' },
      { id: 'f6e0bffd-d12e-452b-9eaa-b8942c251ec9', number: 'PR-2026-0039', date: '2026-07-22', requestingDepartment: 'Lubricants', material: 'Premium Engine Oil 20W-50', quantity: 1200, requiredDate: '2026-08-05', estimatedValue: 16740000, status: 'Submitted' }
    ],
    rfqs: [
      { id: 'a1c0d36c-d2cf-4155-839c-4a63c9edf308', number: 'RFQ-2026-0019', date: '2026-07-22', material: 'Premium Engine Oil 20W-50', quantity: 1200, vendorsInvited: 4, closingDate: '2026-07-28', bestBid: 0, status: 'Issued' }
    ],
    purchaseOrders: [
      { id: '25460272-6a9d-4f5c-a255-32c02cba64de', number: 'PO-IMP-2026-041', date: '2026-06-18', vendor: 'Crescent Base Oils (Pvt.) Ltd.', material: 'High Speed Diesel (50 PPM)', quantity: 1000000, unitRate: 262.4, deliveryDepot: 'Karachi Keamari Depot', deliveryDate: '2026-07-30', status: 'Partially Received' },
      { id: '932661f7-e2f5-4e6e-a051-c60e62e9585b', number: 'PO-LUBE-2026-018', date: '2026-07-15', vendor: 'Meridian Additives Pakistan', material: 'Premium Engine Oil 20W-50', quantity: 400, unitRate: 13950, deliveryDepot: 'Karachi Keamari Depot', deliveryDate: '2026-07-20', status: 'Completed' }
    ],
    goodsReceipts: [
      { id: '8b4422fa-6298-4297-8150-f1654ad56f1b', number: 'GRN-2026-0055', date: '2026-07-22', poNumber: 'PO-IMP-2026-041', vendor: 'Crescent Base Oils (Pvt.) Ltd.', depot: 'Karachi Keamari Depot', product: 'High Speed Diesel (50 PPM)', receivedQty: 50000, acceptedQty: 49820, status: 'Posted' }
    ],
    stockTransfers: [
      { id: '74695edb-9bd8-4d98-9b1e-5f15de4841f5', number: 'ST-2026-0024', date: '2026-07-22', fromDepot: 'Karachi Keamari Depot', toDepot: 'Sahiwal Depot', product: 'High Speed Diesel (50 PPM)', quantity: 40000, vehicle: 'TKA-002', status: 'In Transit' },
      { id: '297ac893-3779-476f-bab5-a67251cc95a8', number: 'ST-2026-0023', date: '2026-07-20', fromDepot: 'Karachi Keamari Depot', toDepot: 'Hattar Depot', product: 'Motor Spirit (RON 92)', quantity: 50000, vehicle: 'TKA-001', status: 'Received' }
    ],
    stockAdjustments: [
      { id: '5dd4031f-b01d-4a95-89c8-39cb25eeb359', number: 'SA-2026-0012', date: '2026-07-22', depot: 'Karachi Keamari Depot', product: 'Motor Spirit (RON 92)', quantity: -7500, reason: 'Temperature Correction', approvedBy: 'Jamal Nasir', status: 'Posted' }
    ],
    budgets: [
      { id: '7b581455-bd14-4502-b3fb-d39cacc9db5e', year: '2026-27', costCenter: 'Karachi Depot Operations', account: 'Depot Operating Expenses', annualBudget: 84000000, actual: 38200000, committed: 10080000, status: 'Approved' },
      { id: '00c27506-7667-4e97-ba0d-6e87d898370f', year: '2026-27', costCenter: 'Sahiwal Depot Operations', account: 'Depot Operating Expenses', annualBudget: 56000000, actual: 25100000, committed: 6720000, status: 'Approved' },
      { id: '67ca8a9c-bf72-4b2c-93a4-d6d3895f48c2', year: '2026-27', costCenter: 'Hattar Depot Operations', account: 'Depot Operating Expenses', annualBudget: 48000000, actual: 21450000, committed: 5760000, status: 'Approved' },
      { id: '14e4f23b-4ae8-4603-84f9-f44b1c0cabfe', year: '2026-27', costCenter: 'Imports & Logistics', account: 'Freight & Carriage', annualBudget: 125000000, actual: 64700000, committed: 15000000, status: 'Approved' },
      { id: '6e8c59f1-1657-4c08-b7ce-a1a5bfb24582', year: '2026-27', costCenter: 'Corporate Head Office', account: 'Depot Operating Expenses', annualBudget: 72000000, actual: 33800000, committed: 8640000, status: 'Approved' }
    ],
    costAllocations: [
      { id: 'a433074c-947c-4bd4-bca4-301da6aaa0fd', number: 'CA-2026-0004', period: 'Jul-2026', sourceCostCenter: 'Corporate Head Office', targetCostCenter: 'Karachi Depot Operations', basis: 'Volume', amount: 1850000, status: 'Calculated' }
    ],
    importContracts: [
      { id: '2f679319-8f68-45d7-b4e2-d7a46967a3cf', number: 'IC-2026-0007', contractDate: '2026-06-02', supplier: 'Gulf Meridian Energy FZE', product: 'High Speed Diesel 50 PPM', quantityMT: 12000, priceUSD: 765, incoterm: 'CFR Karachi', port: 'Port Qasim', status: 'Shipped' },
      { id: '41be47f1-a192-4790-84e4-74fab7866de2', number: 'IC-2026-0008', contractDate: '2026-07-10', supplier: 'Eastern Blend Oils DMCC', product: 'Base Oil SN-500', quantityMT: 3500, priceUSD: 920, incoterm: 'CIF Karachi', port: 'Karachi Port', status: 'LC Opened' }
    ],
    lettersOfCredit: [
      { id: '7510d20d-90c2-43a5-97df-045b1e310e67', lcNumber: 'LC-IMP-2607-004', openingDate: '2026-06-08', bank: 'HBL - Import Account', supplier: 'Gulf Meridian Energy FZE', currency: 'USD', amount: 9180000, expiryDate: '2026-08-31', contractNumber: 'IC-2026-0007', status: 'Documents Received' },
      { id: 'fa99b999-8dd6-4266-a80b-35e4aa7df638', lcNumber: 'LC-IMP-2607-005', openingDate: '2026-07-15', bank: 'HBL - Import Account', supplier: 'Eastern Blend Oils DMCC', currency: 'USD', amount: 3220000, expiryDate: '2026-09-30', contractNumber: 'IC-2026-0008', status: 'Opened' }
    ],
    shipments: [
      { id: 'c4f6a840-9111-4f50-8782-5eb7754b99e8', shipmentNo: 'IMP-2607-01', contractNumber: 'IC-2026-0007', vessel: 'MT Ocean Crest', billOfLading: 'BL-GME-260701', product: 'High Speed Diesel 50 PPM', quantityMT: 12000, portOfLoading: 'Fujairah', destinationPort: 'Port Qasim', eta: '2026-07-29', status: 'Sailed' },
      { id: '3ab06022-504f-48a1-a7d6-ccc09187680b', shipmentNo: 'IMP-2608-02', contractNumber: 'IC-2026-0008', vessel: 'To Be Nominated', billOfLading: '', product: 'Base Oil SN-500', quantityMT: 3500, portOfLoading: 'Jebel Ali', destinationPort: 'Karachi Port', eta: '2026-08-20', status: 'Nominated' }
    ],
    clearingCosts: [
      { id: 'a75f0483-86f4-4d06-a271-be04a24fc135', shipmentNo: 'IMP-2607-01', costType: 'Port Charges', vendor: 'Portlink Clearing Services', documentNo: 'PCS-EST-044', date: '2026-07-22', amount: 3250000, status: 'Estimated' },
      { id: '7e506f7e-4cfc-4a6e-87f6-dcf7b7501d54', shipmentNo: 'IMP-2607-01', costType: 'Customs Duty', vendor: 'Pakistan Customs (Demo)', documentNo: 'GD-DRAFT-2607', date: '2026-07-22', amount: 48500000, status: 'Estimated' }
    ],
    landedCosts: [
      { id: '189d14d5-ecfe-4740-b9fe-2b038834434f', shipmentNo: 'IMP-2607-01', product: 'High Speed Diesel 50 PPM', invoiceValue: 2560000000, freight: 118000000, dutiesTaxes: 510000000, portClearing: 18500000, inlandFreight: 12500000, landedCostPerLtr: 269.8, status: 'Estimated' }
    ],
    importDocuments: [
      { id: '9c60712d-ab64-4874-b635-8c51014d6a50', shipmentNo: 'IMP-2607-01', documentType: 'Commercial Invoice', documentNo: 'GME-CI-2607-118', issueDate: '2026-07-15', receivedDate: '2026-07-20', remarks: 'Original set received through bank.', status: 'Verified' },
      { id: '4b4ebd01-21cb-46e1-bfd7-a8a1ef77ecf4', shipmentNo: 'IMP-2607-01', documentType: 'Bill of Lading', documentNo: 'BL-GME-260701', issueDate: '2026-07-16', receivedDate: '2026-07-20', remarks: 'Three originals.', status: 'Verified' },
      { id: 'c2c64b02-fd1c-4339-820e-d7ab0178d1ce', shipmentNo: 'IMP-2607-01', documentType: 'Quality Certificate', documentNo: 'QC-GME-0716', issueDate: '2026-07-16', receivedDate: '2026-07-20', remarks: 'Lab results within contract specification.', status: 'Verified' }
    ],
    tankerDispatches: [
      { id: '621d88a5-5114-4044-83bb-ab5cd76d6181', dispatchNo: 'DSP-2026-0077', date: '2026-07-22', salesOrder: 'SO-2026-0088', depot: 'Sahiwal Depot', customer: 'Rahbar Filling Station', product: 'High Speed Diesel (50 PPM)', quantity: 25000, vehicle: 'TKA-003', driver: 'Shahbaz Ali', sealNumbers: 'S-7711 to S-7715', status: 'Delivered' },
      { id: '0a4a99bd-861d-4a05-9870-3dfca0e3bc36', dispatchNo: 'DSP-2026-0078', date: '2026-07-24', salesOrder: 'SO-2026-0089', depot: 'Karachi Keamari Depot', customer: 'Mehran Highway Petroleum', product: 'Motor Spirit (RON 92)', quantity: 30000, vehicle: 'TKA-001', driver: 'Nadeem Akhtar', sealNumbers: 'S-7720 to S-7725', status: 'Planned' }
    ],
    dipReadings: [
      { id: 'd2541d3e-1a8f-4793-916a-7c19a2311d03', date: '2026-07-22', time: '06:00', depot: 'Karachi Keamari Depot', tank: 'KHI-T01', product: 'Motor Spirit (RON 92)', dipMM: 3150, temperature: 31.5, observedVolume: 2512500, standardVolume: 2504963, recordedBy: 'Shahid Mehmood' },
      { id: '78c00915-41e2-4793-92b9-aebea40fd3a5', date: '2026-07-22', time: '06:00', depot: 'Karachi Keamari Depot', tank: 'KHI-T02', product: 'High Speed Diesel (50 PPM)', dipMM: 3320, temperature: 30.2, observedVolume: 3291000, standardVolume: 3281127, recordedBy: 'Shahid Mehmood' },
      { id: 'dec25676-3208-41db-a228-bf1ff33d0208', date: '2026-07-22', time: '06:00', depot: 'Sahiwal Depot', tank: 'SWL-T01', product: 'Motor Spirit (RON 92)', dipMM: 3490, temperature: 34.1, observedVolume: 1176500, standardVolume: 1172971, recordedBy: 'Aamir Iqbal' },
      { id: '7dd52e9d-41d6-4f8c-a40d-dd9eb099531d', date: '2026-07-22', time: '06:00', depot: 'Sahiwal Depot', tank: 'SWL-T02', product: 'High Speed Diesel (50 PPM)', dipMM: 3660, temperature: 33, observedVolume: 1647800, standardVolume: 1642857, recordedBy: 'Aamir Iqbal' },
      { id: 'dbc67a7f-fec1-49aa-8b62-973b8099a9a9', date: '2026-07-22', time: '06:00', depot: 'Hattar Depot', tank: 'HTR-T01', product: 'High Speed Diesel (50 PPM)', dipMM: 3830, temperature: 28.4, observedVolume: 1215200, standardVolume: 1211554, recordedBy: 'Aamir Iqbal' }
    ],
    tankReconciliation: [
      { id: 'e907cb4d-901a-41da-b4f8-aeb00d53c5a4', number: 'TR-2026-0722-KHI-T01', date: '2026-07-22', depot: 'Karachi Keamari Depot', tank: 'KHI-T01', product: 'Motor Spirit (RON 92)', openingStock: 2650000, receipts: 0, issues: 130000, bookClosing: 2520000, physicalClosing: 2512500, variance: -7500, status: 'Reviewed' },
      { id: '038c1806-c34e-47b1-8a28-56b865ef6623', number: 'TR-2026-0722-KHI-T02', date: '2026-07-22', depot: 'Karachi Keamari Depot', tank: 'KHI-T02', product: 'High Speed Diesel (50 PPM)', openingStock: 3280000, receipts: 50000, issues: 39000, bookClosing: 3291000, physicalClosing: 3291000, variance: 0, status: 'Approved' }
    ],
    productMovements: [
      { id: 'dbca78c4-bb10-4d93-8b13-79ff7a2997b3', movementNo: 'MOV-2026-0288', date: '2026-07-22', movementType: 'Local Purchase', depot: 'Karachi Keamari Depot', product: 'High Speed Diesel (50 PPM)', quantity: 50000, reference: 'IGP-2026-00003', status: 'Posted' },
      { id: '532a69f1-8633-46d8-8ab7-9607bd6520a3', movementNo: 'MOV-2026-0289', date: '2026-07-22', movementType: 'Dealer Dispatch', depot: 'Sahiwal Depot', product: 'High Speed Diesel (50 PPM)', quantity: -25000, reference: 'OGP-2026-00019', status: 'Posted' }
    ],
    priceNotifications: [
      { id: '7b9a489f-8bd4-49f4-9d6a-01a4f36368f7', notificationNo: 'PN-2026-0716-01', effectiveDate: '2026-07-16', product: 'Motor Spirit (RON 92)', oldPrice: 271.2, newPrice: 274.5, change: 3.3, approvedBy: 'Chief Executive', status: 'Published' },
      { id: '4918af26-0334-41bb-bf84-aec1a3f15f90', notificationNo: 'PN-2026-0716-02', effectiveDate: '2026-07-16', product: 'High Speed Diesel (50 PPM)', oldPrice: 283.1, newPrice: 286.8, change: 3.7, approvedBy: 'Chief Executive', status: 'Published' }
    ],
    users: [
      { id: 'aee72722-a697-4e5c-86d8-d1b4ab698ae8', name: 'System Administrator', email: 'admin@purepetroleum.demo', role: 'System Administrator', location: 'Lahore Head Office', lastLogin: '24 Jul 2026, 4:10 PM', status: 'Active' },
      { id: '3f60a394-d242-4d19-af58-7b06993fddf5', name: 'Jamal Nasir', email: 'finance@purepetroleum.demo', role: 'Finance Manager', location: 'Lahore Head Office', lastLogin: '24 Jul 2026, 3:55 PM', status: 'Active' },
      { id: '39961dac-e182-491b-9f3e-b40fddb7dbc7', name: 'Aamir Iqbal', email: 'sahiwal.depot@purepetroleum.demo', role: 'Depot Manager', location: 'Sahiwal Depot', lastLogin: '24 Jul 2026, 2:35 PM', status: 'Active' }
    ],
    approvals: [
      { id: 'b9f5c74f-2b4f-48d2-8aba-a3959295d909', documentType: 'Sales Order', threshold: 10000000, level1: 'Sales Manager', level2: 'Finance Manager', level3: 'Chief Executive', status: 'Active' },
      { id: '5052e35f-2362-4a9f-92d7-c6a1a6ddf7b3', documentType: 'Purchase Order', threshold: 25000000, level1: 'Supply Chain Manager', level2: 'Finance Manager', level3: 'Chief Executive', status: 'Active' },
      { id: '6eea7f1d-37e7-4d47-b596-3fa569788699', documentType: 'Bank Payment', threshold: 5000000, level1: 'Finance Manager', level2: 'Chief Executive', level3: '', status: 'Active' }
    ]
  } as Record<string, any[]>,

  company: {
    name: 'Pure Petroleum (Pvt.) Limited',
    shortName: 'PURE PETROLEUM',
    address: 'Lahore Head Office, Punjab, Pakistan',
    phone: '+92 42 0000 0000',
    ntn: '0000000-0',
    strn: '00-00-0000-000-00',
    financialYear: '01 Jul 2026 – 30 Jun 2027',
    currency: 'PKR',
    theme: 'red'
  } as CompanyInfo
}

// Utility Helpers
export function clone<T>(o: T): T {
  return JSON.parse(JSON.stringify(o))
}

export function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return 'id-' + Date.now() + '-' + Math.random().toString(36).slice(2)
}

export function money(v: number | string | undefined | null): string {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0
  }).format(Number(v || 0))
}

export function num(v: number | string | undefined | null, d = 0): string {
  return new Intl.NumberFormat('en-PK', {
    minimumFractionDigits: d,
    maximumFractionDigits: d
  }).format(Number(v || 0))
}

export function today(): string {
  return new Date().toISOString().slice(0, 10)
}

export function totalRecord(r: any, type: string): number {
  const lines = r.lines || []
  if (type === 'document') {
    let gross = 0
    let tax = 0
    let disc = 0
    for (const l of lines) {
      const g = Number(l.quantity || 0) * Number(l.rate || 0)
      gross += g
      disc += (g * Number(l.discountPercent || 0)) / 100
      tax += ((g - (g * Number(l.discountPercent || 0)) / 100) * (Number(l.taxRate || 0) + Number(l.furtherTaxRate || 0))) / 100
    }
    return gross - disc + tax + Number(r.freight || 0)
  }
  if (type === 'voucher') {
    return (
      lines.reduce(
        (s: number, l: any) =>
          s +
          Number(l.amount || 0) -
          Number(l.whtAmount || 0) -
          Number(l.gstAmount || 0) -
          Number(l.discount || 0) +
          Number(l.advance || 0),
        0
      ) + Number(r.prepayment || 0)
    )
  }
  if (type === 'journal') {
    return lines.reduce((s: number, l: any) => s + Number(l.debit || 0), 0)
  }
  return lines.reduce((s: number, l: any) => s + Number(l.quantity || 0), 0)
}

export function nextNo(prefix: string, arr: any[]): string {
  const y = new Date().getFullYear()
  const n = String(arr.length + 1).padStart(5, '0')
  return `${prefix}-${y}-${n}`
}

export function iconForModule(key: string): string {
  const map: Record<string, string> = {
    dashboard: '▦',
    customers: 'CU',
    vendors: 'VE',
    items: 'IT',
    depots: 'DP',
    outlets: 'RO',
    vehicles: 'TK',
    drivers: 'DR',
    employees: 'EM',
    salesTaxInvoices: 'ST',
    salesNonTaxInvoices: 'SN',
    deliveryChallans: 'DC',
    outwardGatePasses: 'OG',
    salesQuotations: 'SQ',
    salesOrders: 'SO',
    pricing: '₨',
    creditControls: 'CC',
    salesReport: 'SR',
    purchaseRequisitions: 'PR',
    rfqs: 'RF',
    purchaseOrders: 'PO',
    inwardGatePasses: 'IG',
    purchasesSalesTax: 'PT',
    purchasesNonTax: 'PN',
    goodsReceipts: 'GR',
    stockTransfers: '⇄',
    stockAdjustments: '±',
    inventoryBalance: 'IB',
    inventoryLedger: 'IL',
    purchaseReport: 'RP',
    chartOfAccounts: 'CO',
    journalVouchers: 'JV',
    bankPayments: 'BP',
    bankReceipts: 'BR',
    cashPayments: 'CP',
    cashReceipts: 'CR',
    accountsLedger: 'AL',
    customerBalance: 'CB',
    vendorBalance: 'VB',
    trialBalance: 'TB',
    profitLoss: 'PL',
    balanceSheet: 'BS',
    costCenters: 'CT',
    profitCenters: 'PC',
    budgets: 'BU',
    costAllocations: 'CA',
    budgetVariance: '%',
    profitability: 'π',
    importContracts: 'IC',
    lettersOfCredit: 'LC',
    shipments: 'SH',
    clearingCosts: 'CL',
    landedCosts: '₨',
    importDocuments: 'ID',
    tanks: 'TN',
    tankerDispatches: 'TD',
    dipReadings: 'DP',
    tankReconciliation: 'TR',
    productMovements: 'PM',
    lossGainAnalysis: '±',
    priceNotifications: 'PN',
    users: 'US',
    approvals: 'AP',
    auditTrail: 'AT',
    companySettings: '⚙'
  }
  return map[key] || '•'
}

export const useErpStore = defineStore('erp', {
  state: () => {
    let savedState: any = null
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) savedState = JSON.parse(raw)
    } catch (e) {
      console.warn('Failed loading local state:', e)
    }

    const groupOpenState: Record<string, boolean> = {}
    ERP_BOOTSTRAP.navGroups.forEach((g, idx) => {
      groupOpenState[g.title] = idx < 5
    })

    return {
      navGroups: ERP_BOOTSTRAP.navGroups,
      moduleConfigs: ERP_BOOTSTRAP.moduleConfigs,
      data: savedState?.data ? savedState.data : clone(ERP_BOOTSTRAP.initialData),
      company: savedState?.company ? savedState.company : clone(ERP_BOOTSTRAP.company),
      role: savedState?.role || 'System Administrator',
      activeModule: 'dashboard',
      searchQuery: '',
      moduleSearchQuery: '',
      groupOpen: groupOpenState,
      mobileOpen: false,

      // Auth state
      isAuthenticated: localStorage.getItem('pure_petroleum_auth') === 'true',
      authUser: JSON.parse(localStorage.getItem('pure_petroleum_user') || 'null') || {
        name: 'Syed Asif Ali',
        email: 'admin@purepetroleum.com.pk',
        role: 'System Administrator',
        avatar: 'SA'
      },

      // Reports State
      reportFrom: '2026-07-01',
      reportTo: '2026-07-24',
      reportSearch: '',
      reportShown: false,

      // Modal State
      modalState: null as {
        isOpen: boolean
        editing: boolean
        record: any
        moduleKey: string
      } | null,

      // Toasts
      toasts: [] as Array<{ id: string; message: string }>
    }
  },

  getters: {
    currentConfig(state): ModuleConfig | undefined {
      return state.moduleConfigs[state.activeModule]
    },

    allModules(state) {
      return state.navGroups.flatMap((g) =>
        g.items.map((i) => ({
          ...i,
          group: g.title
        }))
      )
    },

    activeTitle(state): string {
      if (state.activeModule === 'dashboard') return 'Executive Dashboard'
      return state.moduleConfigs[state.activeModule]?.title || 'Module'
    }
  },

  actions: {
    saveToStorage() {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            data: this.data,
            company: this.company,
            role: this.role
          })
        )
      } catch (e) {
        console.error('Save error:', e)
      }
    },

    addToast(message: string) {
      const id = generateId()
      this.toasts.push({ id, message })
      setTimeout(() => {
        this.toasts = this.toasts.filter((t) => t.id !== id)
      }, 2500)
    },

    go(key: string) {
      this.activeModule = key
      this.modalState = null
      this.reportShown = false
      this.mobileOpen = false
      const targetPath = key === 'dashboard' ? '/' : `/${key}`
      window.history.pushState({}, '', window.location.origin + targetPath)
    },

    toggleGroup(groupTitle: string) {
      this.groupOpen[groupTitle] = !this.groupOpen[groupTitle]
    },

    partyName(partyId: string, config?: ModuleConfig): string {
      if (!partyId) return ''
      const datasetKey = config?.partyDataset
      const ds = datasetKey
        ? this.data[datasetKey] || []
        : [...(this.data.customers || []), ...(this.data.vendors || [])]
      const p = ds.find((x: any) => x.id === partyId || x.code === partyId)
      return p ? p.name : partyId
    },

    openNewRecordModal(moduleKey?: string) {
      const mKey = moduleKey || this.activeModule
      const c = this.moduleConfigs[mKey]
      if (!c) return

      const arr = this.data[c.dataset || mKey] || []
      let record: any = {}

      if (arr.length > 0) {
        record = clone(arr[0])
        record.id = generateId()
        for (const k of Object.keys(record)) {
          if (k === 'id') continue
          if (k === 'lines') record.lines = [this.blankLine(c.type, record.lines?.[0])]
          else if (k === 'date' || k.toLowerCase().endsWith('date')) record[k] = today()
          else if (k === 'status') record[k] = 'Draft'
          else if (k === 'serialNo') record[k] = nextNo(c.prefix || 'DOC', arr)
          else if (typeof record[k] === 'number') record[k] = 0
          else if (Array.isArray(record[k])) record[k] = []
          else if (['partyId', 'accountCode', 'accountName', 'inventoryLocation'].includes(k)) {
            // Keep template string intact
          } else record[k] = ''
        }
      } else {
        record = { id: generateId(), status: 'Draft' }
        ;(c.fields || []).forEach((f) => {
          record[f.key] = f.type === 'number' ? 0 : f.type === 'date' ? today() : ''
        })
      }

      this.modalState = {
        isOpen: true,
        editing: false,
        record,
        moduleKey: mKey
      }
    },

    openEditRecordModal(id: string, moduleKey?: string) {
      const mKey = moduleKey || this.activeModule
      const c = this.moduleConfigs[mKey]
      if (!c) return
      const arr = this.data[c.dataset || mKey] || []
      const found = arr.find((x: any) => x.id === id)
      if (!found) return

      this.modalState = {
        isOpen: true,
        editing: true,
        record: clone(found),
        moduleKey: mKey
      }
    },

    closeModal() {
      this.modalState = null
    },

    blankLine(type: string, sample?: any): any {
      const lineKeysMap: Record<string, string[]> = {
        journal: ['accountCode', 'accountName', 'debit', 'credit', 'costCenter', 'description'],
        voucher: ['invoiceNo', 'invoiceDate', 'amount', 'whtRate', 'whtAmount', 'gstRate', 'gstAmount', 'advance', 'discount'],
        document: ['itemCode', 'description', 'quantity', 'unit', 'rate', 'taxRate', 'furtherTaxRate', 'discountPercent', 'packingDetail'],
        gatepass: ['itemCode', 'description', 'quantity', 'unit', 'rate', 'taxRate', 'furtherTaxRate', 'discountPercent', 'packingDetail']
      }
      const keys = sample ? Object.keys(sample).filter((k) => k !== 'id') : lineKeysMap[type] || ['description', 'quantity', 'rate', 'amount']
      const o: any = { id: generateId() }
      keys.forEach((k) => {
        o[k] = sample && typeof sample[k] === 'number' ? 0 : ''
      })
      return o
    },

    addLineToModal() {
      if (!this.modalState) return
      const c = this.moduleConfigs[this.modalState.moduleKey]
      if (!c) return
      if (!this.modalState.record.lines) this.modalState.record.lines = []
      this.modalState.record.lines.push(this.blankLine(c.type, this.modalState.record.lines[0]))
    },

    removeLineFromModal(index: number) {
      if (!this.modalState?.record?.lines) return
      this.modalState.record.lines.splice(index, 1)
    },

    saveRecord() {
      if (!this.modalState) return
      const mKey = this.modalState.moduleKey
      const c = this.moduleConfigs[mKey]
      if (!c) return

      const arrKey = c.dataset || mKey
      if (!this.data[arrKey]) this.data[arrKey] = []

      // Validate balanced journal entry
      if (c.type === 'journal') {
        const lines = this.modalState.record.lines || []
        const d = lines.reduce((s: number, l: any) => s + Number(l.debit || 0), 0)
        const cr = lines.reduce((s: number, l: any) => s + Number(l.credit || 0), 0)
        if (Math.abs(d - cr) > 0.01) {
          alert('Journal voucher is not balanced. Total Debit must equal total Credit.')
          return
        }
      }

      const arr = this.data[arrKey]
      const idx = arr.findIndex((x: any) => x.id === this.modalState?.record?.id)
      if (idx >= 0) {
        arr[idx] = clone(this.modalState.record)
      } else {
        arr.unshift(clone(this.modalState.record))
      }

      this.saveToStorage()
      this.addToast('Record saved successfully')
      this.modalState = null
    },

    deleteRecord(id: string, moduleKey?: string) {
      if (!confirm('Are you sure you want to delete this record?')) return
      const mKey = moduleKey || this.activeModule
      const c = this.moduleConfigs[mKey]
      const arrKey = c?.dataset || mKey
      if (this.data[arrKey]) {
        this.data[arrKey] = this.data[arrKey].filter((x: any) => x.id !== id)
        this.saveToStorage()
        this.addToast('Record deleted')
      }
    },

    togglePost(id: string, moduleKey?: string) {
      const mKey = moduleKey || this.activeModule
      const c = this.moduleConfigs[mKey]
      const arrKey = c?.dataset || mKey
      const r = (this.data[arrKey] || []).find((x: any) => x.id === id)
      if (r) {
        r.status = r.status === 'Posted' ? 'Saved' : 'Posted'
        this.saveToStorage()
        this.addToast(r.status === 'Posted' ? 'Document posted' : 'Document unposted')
      }
    },

    advanceWorkflow(id: string, moduleKey?: string) {
      const mKey = moduleKey || this.activeModule
      const c = this.moduleConfigs[mKey]
      if (!c || !c.stages?.length) return
      const arrKey = c.dataset || mKey
      const r = (this.data[arrKey] || []).find((x: any) => x.id === id)
      if (r) {
        const i = c.stages.indexOf(r.status)
        r.status = c.stages[Math.min(i + 1, c.stages.length - 1)] || c.stages[0]
        this.saveToStorage()
        this.addToast(`Workflow advanced to ${r.status}`)
      }
    },

    convertRecord(id: string, moduleKey?: string) {
      const mKey = moduleKey || this.activeModule
      const c = this.moduleConfigs[mKey]
      if (!c || !c.convertActions?.length) return

      const targetModuleKey = c.convertActions[0]
      const tc = this.moduleConfigs[targetModuleKey]
      if (!tc) return

      const arrKey = c.dataset || mKey
      const r = (this.data[arrKey] || []).find((x: any) => x.id === id)
      if (!r) return

      const targetArr = this.data[tc.dataset || targetModuleKey] || []
      const nr = {
        id: generateId(),
        serialNo: nextNo(tc.prefix || 'DOC', targetArr),
        date: today(),
        status: 'Draft',
        partyId: r.partyId,
        purchaseOrderNo: r.purchaseOrderNo || '',
        purchaseOrderDate: r.purchaseOrderDate || '',
        deliveryChallanNo: r.serialNo || '',
        deliveryChallanDate: r.date || '',
        jobNo: r.jobNo || '',
        inventoryLocation: r.inventoryLocation || '',
        remarks: `Converted from ${r.serialNo || r.number || ''}`,
        lines: clone(r.lines || [])
      }

      if (!this.data[tc.dataset || targetModuleKey]) {
        this.data[tc.dataset || targetModuleKey] = []
      }
      this.data[tc.dataset || targetModuleKey].unshift(nr)

      r.convertedTo = r.convertedTo || []
      r.convertedTo.push(nr.serialNo)
      this.saveToStorage()
      this.addToast(`Converted to ${tc.title}`)
      this.go(targetModuleKey)
    },

    resetDemoData() {
      if (confirm('Reset all demo records to their original values?')) {
        localStorage.removeItem(STORAGE_KEY)
        this.data = clone(ERP_BOOTSTRAP.initialData)
        this.company = clone(ERP_BOOTSTRAP.company)
        this.role = 'System Administrator'
        this.addToast('Demo data reset')
      }
    },

    saveSettings(updatedCompany: CompanyInfo, role: string) {
      this.company = { ...updatedCompany }
      this.role = role
      this.saveToStorage()
      this.addToast('Settings saved')
    },

    exportCsv(cols: Array<{ key: string; label: string }>, rows: any[], config?: ModuleConfig) {
      const lines = [cols.map((x) => `"${x.label}"`).join(',')]
      for (const r of rows) {
        lines.push(
          cols
            .map((x) => {
              let v = r[x.key]
              if (x.key === 'partyId') v = this.partyName(v, config)
              if (x.key === 'lines') v = config ? totalRecord(r, config.type) : ''
              return `"${String(v ?? '').replaceAll('"', '""')}"`
            })
            .join(',')
        )
      }
      const blob = new Blob([lines.join('\n')], { type: 'text/csv' })
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = `${config?.dataset || 'report'}-${today()}.csv`
      a.click()
      URL.revokeObjectURL(a.href)
      this.addToast('CSV exported')
    },

    login(email: string, role: string = 'System Administrator', name: string = 'Syed Asif Ali') {
      const parts = name.trim().split(' ')
      const initials = (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase() || 'SA'
      this.isAuthenticated = true
      this.role = role
      this.authUser = {
        name,
        email: email || 'admin@purepetroleum.com.pk',
        role,
        avatar: initials
      }
      localStorage.setItem('pure_petroleum_auth', 'true')
      localStorage.setItem('pure_petroleum_user', JSON.stringify(this.authUser))
      this.saveToStorage()
      this.addToast(`Welcome back, ${name}!`)
    },

    demoLogin(roleName: string = 'System Administrator') {
      const names: Record<string, string> = {
        'System Administrator': 'Syed Asif Ali',
        'Finance Manager': 'Tariq Mehmood',
        'Depot Operations Supervisor': 'Zohaib Khan',
        'Sales Executive': 'Bilal Ahmed'
      }
      const emails: Record<string, string> = {
        'System Administrator': 'admin@purepetroleum.com.pk',
        'Finance Manager': 'finance@purepetroleum.com.pk',
        'Depot Operations Supervisor': 'depot@purepetroleum.com.pk',
        'Sales Executive': 'sales@purepetroleum.com.pk'
      }
      const name = names[roleName] || 'Demo Administrator'
      const email = emails[roleName] || 'demo@purepetroleum.com.pk'
      this.login(email, roleName, name)
    },

    logout() {
      this.isAuthenticated = false
      localStorage.removeItem('pure_petroleum_auth')
      localStorage.removeItem('pure_petroleum_user')
      this.addToast('Logged out of Pure Petroleum ERP')
    }
  }
})
