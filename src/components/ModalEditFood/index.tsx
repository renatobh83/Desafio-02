import { useRef } from "react";

import { FiCheckSquare } from "react-icons/fi";

import { Form } from "./styles";
import Modal from "../Modal";
import Input from "../Input";
import { FormHandles } from "@unform/core";
interface Food {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
}
interface ModalEditFormProps {
  isOpen: boolean;
  setIsOpen: () => void;
  editingFood: Food;
  handleUpdateFood: (food: Food) => Promise<void>;
}
export function ModalEditFood({
  isOpen,
  setIsOpen,
  editingFood,
  handleUpdateFood,
}: ModalEditFormProps) {
  const formRef = useRef<FormHandles>();
  function handleSubmit() {
    if (
      !!formRef.current?.getData().name &&
      !!formRef.current?.getData().price &&
      !!formRef.current?.getData().description &&
      !!formRef.current?.getData().image
    ) {
      handleUpdateFood(formRef.current?.getData() as Food);

      setIsOpen();
    }
  }
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" icon="" />

        <Input name="name" placeholder="Ex: Moda Italiana" icon="" />
        <Input name="price" placeholder="Ex: 19.90" icon="" />

        <Input name="description" placeholder="Descrição" icon="" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
