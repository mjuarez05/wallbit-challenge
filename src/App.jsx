import { useEffect } from "react";
import "./App.css";
import useStore from "./zustand/store.js";
import { useState } from "react";

function App() {
  useEffect(() => {
    fetchProductos();
  }, []);

  const { fetchProductos, productos } = useStore();
  const [carrito, setCarrito] = useState([]);
  const [prodSel, setProdSel] = useState({ cant: "", producto: "" });
  const fecha = new Date().toLocaleString();

  const handleCantChange = (e) => {
    const cant = parseInt(e.target.value);
    if(cant <= 0){
      alert("debe elegir un valor disinto a 0");
      return
    } else{
      setProdSel((prev) => ({ ...prev, cant }));

    }
    return
  };

  const handleIdChange = (e) => {
    const id = parseInt(e.target.value);
    const producto = productos.find((prod) => prod.id === id);
    setProdSel((prev) => ({ ...prev, producto }));
  };

  const handleAdd = () => {
   if(prodSel.cant == 0){
    prodSel.cant = 1;
   };

    const prodExiste = carrito?.find(
      (prod) => prod.producto.id === prodSel.producto.id
    );
    if (prodExiste) {
      const newCant = prodExiste.cant + prodSel.cant;
      setCarrito(
        (prevCarrito) => [...prevCarrito],
        (prodExiste.cant = newCant)
      );
    } else {
      setCarrito((prevCarrito) => [...prevCarrito, prodSel]);
    }
  
    setProdSel({ cant: "", producto: "" });
  };

  const totalCant = carrito.reduce((acc, item) => acc + item.cant, 0);
  const totalPrecios = carrito.reduce(
    (acc, item) => acc + item.producto.price * item.cant,
    0
  );

  return (
    <>
      <div>wallbit</div>
      
      <div className="form-container">
      <form action='post'>
        <label htmlFor='cant'>Cantidad</label>
        <input
          type='number'
          value={prodSel.cant}
          name='cant'
          onChange={handleCantChange}          
        />
        <label htmlFor='id'>ID Producto</label>
        <input
          type='number'
          value={prodSel.producto?.id || ""}
          name='id'
          onChange={handleIdChange}
        />
      </form>
      <div className="botonera">
        <button type='button' onClick={handleAdd}>
          Agregar
        </button>

        </div>
      </div>
     
      <section>
        <article>
          <table className="tabla">
            <thead>
              <tr>
                <th>Cant</th>
                <th>Nombre</th>
                <th>Precio U</th>
                <th>Precio T</th>
                <th>Foto</th>
              </tr>
            </thead>
            <tbody>
              {carrito?.map((i) => (
                <tr key={i.producto.id}>
                  <td>{i.cant}</td>
                  <td>{i.producto.title}</td>
                  <td>US${i.producto.price}</td>
                  <td>US$ {i.producto.price * i.cant}</td>
                  <td>
                    <img src={i.producto.image} alt='foto' />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}>Cantidad articulos:{totalCant}</td>
                <td colSpan={2}>Total US$: {totalPrecios}</td>
              </tr>
              <tr>
                <td colSpan={5}>Fecha de creacion: {fecha}</td>
              </tr>
            </tfoot>
          </table>
        </article>
      </section>
    </>
  );
}

export default App;
