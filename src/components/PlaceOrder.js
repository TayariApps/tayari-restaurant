import React from 'react'

export default function PlaceOrder() {
  return (
    <div>
        <table className='table table-borderless'>
            <thead>
                <tr>
                    <th>
                        Item
                    </th>
                    <th>
                        Price
                    </th>
                    <th>
                        Quantity
                    </th>
                    <th>
                        Total(in Tsh)
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        Shack Burger
                    </td>
                    <td>
                        13000
                    </td>
                    <td>
                        1
                    </td>
                    <td>
                        13000
                    </td>
                </tr>
                <tr>
                    <td>
                        Shack Burger
                    </td>
                    <td>
                        13000
                    </td>
                    <td>
                        1
                    </td>
                    <td>
                        13000
                    </td>
                </tr>
                <tr>
                    <td>
                        Shack Burger
                    </td>
                    <td>
                        13000
                    </td>
                    <td>
                        1
                    </td>
                    <td>
                        13000
                    </td>
                </tr>
            </tbody>
            <tbody style={{ background: "#f7f7f7" }}>
                <tr>
                <td></td>
                <td></td>
                  <td>
                    <small>Sub Total</small>
                  </td>
                  <td>
                    <small>Tzs 42000</small>
                  </td>
                </tr>
                <tr>
                <td></td>
                <td></td>
                  <td>
                    <small>Service fee</small>
                  </td>
                  <td>
                    <small>Tzs 0.00</small>
                  </td>
                </tr>
                <tr>
                <td></td>
                <td></td>
                  <td>
                    <small>Total Paid in CASH</small>
                  </td>
                  <td>
                    <small>Tzs 42000</small>
                  </td>
                </tr>
              </tbody>
        </table>
    </div>
  )
}
