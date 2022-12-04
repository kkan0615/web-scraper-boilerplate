export const testTemplate = (data: any[]) => {
  let productRows = ''
  data.map(el => {
    productRows += `
      <tr>
        <td>
           ${el.name}  
        </td>
        <td>
           ${el.salePriceWhole}  
        </td>
      </tr>
    `
  })

  return `
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    .product-table {
      font-family: Arial, Helvetica, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }

    .product-table td, #customers th {
      border: 1px solid #ddd;
      padding: 8px;
    }
  
    .product-table th, .product-table td {
      padding-left: 15px;
      padding-right: 15px;
    }

    .product-table tr:nth-child(even){background-color: #f2f2f2;}

    .product-table tr:hover {background-color: #ddd;}

    .product-table th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #04AA6D;
      color: white;
    }
    
    .product-table .product-name {
      width: 80%;
    }
  </style>
</head>
<body>
  <h1>
    Amazon result for silent red switches
  </h1>
  <div>
    Result for "silent red switches"
  </div>
  <table
    class="product-table"
  >
    <thead>
      <tr>
        <th
          class="product-name"
        >
          Product name
        </th>
        <td>
          Price
        </td>
      </tr>
    </thead>
    <tbody>
      ${productRows}
    </tbody>
  </table>
</body>
</html>
`
}
