"use client";

import { Order, Product, User } from "@prisma/client";
import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { formatPrice } from "@/utils/FormatPrice";
import { formatNumber } from "@/utils/FormatNumber";

interface SummaryProps {
  orders: Order[];
  products: Product[];
  users: User[];
}

type SummaryDataType = {
  [key: string]: {
    label: string;
    digit: number;
  };
};

const Summary: React.FC<SummaryProps> = ({ orders, products, users }) => {
  const [summaryData, setSummaryData] = useState<SummaryDataType>({
    sale: {
      label: "Total de Vendas",
      digit: 0,
    },
    products: {
      label: "Total de Produtos",
      digit: 0,
    },
    orders: {
      label: "Total de Pedidos",
      digit: 0,
    },
    paidOrders: {
      label: "Total de Pedidos Pagos",
      digit: 0,
    },
    unpaidOrders: {
      label: "Total de Pedidos Não Pagos",
      digit: 0,
    },
    users: {
      label: "Total de Usuários",
      digit: 0,
    },
  });

  useEffect(() => {
    setSummaryData((prev) => {
      let temporaryData = { ...prev };
      const totalSale = orders.reduce((acc, item) => {
        if (item.status === "complete") {
          return acc + item.amount;
        } else {
          return acc;
        }
      }, 0);

      const paidOrders = orders.filter((order) => {
        return order.status === "complete";
      });

      const unpaidOrders = orders.filter((order) => {
        return order.status === "pending";
      });

      temporaryData.sale.digit = totalSale;
      temporaryData.orders.digit = orders.length;
      temporaryData.paidOrders.digit = paidOrders.length;
      temporaryData.unpaidOrders.digit = unpaidOrders.length;
      temporaryData.products.digit = products.length;
      temporaryData.users.digit = users.length;

      return temporaryData;
    });
  }, [orders, products, users]);

  const summaryKeys = Object.keys(summaryData);

  return (
    <div className="max-w-[1150px] m-auto">
      <div className="mb-4 mt-8">
        <Heading title="Status" center />
      </div>
      <div className="grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto">
        {summaryKeys &&
          summaryKeys.map((key) => {
            return (
              <div
                className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition"
                key={key}
              >
                <div className="text-xl md:text-4xl font-bold">
                  {summaryData[key].label === "Total de Vendas" ? (
                    <>{formatPrice(summaryData[key].digit)}</>
                  ) : (
                    <>{formatNumber(summaryData[key].digit)}</>
                  )}
                </div>
                <div>{summaryData[key].label}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Summary;
