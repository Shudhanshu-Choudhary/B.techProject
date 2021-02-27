import React from "react";
import {Card, Feed} from "semantic-ui-react";

const HomeTweets = ()=>{
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
export default HomeTweets;
