"use client";

import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { formatPrice } from "@/utils/FormatPrice";
import { Order } from "@prisma/client";
import moment from "moment";
import { useRouter } from "next/navigation";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import OrderItem from "./OrderItem";

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
    <div className="max-w-[1150px] m-auto flex flex-col gap-2">
      <div className="mt-8">
        <Heading title="Detalhes do pedido" />
      </div>
      <div>ID do pedido: {order.id}</div>
      <div>
        Total:{" "}
        <span className="font-bold">{formatPrice(order.amount / 100)}</span>
      </div>
      <div className="flex gap-2 items-center">
        <div>Status do pagamento: </div>
        <div>
          {order.status === "pending" ? (
            <Status
              text="Aguardando..."
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order.status === "complete" ? (
            <Status
              text="Pago"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div>Status da entrega: </div>
        <div>
          {order.deliveryStatus === "pending" ? (
            <Status
              text="Aguardando..."
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order.deliveryStatus === "dispatched" ? (
            <Status
              text="A caminho..."
              icon={MdDeliveryDining}
              bg="bg-purple-200"
              color="text-purple-700"
            />
          ) : order.deliveryStatus === "delivered" ? (
            <Status
              text="Entregue"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>Data: {moment(order.createdDate).fromNow()}</div>
      <div>
        <h2 className="font-semibold mt-4 mb-2">Produtos:</h2>
        <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
          <div className="col-span-2 justify-self-start">PRODUTO</div>
          <div className=" justify-self-center">PREÇO</div>
          <div className=" justify-self-center">QUANTIDADE</div>
          <div className=" justify-self-end">TOTAL</div>
        </div>
        {order.products && order.products.map((item) => {
         return <OrderItem key={item.id} item={item}></OrderItem>
        })}
      </div>
    </div>
  );
};

export default OrderDetails;
