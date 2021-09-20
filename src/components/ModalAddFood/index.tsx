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
interface ModalAddFormProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: Food) => Promise<void>;
}

export function ModalAddFood({
  isOpen,
  setIsOpen,
  handleAddFood,
}: ModalAddFormProps) {
  const formRef = useRef<FormHandles>(null);

  function handleSubmit() {
    if (
      !!formRef.current?.getData().name &&
      !!formRef.current?.getData().price &&
      !!formRef.current?.getData().description &&
      !!formRef.current?.getData().image
    ) {
      handleAddFood(formRef.current?.getData() as Food);

      setIsOpen();
    }
  }
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input
          name="image"
          placeholder="Cole o link aqui"
          icon="AiOutlineLink"
        />

        <Input name="name" placeholder="Ex: Moda Italiana" icon="" />
        <Input name="price" placeholder="Ex: 19.90" icon="" />

        <Input name="description" placeholder="Descrição" icon="" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
