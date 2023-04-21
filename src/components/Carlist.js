import React, {useState, useEffect} from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Button from '@mui/material/Button';
import Addcar from './Addcar';
import Editcar from './Editcar';

export default function Carlist(){
    const[cars, setCars] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('http://carrestapi.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
    }

    const deleteCar = (link) => {
        if(window.confirm('Are you sure?')){
            fetch(link, {method: 'DELETE'})
            .then(res => fetchData())
            .catch(err => console.error(err))
        }
    }
    
    const saveCar = (car) => {
        fetch('http://carrestapi.herokuapp.com/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }
    
    const updateCar = (car, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    const columns =[
        {
            headerName: 'Brand',
            field: 'brand',
            sortable: true,
            filter: true,
            flex: 1
        },
        {
            headerName: 'Model',
            field: 'model',
            sortable: true,
            filter: true,
            flex: 1
        },
        {
            headerName: 'Color',
            field: 'color',
            sortable: true,
            filter: true,
            flex: 1
        },
        {
            headerName: 'Fuel',
            field: 'fuel',
            sortable: true,
            filter: true,
            flex: 1
        },
        {
            headerName: 'Year',
            field: 'year',
            sortable: true,
            filter: true,
            flex: 1
        },
        {
            headerName: 'Price',
            field: 'price',
            sortable: true,
            filter: true,
            flex: 1
        },       
        {
            headerName: 'Edit',
            width: 100,
            cellRenderer: row => <Editcar updateCar={updateCar} car={row.data} />
        },
        {
            headerName: 'Delete',
            field: '_links.self.href',
            width: 100,
            cellRenderer: row => <Button onClick={() => deleteCar(row.value)} variant="contained" color="error" size="small">Delete</Button>
        }       
    ]

    return (
        <div className="ag-theme-alpine" style={{height: 969.4, width: '100%'}}>
            <Addcar saveCar={saveCar} />
            <AgGridReact columnDefs={columns} rowData={cars} >
            </AgGridReact>
        </div>
    )
}