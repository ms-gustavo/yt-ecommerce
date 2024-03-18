import Container from "@/app/components/Container";
import ProductDetails from "@/app/components/Products/ProductDetails";
import { product } from "@/utils/product";

interface IParams {
  productId?: string;
}

const Product = ({ params }: { params: IParams }) => {
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
      </Container>
    </div>
  );
};

export default Product;
