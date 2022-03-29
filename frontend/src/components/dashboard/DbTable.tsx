import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table } from "semantic-ui-react";
import StockFormatterService from "../../services/stockFormatter.service";

const DbTable = ()=>{
  const [stocks, setStocks] = useState(null);
  const stocksArr = useSelector((state: any) => state.dashboard.allStocks);
  useEffect(() => {
    if (stocksArr) {
      const data = StockFormatterService.getTopNStocks(stocksArr,8);
      console.log("table data", data);
      setStocks(data);
    }
  }, [stocksArr]);
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
