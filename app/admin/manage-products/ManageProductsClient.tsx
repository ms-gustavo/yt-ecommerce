"use client";

import { Product } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/FormatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import {
  MdCached,
  MdClose,
  MdDelete,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseApp from "@/libs/firebase";

interface ManageProductsClientProps {
  products: Product[];
}

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({
  products,
}) => {
  const router = useRouter();
  const storage = getStorage(firebaseApp);
  let rows: any = [];
  if (products) {
    rows = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: formatPrice(product.price),
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
        images: product.images,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Nome", width: 220 },
    {
      field: "price",
      headerName: "Preço(R$)",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.price}</div>
        );
      },
    },
    { field: "category", headerName: "Categoria", width: 100 },
    { field: "brand", headerName: "Marca", width: 100 },
    {
      field: "inStock",
      headerName: "Em estoque",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {params.row.inStock === true ? (
              <Status
                text="Em estoque"
                icon={MdDone}
                bg="bg-teal-200"
                color="text-teal-700"
              />
            ) : (
              <Status
                text="Fora de estoque"
                icon={MdClose}
                bg="bg-rose-200"
                color="text-rose-700"
              />
            )}
          </>
        );
      },
    },
    {
      field: "actions",
      headerName: "Ações",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full">
            <ActionBtn
              title="Alterar Estoque"
              icon={MdCached}
              onClick={() => {
                handleToggleStock(params.row.id, params.row.inStock);
              }}
            />
            <ActionBtn
              title="Remover produto"
              icon={MdDelete}
              onClick={() => {
                handleDelete(params.row.id, params.row.images);
              }}
            />
            <ActionBtn
              title="Detalhes do produto"
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/product/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  const handleToggleStock = useCallback((id: string, inStock: boolean) => {
    axios
      .put("/api/product", {
        id,
        inStock: !inStock,
      })
      .then((response) => {
        toast.success("Status do produto alterado");
        router.refresh();
      })
      .catch((error) => {
        console.log("Error", error);
        toast.error("Oops! Algo de errado aconteceu");
      });
  }, []);

  const handleDelete = useCallback(async (id: string, images: any[]) => {
    toast("Deletando produto. Por favor aguarde...");

    const handleImageDelete = async () => {
      try {
        for (const item of images) {
          if (item.image) {
            const imageRef = ref(storage, item.image);
            await deleteObject(imageRef);
            console.log("image deleted", item.image);
          }
        }
      } catch (error) {
        return console.log("Erro ao deletar imagem", error);
      }
    };

    await handleImageDelete();

    axios
      .delete(`/api/product/${id}`)
      .then((response) => {
        toast.success("Produto apagado");
        router.refresh();
      })
      .catch((error) => {
        toast.error("Erro ao apagar o produto");
        console.log("Erro: ", error);
      });
  }, []);

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Gerenciar Produtos" center />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ManageProductsClient;
