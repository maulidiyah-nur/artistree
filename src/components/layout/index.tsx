import React from 'react'

import ILayoutProps from './type'

const Layout = (props: ILayoutProps) => {
    const { children } = props
    return <div className="layout">{children}</div>
}

export default Layout
