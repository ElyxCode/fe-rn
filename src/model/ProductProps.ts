import { Product } from "./product";

export type ProductProps = {
    product: Product,
    navigation:any
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  };