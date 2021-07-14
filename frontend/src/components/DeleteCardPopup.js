import PopupWithForm from "./PopupWithForm";

const DeleteCardPopup = ({
  card,
  isLoading,
  onClose,
  onConfirmDelete
}) => {

  const handleSubmit = evt => {
    evt.preventDefault();
    onConfirmDelete(card)
  }

  return (
    <PopupWithForm 
      title="Вы уверены?"
      name="card-delete"
      isOpen={Boolean(card)}
      isLoading={isLoading}
      buttonText="Да"
      buttonLoadingText="Удаление..."
      onClose={onClose}
      onSubmit={handleSubmit}
    >

    </PopupWithForm>
  )
}

export default DeleteCardPopup;