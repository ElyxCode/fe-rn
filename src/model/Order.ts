import { Address } from "./Address";
import { Card } from "./Card";
import { BillInfo } from "./BillInfo";
import { Product } from "./product";

export interface Order {
    id:                     number;
    created_at:             string;
    branch:                 OrderBranch;
    state:                  State;
    transport:              Transport | null;
    address:                Address;
    delivery:               Delivery;
    subtotal:               string;
    discount:               string;
    coupon_discount:        string;
    total:                  string;
    weight:                 string;
    items:                  Item[];
    quantity:               number;
    delivery_time:          null;
    cancellation_reason:    null;
    review:                 Review | null;
    transaction_id:         number | null;
    transaction:            Transaction | null;
    special_discount:       boolean;
    subtotal_with_discount: string;
}

export interface LocationElement {
    lat: number;
    lng: number;
}

export interface OrderBranch {
    id:                number;
    name:              BranchName;
    description:       string;
    branch:            null;
    delivery_time:     DeliveryTime | null;
    address:           null | string;
    phone:             null | string;
    schedule:          Schedule | null;
    logo:              string;
    banner:            string;
    location:          LocationElement;
    distance:          null;
    rating:            string;
    allow_cash:        boolean;
    distance_for_free: string;
    amount_for_free:   null;
}

export enum DeliveryTime {
    Entre12Horas = "Entre 1-2 horas",
    Entre23Dias = "Entre 2-3 dias",
    Entre24Horas = "Entre 2-4 horas",
    Entre56Horas = "Entre 5-6 horas",
    The12 = "1-2",
}

export enum BranchName {
    BloquesDeLaPeñaEscalón = "Bloques de la Peña - Escalón",
    EPASANBenito = "EPA - San Benito",
    Ferrebodega = "ferrebodega",
    FerreteríaElConstructor = "Ferretería El constructor",
    FerreteríaSanchezSANBenito = "Ferretería Sanchez - San Benito",
    HomeDepotEscalón = "Home Depot - Escalón",
    LaCasaDeLasHerramientas = "La casa de las herramientas",
    PruebaEnvíoGratisKM = "Prueba Envío gratis (KM)",
    VidríEscalón = "Vidrí - Escalón",
}

export enum Schedule {
    LUNVie830AM730PMSáb800AM1200PM = "Lun-Vie 8:30 a.m. -7:30 p.m.  Sáb 8:00 a.m.-12:00 p.m.",
    LunesASábado800AM600PM = "Lunes a Sábado 8:00 a.m. - 6:00 p.m.",
    LunesAViernesDe8A5 = "lunes  a viernes de 8 a 5",
    LunesAViernesDe8AmA5Pm = "Lunes a Viernes de 8am a 5pm",
    ScheduleLunesAViernesDe8AmA5Pm = "Lunes a viernes de 8am a 5pm",
}

export enum Delivery {
    The000 = "0.00",
    The1663 = "16.63",
    The351 = "3.51",
    The392 = "3.92",
    The491 = "4.91",
    The513284 = "5,132.84",
    The702 = "7.02",
    The7334 = "73.34",
    The737 = "7.37",
    The745 = "7.45",
}

export interface Item {
    id:       number;
    product:  Product;
    quantity: number;
    price:    string;
}

export interface ProductBranch {
    id:                number;
    name:              BranchName;
    logo:              Logo;
    banner:            Banner;
    description:       string;
    delivery_time:     DeliveryTime | null;
    created_at:        string;
    updated_at:        string;
    location:          PurpleLocation;
    address:           null | string;
    phone:             null | string;
    schedule:          Schedule | null;
    delivery_zone:     LocationElement[] | null;
    allow_cash:        boolean;
    enable:            boolean;
    active:            boolean;
    min_amount:        string;
    distance_for_free: string;
    amount_for_free:   null;
}

export enum Banner {
    FMSTTXDSXboGx4VWnZqxgosfADGBNmjcsJMyczRIPNG = "FMsTTXDSXboGx4VWnZqxgosfADGBNmjcsJMyczRI.png",
    JNi4KMD2UVzAlSv4Ygbh4EJhCTBshiQuOOTILPVaPNG = "jNi4kmD2uVzAlSv4Ygbh4EJhCTBshiQuOoTiLPVa.png",
    O3AbmxDMwYPZl6ITzLzWri97LOgl4Bh9AYOc38UUPNG = "o3abmxDMwYPZl6iTzLzWri97LOgl4bh9AYOc38uU.png",
    The1U9CWbS6N9Q75VoGPuMs1HICJs7OCg7XmMuVKS1FPNG = "1u9CWbS6N9q75voGPuMs1HICJs7OCg7xmMuVKS1F.png",
    WI8Yz8EzodMlSfvbqwgFCAol1KNhxftkxI0HOIW1PNG = "WI8Yz8EzodMlSfvbqwgFCAol1kNhxftkxI0HOIW1.png",
    ZM6NtcfmvAGjczAIEbEVGX0NrtHn0QFnfNBPICtfPNG = "zM6ntcfmvAGjczAiEbEVGX0nrtHn0qFnfNBPICtf.png",
}

export interface PurpleLocation {
    type:        Type;
    coordinates: number[];
}

export enum Type {
    Point = "Point",
}

export enum Logo {
    KHLKvMIRHpvK1JEXAKVwLOdFDFs9VLhrf2NyyjslPNG = "KHLKvMIRHpvK1JEXAKVwLOdFDFs9VLhrf2Nyyjsl.png",
    Kvq1WPUJoKsc4Cm5HiGznSp26EzONDDZc1NlvMi8PNG = "Kvq1wPUJoKsc4cm5HiGznSp26ezONDdZc1nlvMi8.png",
    Lli6QJiZGoWRb5BRp5NG6FsrDao3DpiiYSPz686RPNG = "lli6qJiZGoWRb5bRp5NG6FsrDao3DpiiYSPz686r.png",
    M8IRGLJaQZoiulAH19G9Q1O1F8WBsxYsOARYhOefPNG = "m8irGLJaQZoiulAH19g9q1o1F8wBsxYsOARYhOef.png",
    RNB7EiYOQiOUYVvCZLidZi4XTMCTkvmd8MP7UTxYPNG = "rNB7eiYOQiOUYVvCZLidZi4xTMCTkvmd8mP7uTxY.png",
    The8ZMbsVIOkW3ZhDH3FnleDT4T5R0GM2R1Ujn8BjzQPNG = "8ZMbsVIOkW3ZhDH3fnleDT4T5r0GM2r1Ujn8BjzQ.png",
}

export interface Brand {
    id:          number;
    name:        BrandName;
    description: Description | null;
    logo:        string;
}

export enum Description {
    Herramientas = "Herramientas",
    HerramientasTotal = "Herramientas Total",
}

export enum BrandName {
    Ferretool = "Ferretool",
    Stanley = "Stanley",
    Total = "Total",
}

export enum Category {
    AditivosParaCemento = "Aditivos para cemento",
    AgrícolaYJardinería = "Agrícola y jardinería",
    Construcción = "Construcción",
    Domésticos = "Domésticos",
    EléctricoEIluminación = "Eléctrico e iluminación",
    Ferretería = "Ferretería",
    Fontanería = "Fontanería",
    HerramientaAgrícolaYJardín = "Herramienta agrícola y jardín",
    Herramientas = "Herramientas",
    HerramientasManuales = "Herramientas manuales",
    Hierro = "Hierro",
    LaminaGalvanizadaYAluminio = "Lamina galvanizada y aluminio",
    MantenimientoAgrícolaYJardín = "Mantenimiento agrícola y jardín",
    Mascotas = "Mascotas",
    Pintura = "Pintura",
    TablaRoca = "Tabla roca",
}

export interface Review {
    id:         number;
    order_id:   number;
    value:      string;
    comments:   null | string;
    created_at: string;
    updated_at: string;
}

export interface ReviewOrderResponse {
    order_id:   string;
    comments:   string;
    value:      string;
    updated_at: string;
    created_at: string;
    id:         number;
}

export enum State {
    Aceptado = "aceptado",
    Cancelado = "cancelado",
    Rechazado = "rechazado",
    Creado = "creado",
    Entregado = "entregado",
    Camino = "camino",
    Asignado = "asignado",
}

export interface Transaction {
    id:             number;
    client_id:      number;
    method:         Method;
    status:         Status;
    bill_type:      BillType;
    bill_entity:    BillEntity | null;
    dui:            Dui | null;
    iva:            Iva | null;
    file_id:        null;
    amount:         string;
    response:       null | string;
    created_at:     string;
    updated_at:     string;
    credit_card_id: number | null;
}

export enum BillEntity {
    Juridica = "juridica",
    Natural = "natural",
}

export enum BillType {
    Credit = "credit",
    Final = "final",
}

export enum Dui {
    The012345678 = "01234567-8",
    The564654569 = "56465456-9",
    The654654564 = "65465456-4",
}

export enum Iva {
    The455644 = "4556-44",
    The5465645 = "546564-5",
    The6545645 = "654564-5",
}

export enum Method {
    Card = "card",
    Cash = "cash",
    Transfer = "transfer",
}

export enum Status {
    Pending = "pending",
    Rejected = "rejected",
    Success = "success",
}

export interface Transport {
    id:                   number;
    transport_type_id:    number;
    driver:               string;
    licence_plate:        string;
    image:                string;
    state:                string;
    created_at:           string;
    updated_at:           string;
    dui:                  string;
    driver_licence:       null;
    dui_photo:            string;
    driver_licence_photo: string;
    car_id_photo:         string;
    capacity:             string;
    gallon:               string;
    people:               number;
    daily_capacity:       number;
    branch_id:            number;
    enable:               boolean;
    brand:                null | string;
    model:                null | string;
    year:                 number | null;
    driver_picture:       null | string;
    email:                null;
}

export interface OrderRequestDTO {
    branchId:    number;
    addressId:   number;
    couponCode?: string;
    method:      string;
    fileId?:     string;
    products:    Product[];
    cardId?:      string;
    card?:        Card;
    billInfo:    BillInfo;
    phone:       string;
    cardMonth?:   string;
    cardYear?:    string;       
}

export interface OrderCreateResponse {
    order:                  Order;
    transaction:            Transaction;
    items:                  Product[];
    weight:                 number;
    distance:               string;
    transport:              string;
    discount:               string;
    promo:                  string;
    subtotal:               string;
    subtotal_with_discount: string;
    total:                  string;
    special_discount:       boolean;
}

export interface OrderCreateErrorResponse {
    "0":    number;
    errors: Errors;
}

export interface Errors {
    address_id: string[];
    discount_id: string[];
    total:      string[];
}

