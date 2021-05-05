import React, { Component } from 'react'

export class MainLayout extends Component {

    render() {

        let { children } = this.props

        return (
            <>
                {children}
            </>
        )
    }
}
