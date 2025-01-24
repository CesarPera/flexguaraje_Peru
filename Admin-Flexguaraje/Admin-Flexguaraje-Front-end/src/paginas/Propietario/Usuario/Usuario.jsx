import './Usuario.css';


function Usuario() {
    return (
        <div className="usuario-page">
            <h2 className='titulo-usuario'>Gestion de usuario</h2>

            <div className='acciones-usuario'>
                <div className='acciones-btn-usuario'>
                    <button className='btn btn-success'>Crear Usuario</button>
                    <button className='btn btn-primary'>Actualizar Usuario</button>
                </div>

                <div className="acciones-formulario-buscar">
                    <input type="text" placeholder='Ingresar Dni' />
                    <div className='btn-acciones-buscar'>
                        <button className='btn btn-info'>Buscar</button>
                        <button className='btn btn-secondary'>Limpiar</button>
                    </div>
                </div>
            </div>

            <table className='table table-primary table-hover table-bordered border-primary text-center tabla-usuario'>
                <thead>
                    <tr>
                        <th>Dni</th>
                        <th>Nombres Completo</th>
                        <th>Email Personal</th>
                        <th>Telefono</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>75117638</td>
                        <td>Cesar daniel carhuas aldana</td>
                        <td>cesarcarhuas5@gmail.com</td>
                        <td>934110870</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Usuario;