import React, { useState } from "react";
import {
  Grid,
  DragDropProvider,
  Table,
  TableHeaderRow,
  TableColumnReordering,
} from "@devexpress/dx-react-grid-material-ui";
import data from "../datas/MOCK_DATA.json";
import "bootstrap/dist/css/bootstrap.min.css";
import Edit from "./edit";

const DragTable = () => {
  const [columns, setColumns] = useState([
    { name: "first_name", title: "First name", edit: false },
    { name: "last_name", title: "Last name", edit: false },
    { name: "email", title: "Email", edit: false },
    { name: "ip_address", title: "Ip address", edit: false },
  ]);

  const [rows_lines, setRows] = useState(data);
  const [columnOrder, setColumnOrder] = useState(["first_name", "last_name", "email", "ip_address"]);

  /**
   * Modification du title de l'objet columns
   * Mode un peu bourin, devrait être optimisé
   * J'ai volontairement laissé le code simple pour une meilleur comprehension
   */
  const changeColName = (e) => {
    let newColumnsTitle = columns.map(column => {
      if(column.edit === true) return {...column, title: e.target.value}
      else return column
    })
    setColumns(newColumnsTitle);
  };

  /**
   * Ici on défini quelle column est en edition
   */
  const editColName = (name) => {
    let newColumnsEditable = columns.map(column => {
      if(column.name === name) return {...column, edit: true}
      else return column
    })
    setColumns(newColumnsEditable);
  };

  /**
   * Re initialisation des état d'edit à false
   * quand on sort du champ
   * Ajouter un bouton de validation
   * ou un listener pour la touche Entrée
   */
  const initEditable = () => {
    let newColumnsEditable = columns.map(column => {
      return {...column, edit: false}
    })
    setColumns(newColumnsEditable);
  }

  return (
    <div>
      {rows_lines && (
        <Grid rows={rows_lines} columns={columns}>
          <DragDropProvider />
          <Table striped bordered hover variant="dark" />

          <TableColumnReordering
            order={columnOrder}
            onOrderChange={(order) => {
              setColumnOrder(order);
            }}
          />
          <TableHeaderRow
            contentComponent={(elem) => {
              return (
                <Edit
                  value={elem.column.title}
                  inputChange={(e) => changeColName(e)}
                  doubleClick={() => editColName(elem.column.name)}
                  blur={() => initEditable()}
                  active={elem.column.edit}
                />
              );
            }}
          />
        </Grid>
      )}
    </div>
  );
};

export default DragTable;
