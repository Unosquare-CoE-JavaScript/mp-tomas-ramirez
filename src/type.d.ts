/*
- [ ] IProduct(id, name, image, description, price)
- [ ] CartItem(id, productId, quantity)
- [ ] ICart(content: carItem[])
 */
interface IProduct {
  id: number;
  title: string;

  image: string;
  description: string;
  price: number;
}

interface ICartItem {
  id: number;
  product: IProduct;

  quantity: number;
}

type CartState = {
  cartItemsByProductId: { [productId: string]: ICartItem };
};

type ProductAction = {
  type: string;
  cartItem: IProduct;
};

type DispatchType = (args: ProductAction) => ProductAction;
