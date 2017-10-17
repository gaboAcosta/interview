import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import { observer, inject } from 'mobx-react'


@inject('UsersListStore') @observer
class UsersList extends Component {

    constructor (props) {
        super(props)
        this.store = new this.props.UsersListStore()
    }

    componentDidMount () {
        this.fetchUsers()
    }

    fetchUsers () {
        this.store.fetchUsers()
    }

    render () {

        const { users } = this.store

        return (
            <div>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            users.map((user) => {
                                return(
                                    <Table.Row key={user._id}>
                                        <Table.Cell>{user.name}</Table.Cell>
                                    </Table.Row>
                                )
                            })
                        }
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

export default UsersList