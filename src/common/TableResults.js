import React from 'react'

// headers: { col1: { display: "One", col: "one_1" }, col2: { display: "Two", col: "two_2" } },
// uniqueIdField: "id",
// data: [
//   {id: 1, one_1: "row 1 column 1", two_2: "row 1 column 2"},
//   {id: 2, one_1: "row 2 column 1", two_2: "row 2 column 2"}
// ]
const TableResults = ({ headers={}, uniqueIdField, data, actions }) => (
  <div>
    <table className="table table-striped table-bordered table-align-center">
      <thead>
        {actions ? renderActionsHeader({actions}) : '' }
        {Object.keys(headers).map(
          key => (
            <th>{headers[key].display}</th>
          )
        )}
      </thead>
      <tbody>
        {data.map(
          item => (
            <tr id={item[uniqueIdField]}>
              {actions ? renderActionsBody({actions, item}) : '' }
              {Object.keys(headers).map(
                key => (
                  <td>{item[headers[key].col]}</td>
                )
              )}
            </tr>
          )
        )}
      </tbody>
    </table>
  </div>
);

const renderActionsHeader = ({ actions }) => (
  <th>{actions.label}</th>
);

const renderActionsBody = ({ actions, item }) => (
  <td>
    { actions.viewlink ? <a href={item[actions.viewlink.dataCol]}>{actions.viewlink.display}</a> : '' }
    { actions.editlink ? <a href={item[actions.editlink.dataCol]}>{actions.editlink.display}</a> : '' }
  </td>
);

export default TableResults;
