import { BillInfo } from "../model/BillInfo";

export const billFormatOrderRequest = (billing: BillInfo): BillInfo => {
    billing.bill_entity = billing.bill_type === 'final' ? null : billing.bill_entity;
    billing.dui = billing.bill_type === 'final' || billing.bill_entity === 'natural' ? billing.dui : null; 
    billing.iva = billing.bill_type === 'final' ? null : billing.iva;
    return billing;
}