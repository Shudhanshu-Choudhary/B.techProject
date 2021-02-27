import React from "react";
import {Card, Feed, Table} from 'semantic-ui-react';
import "../../assets/scss/components/home/homeContent.scss";

const HomeContent = ()=>{
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
        )
    }
    const renderTweets = ()=>{
        return(
                <Card.Content>
                    <Feed>
                        <Feed.Event>
                            <Feed.Content className='hc-card-content'>
                                <Feed.Date content='1 day ago' />
                                <Feed.Summary>
                                    You added Jenny Hess to your coworker group.
                                </Feed.Summary>
                            </Feed.Content>
                        </Feed.Event>

                        <Feed.Event>
                            <Feed.Content className='hc-card-content'>
                                <Feed.Date content='3 days ago' />
                                <Feed.Summary>
                                    You added Molly Malone as a friend.
                                </Feed.Summary>
                            </Feed.Content>
                        </Feed.Event>

                        <Feed.Event>
                            <Feed.Content className='hc-card-content'>
                                <Feed.Date content='4 days ago' />
                                <Feed.Summary>
                                    You added Elliot Baker to your musicians group.
                                </Feed.Summary>
                            </Feed.Content>
                        </Feed.Event>
                    </Feed>
                </Card.Content>
        )
    }

    return(
        <div className="hc-main-container">
            <Card className="hc-first-container hc-card">
                <div className='hc-card-header'>Most Mentioned Activity</div>
                {renderTweets()}
            </Card>
            <Card className="hc-second-container hc-card">
                <div className='hc-card-header'>Most Mentioned Activity</div>
                <div className='hc-table-container'>
                    <Table celled selectable style={{border:'0'}}>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Ticker</Table.HeaderCell>
                                <Table.HeaderCell>Mentions</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        {renderTableBody()}
                    </Table>
                </div>
            </Card>
        </div>
    )
}
export default HomeContent;
