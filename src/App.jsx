import { useEffect } from "react";
import "./App.css";
import useStore from "./zustand/store.js";
import { useState } from "react";

const App = () => {

  useEffect(() => {
    fetchProductos();
  }, []);
  

  const { fetchProductos, productos } = useStore();
  const [carrito, setCarrito] = useState(() => {
    const savedCarrito = localStorage.getItem("Carrito");
    return savedCarrito ? JSON.parse(savedCarrito) : [];
  });  const [prodSel, setProdSel] = useState({ cant: "", producto: "" });
  const [confirmado, setConfirmado] = useState(false);
  const fecha = new Date().toLocaleString();


  useEffect(() => {
    localStorage.setItem("Carrito", JSON.stringify(carrito));
  }, [carrito]);
  

  const handleCantChange = (e) => {
    const cant = parseInt(e.target.value);
    if (cant <= 0) {
      alert("debe elegir un valor disinto a 0");
      return;
    } else {
      setProdSel((prev) => ({ ...prev, cant }));
    }
    return;
  };

  const handleIdChange = (e) => {
    const id = parseInt(e.target.value);
    const producto = productos.find((prod) => prod.id === id);
    setProdSel((prev) => ({ ...prev, producto }));
  };

  const handleAdd = () => {
    if (prodSel.cant == 0) {
      prodSel.cant = 1;
    }

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
 
  const handleRemove = (id) => {
    setCarrito((prevCarrito) => {
      const updatedCarrito = prevCarrito
        .map((item) =>
          item.producto.id === id
            ? { ...item, cant: item.cant - 1 }
            : item
        )
        .filter((item) => item.cant > 0);
  
      return updatedCarrito;
    });
  };
  
  const totalCant = carrito.reduce((acc, item) => acc + item.cant, 0);
  const totalPrecios = carrito
    .reduce((acc, item) => acc + item.producto.price * item.cant, 0)
    .toFixed(2);

  const vaciarCarrito = () => {
    setCarrito([]);
  };
  const confirmCarrito = () => {
    setConfirmado(true);
    localStorage.setItem('Carrito', "");
  };

  const formValido = prodSel.cant > 0 && prodSel.producto;
  return (
    <>
      <header className='titulo'>
        <span>{"<devShop/>"}</span>
      </header>
      <main>
        {confirmado ? (
          <span className='confirmado'>Carrito confirmado!</span>
        ) : (
          <>
            <div className='form-container'>
              <form action='post'>
                <div className='inputs'>
                  <input
                    type='number'
                    value={prodSel.cant}
                    name='cant'
                    onChange={handleCantChange}
                    placeholder='Cantidad'
                  />

                  <input
                    type='number'
                    value={prodSel.producto?.id || ""}
                    name='id'
                    onChange={handleIdChange}
                    placeholder='ID'
                  />
                </div>

                <div className='botonera'>
                  <button
                    type='button'
                    onClick={handleAdd}
                    disabled={!formValido}
                  >
                    Agregar
                  </button>
                </div>
              </form>
            </div>

            <section>
              <article className='tabla-container'>
                <table className='tabla'>
                  <thead>
                    <tr>
                      <th>Cant</th>
                      <th>Nombre</th>
                      <th>Precio Unitario</th>
                      <th>Precio Total</th>
                      <th>Foto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carrito?.map((i) => (
                      <tr key={i.producto.id}>
                        <td ><div className="cantidad">
                        {i.cant}
                        <span className="restar"onClick={() => handleRemove(i.producto.id)}> Restar unidad </span>
                          </div></td>
                        <td>{i.producto.title}</td>
                        <td>
                          US$
                          <span className='resaltado'>{i.producto.price}</span>
                        </td>
                        <td>
                          US$
                          <span className='resaltado'>
                            {i.producto.price * i.cant}
                          </span>
                        </td>
                        <td>
                          <img src={i.producto.image} alt='foto' />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3}>
                        Articulos:<span className='resaltado'>{totalCant}</span>
                      </td>
                      <td colSpan={2}>
                        Total US$:{" "}
                        <span className='resaltado'>{totalPrecios}</span>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={5}>
                        Fecha: <span className='resaltado'>{fecha}</span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </article>
            </section>
            <section>
              <div className='botonera'>
                <button onClick={vaciarCarrito}>Vaciar</button>
                <button onClick={confirmCarrito}>Confirmar</button>
              </div>
            </section>
          </>
        )}
      </main>

      <footer>
        <div className='brand'>
          <img src='../assets/wallbit-icon.webp' alt='logo' className='logo' />
          <div className='brand-text'>
            <span>powered by</span>
            <h4>wallbit</h4>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
