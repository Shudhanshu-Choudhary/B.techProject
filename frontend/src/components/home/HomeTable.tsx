import React from "react";
import { Table } from "semantic-ui-react";

const HomeTable = ()=>{
  const renderTableBody = ()=>{
    return(
      <Table.Body>
        <Table.Row>
          <Table.Cell>NAKD</Table.Cell>
          <Table.Cell>6</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>CCIV</Table.Cell>
          <Table.Cell>6</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>ITRM</Table.Cell>
          <Table.Cell>5</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>NAKD</Table.Cell>
          <Table.Cell>0</Table.Cell>
        </Table.Row>
      </Table.Body>
    );
  };
  return(
    <Table celled selectable style={{ border: "0" }}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Ticker</Table.HeaderCell>
          <Table.HeaderCell>Mentions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      {renderTableBody()}
    </Table>
  );
};
export default HomeTable;
