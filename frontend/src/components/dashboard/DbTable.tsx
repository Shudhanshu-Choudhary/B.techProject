import React, { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import StockFormatterService from "../../services/stockFormatter.service";

const DbTable = ()=>{
  const [stocks, setStocks] = useState(null);
  useEffect(() => {
    if(!stocks) {
      const data = StockFormatterService.getTopNStocks(8);
      console.log("table data", data);
      setStocks(data);
    }
  }, []);
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
