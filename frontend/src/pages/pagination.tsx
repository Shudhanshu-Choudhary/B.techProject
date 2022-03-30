import React from 'react'
import { Pagination } from 'semantic-ui-react'

const PaginationExampleCompact = ({ totalPages, defaultActivePage, changePageNumberHandler }) => (
    
  <Pagination
    boundaryRange={2}
    defaultActivePage={defaultActivePage}
    siblingRange={1}
    totalPages={totalPages}
    onPageChange={changePageNumberHandler}
  />
)

export default PaginationExampleCompact