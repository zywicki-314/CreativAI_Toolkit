import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PRODUCTS } from "../static/products";

interface IPoductsListProps {}

const ProductsList: FC<IPoductsListProps> = ({}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {PRODUCTS.map((product) => (
        <Card key={product.title} className="flex-1 text-center">
          <CardHeader className="flex flex-col items-center">
            <CardTitle>{product.title}</CardTitle>
            {product.icon}
          </CardHeader>
          <CardContent>{product.description}</CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductsList;
