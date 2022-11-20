import { Button } from 'primereact/button'

interface ConfirmDeleteProps {
    handleDelete: () => void,
    setDisplayConfirm: (visible: boolean) => void
}

const ConfirmDeleteDialog = (props: ConfirmDeleteProps) => {


    return (
        <div>
            <h1 className='text-lg font-semibold pb-8'>Estas seguro que deseas eliminar este carro ?</h1>
            <div className='w-fit mx-auto flex gap-2'>
                <Button onClick={() => props.setDisplayConfirm(false)} label="Cancel" icon="pi pi-times" className="p-button-info" />
                <Button onClick={() => props.handleDelete()} label="Delete" icon="pi pi-trash" className="p-button-danger" />
            </div>
        </div>
    )
}

export default ConfirmDeleteDialog