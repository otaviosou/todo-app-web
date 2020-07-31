import React from 'react'
import renderTemplate from '../../utils/renderTemplate'
import './style.css'

function ConfirmDel(props){

    const {id, delTodo} = props

    function del(e){

        e.preventDefault()
        renderTemplate('.delete')
        delTodo(id)
    }

    function noDel(e){

        e.preventDefault()
        renderTemplate('.delete')
    }


    return(
        <aside className="confirm-del">
            <div className="confirm-del-ballon">
                <p>Do you want to remove the task?</p>
                <div>
                    <button onClick={del}>Deletar</button>
                    <button onClick={noDel}>Cancelar</button>
                </div>
            </div>
        </aside>
    )
}

export default ConfirmDel