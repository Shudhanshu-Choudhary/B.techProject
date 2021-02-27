import React from 'react';
import {Icon, Menu, Table} from "semantic-ui-react";

const TableView = ()=>{
    const renderTableBody = ()=>{
        return(
            <>
                <Table.Row>
                    <Table.Cell>20/1/21</Table.Cell>
                    <Table.Cell>Quote of the day</Table.Cell>
                    <Table.Cell>Hello,My Name is Rohan Saroha</Table.Cell>
                    <Table.Cell>No Attachments</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>20/1/21</Table.Cell>
                    <Table.Cell>Quote of the day</Table.Cell>
                    <Table.Cell>Hello,My Name is Rohan Saroha</Table.Cell>
                    <Table.Cell>No Attachments</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>20/1/21</Table.Cell>
                    <Table.Cell>Quote of the day</Table.Cell>
                    <Table.Cell>Hello,My Name is Rohan Saroha</Table.Cell>
                    <Table.Cell>No Attachments</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>20/1/21</Table.Cell>
                    <Table.Cell>Quote of the day</Table.Cell>
                    <Table.Cell>Hello,My Name is Rohan Saroha</Table.Cell>
                    <Table.Cell>No Attachments</Table.Cell>
                </Table.Row>
            </>
        )
    }
    return(
        <div className="tableView-main-container">
            <Table celled selectable style={{border:'0'}}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Descriptions</Table.HeaderCell>
                        <Table.HeaderCell>Attachments</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {renderTableBody()}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='3'>
                            <Menu floated='right' pagination>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron left' />
                                </Menu.Item>
                                <Menu.Item as='a'>1</Menu.Item>
                                <Menu.Item as='a'>2</Menu.Item>
                                <Menu.Item as='a'>3</Menu.Item>
                                <Menu.Item as='a'>4</Menu.Item>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron right' />
                                </Menu.Item>
                            </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </div>
    )
}
export default TableView;
