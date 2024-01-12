import { BillInfo } from "../model/BillInfo";

export const billFormatOrderRequest = (billing: BillInfo): BillInfo => {
    billing.billEntity = billing.billType === 'final' ? null : billing.billEntity;
    billing.dui = billing.billType === 'final' || billing.billEntity === 'natural' ? billing.dui : null; 
    billing.iva = billing.billType === 'final' ? null : billing.iva;
    return billing;
}