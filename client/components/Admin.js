import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUsers} from '../store/admin'
import {deletePizza} from '../store/pizzas'
import {withRouter} from 'react-router-dom'

class Admin extends Component {
  constructor() {
    super()
    this.handleRemovePizza = this.handleRemovePizza.bind(this)
  }

  componentDidMount() {
    this.props.getUsers()
  }

  handleRemovePizza(pizzaId) {
    this.props.deletePizza(pizzaId)
  }
  render() {
    return (
      <div>
        <h1>Welcome, {this.props.name}!</h1>
        <h3>{this.props.email}</h3>
        <h4>Here is a list of users!</h4>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Admin?</th>
            </tr>
            {this.props.users.map(user => (
              <tr key={user.id}>
                <td> {user.name}</td>
                <td> {user.email}</td>
                <td> {`${user.isAdmin}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h4>Here is a list of Pizzas!</h4>

        <div>
          {this.props.pizzas.map(pizza => {
            return (
              <div key={pizza.id}>
                <p>{pizza.name}</p>
                <span>
                  <button
                    type="button"
                    onClick={() => {
                      this.handleRemovePizza(pizza.id)
                    }}
                  >
                    Remove from Inventory
                  </button>
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    name: state.user.name,
    email: state.user.email,
    users: state.users,
    pizzas: state.pizzas.allPizzas
  }
}

export default withRouter(connect(mapState, {getUsers, deletePizza})(Admin))
