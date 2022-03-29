import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table } from "semantic-ui-react";
import StockFormatterService from "../../services/stockFormatter.service";

const DbTable = ()=>{
  const [stocks, setStocks] = useState(null);
  const { allStocks } = useSelector((state: any) => {
    const allStocks = state.dashboard.stockData.stock;
    return {
      allStocks,
    }
  });
  useEffect(() => {
    if (allStocks) {
      const parsedStockArr = StockFormatterService.convertStocksToArray(allStocks);
      const data = StockFormatterService.getTopNStocks(parsedStockArr,8);
      setStocks(data);
    }
  }, [allStocks]);
  const renderTableBody = ()=>{
    const rows: JSX.Element[] = [];
    if(!stocks) return [];
    stocks.forEach((stock: {name: string, mentions: number}) => {
      rows.push(<Table.Row key={stock.name}>
        <Table.Cell>{stock.name}</Table.Cell>
        <Table.Cell>{stock.mentions}</Table.Cell>
      </Table.Row>);
    });
    return rows;
  };
  return(
    <Table celled selectable style={{ border: "0" }}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Ticker</Table.HeaderCell>
          <Table.HeaderCell>Mentions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {renderTableBody()}
      </Table.Body>
    </Table>
  );
};
export default DbTable;
