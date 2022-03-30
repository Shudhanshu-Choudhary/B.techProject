import React from 'react'
import { Pagination } from 'semantic-ui-react'

const PaginationExampleCompact = (prop:any) => (
    
  <Pagination
    boundaryRange={0}
    defaultActivePage={1}
    ellipsisItem={null}
    firstItem={null}
    lastItem={null}
    siblingRange={1}
    totalPages={prop.totalPages}
  />
)

export default PaginationExampleCompact