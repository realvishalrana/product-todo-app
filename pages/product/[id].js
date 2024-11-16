import { useRouter } from "next/router";
import ProductIndex from "@/components/Product";
import useProduct from "@/hooks/useProduct";
import { useEffect } from "react";
import HeaderWrapper from "@/components/HeaderWrapper";
import WithAuth from "@/hoc/WithAuth";
import routes from "@/utils/routes";

const ProductFormPage = () => {
  const { formik, handleEditProduct, products } = useProduct();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id && id !== "new") {
      const productIndex = products.findIndex(
        (prod) => prod.index === parseInt(id)
      );
      if (productIndex !== -1) {
        handleEditProduct(productIndex);
      }
    }
  }, [id, products]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = await formik.validateForm();
    formik.handleSubmit();
    if (Object.keys(errors).length === 0) {
      router.push(routes.product);
    }
  };

  return (
    <HeaderWrapper>
      <ProductIndex
        formik={{ ...formik, handleSubmit }}
        editIndex={id !== "new" ? parseInt(id) : null}
      />
    </HeaderWrapper>
  );
};

export default WithAuth(ProductFormPage);
